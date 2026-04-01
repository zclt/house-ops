'use client';

import { useState } from 'react';
import { apiService, Item } from '@/services/api';

interface ItemFormProps {
  compraId: string;
  item?: Item;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ItemForm({ compraId, item, onSuccess, onCancel }: ItemFormProps) {
  const [nome, setNome] = useState(item?.nome || '');
  const [quantidade, setQuantidade] = useState(item?.quantidade || 1);
  const [valorUnitario, setValorUnitario] = useState(item?.valorUnitario || 0);
  const [categoria, setCategoria] = useState(item?.categoria || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (item) {
        await apiService.updateItem(item.id, {
          nome,
          quantidade,
          valorUnitario,
          categoria,
        });
      } else {
        await apiService.createItem({
          nome,
          quantidade,
          valorUnitario,
          categoria,
          compraId,
        });
      }
      onSuccess();
    } catch (err) {
      setError('Erro ao salvar item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">
        {item ? 'Editar Item' : 'Adicionar Novo Item'}
      </h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Item
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Arroz 5kg"
          />
        </div>

        <div>
          <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade
          </label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="valorUnitario" className="block text-sm font-medium text-gray-700 mb-1">
            Valor Unitário (R$)
          </label>
          <input
            type="number"
            id="valorUnitario"
            value={valorUnitario}
            onChange={(e) => setValorUnitario(parseFloat(e.target.value))}
            step="0.01"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <input
            type="text"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Mercearia, Limpeza..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-blue-300"
        >
          {loading ? 'Salvando...' : 'Salvar Item'}
        </button>
      </div>
    </form>
  );
}
