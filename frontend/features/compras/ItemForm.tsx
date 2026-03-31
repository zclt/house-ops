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
    <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 animate-in slide-in-from-bottom-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-600/20 rounded-lg">
          <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          {item ? 'Editar Informações' : 'Novo Produto'}
        </h3>
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-2">
          <label htmlFor="nome" className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">
            Descrição do Produto
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600 transition-all font-medium"
            placeholder="Ex: Arroz Integral 5kg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="quantidade" className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">
            Quantidade
          </label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
            min="1"
            required
            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600 transition-all font-medium font-mono"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="valorUnitario" className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">
            Preço Unitário (R$)
          </label>
          <input
            type="number"
            id="valorUnitario"
            value={valorUnitario}
            onChange={(e) => setValorUnitario(parseFloat(e.target.value))}
            step="0.01"
            min="0"
            required
            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600 transition-all font-medium font-mono"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label htmlFor="categoria" className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">
            Categoria / Setor
          </label>
          <input
            type="text"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600 transition-all font-medium"
            placeholder="Ex: Mantimentos, Higiene, Frios..."
          />
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-8 py-3 text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all border border-transparent hover:border-zinc-700 uppercase tracking-widest"
        >
          Descartar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary min-w-[200px]"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          ) : (
            <span className="uppercase tracking-widest">Confirmar Dados</span>
          )}
        </button>
      </div>
    </form>
  );
}
