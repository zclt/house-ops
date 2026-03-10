'use client';

import { useState } from 'react';
import { apiService, CreateCompraDto } from '@/services/api';

interface CompraFormProps {
  onSuccess?: () => void;
}

export default function CompraForm({ onSuccess }: CompraFormProps) {
  const [formData, setFormData] = useState<CreateCompraDto>({
    dataCompra: new Date().toISOString().split('T')[0],
    mercado: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.mercado.trim()) {
      setError('O nome do mercado é obrigatório');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await apiService.createCompra(formData);
      
      setFormData({
        dataCompra: new Date().toISOString().split('T')[0],
        mercado: '',
      });
      
      onSuccess?.();
    } catch (err) {
      setError('Erro ao criar compra');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Nova Compra</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="dataCompra" className="block text-sm font-medium text-gray-700 mb-2">
            Data da Compra
          </label>
          <input
            type="date"
            id="dataCompra"
            name="dataCompra"
            value={formData.dataCompra}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="mercado" className="block text-sm font-medium text-gray-700 mb-2">
            Mercado
          </label>
          <input
            type="text"
            id="mercado"
            name="mercado"
            value={formData.mercado}
            onChange={handleChange}
            placeholder="Ex: Carrefour, Pão de Açúcar..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Salvando...' : 'Salvar Compra'}
          </button>
        </div>
      </form>
    </div>
  );
}
