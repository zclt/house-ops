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
    <div className="p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-600/20 rounded-lg">
          <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Nova Compra</h2>
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-3">
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="dataCompra" className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">
            Data da Operação
          </label>
          <input
            type="date"
            id="dataCompra"
            name="dataCompra"
            value={formData.dataCompra}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-zinc-800 focus:border-red-500/50 rounded-xl text-white focus:outline-none transition-all font-medium"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="mercado" className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">
            Estabelecimento
          </label>
          <input
            type="text"
            id="mercado"
            name="mercado"
            value={formData.mercado}
            onChange={handleChange}
            placeholder="Ex: Carrefour, Pão de Açúcar..."
            className="w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-zinc-800 focus:border-red-500/50 rounded-xl text-white placeholder:text-zinc-700 focus:outline-none transition-all font-medium"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 group py-4 h-14"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span className="text-base uppercase tracking-widest font-black">Iniciar Registro</span>
              <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
