'use client';

import { useState, useEffect } from 'react';
import { apiService, Item, Compra } from '@/services/api';
import ItemForm from './ItemForm';
import ConfirmModal from '@/components/ConfirmModal';

interface ItemModalProps {
  compra: Compra;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ItemModal({ compra, onClose, onUpdate }: ItemModalProps) {
  const [items, setItems] = useState<Item[]>(compra.itens || []);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await apiService.getItemsByCompra(compra.id);
      setItems(data);
      onUpdate(); // Atualiza a compra na lista principal (para valor total e contagem)
    } catch (err) {
      setError('Erro ao carregar itens');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await apiService.deleteItem(itemToDelete);
      setItemToDelete(null);
      await loadItems();
    } catch (err) {
      setError('Erro ao excluir item');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingItem(undefined);
    loadItems();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-zinc-900 to-black border-b border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Itens da Compra</h2>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">
                {compra.mercado} • <span className="text-red-500/80">{new Date(compra.dataCompra).toLocaleDateString('pt-BR')}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {error && (
            <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4">
              <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="font-medium">{error}</div>
            </div>
          )}

          {showForm ? (
            <div className="max-w-2xl mx-auto py-4">
              <ItemForm 
                compraId={compra.id} 
                item={editingItem}
                onSuccess={handleFormSuccess}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(undefined);
                }}
              />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Lista de Produtos</h3>
                  <p className="text-zinc-500 text-sm mt-1">Gerencie os itens registrados nesta operação</p>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Adicionar Produto
                </button>
              </div>

              {items.length === 0 ? (
                <div className="py-24 text-center bg-zinc-900/40 rounded-3xl border-2 border-dashed border-zinc-800">
                  <div className="inline-flex p-4 bg-zinc-800/30 rounded-full mb-4">
                    <svg className="h-10 w-10 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-lg font-medium italic">Nenhum item adicionado à lista.</p>
                </div>
              ) : (
                <div className="overflow-hidden border border-zinc-800 rounded-3xl bg-zinc-900/20 backdrop-blur-sm">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-zinc-900/50">
                        <th className="px-8 py-5 text-left text-xs font-black text-zinc-500 uppercase tracking-widest">Produto</th>
                        <th className="px-8 py-5 text-left text-xs font-black text-zinc-500 uppercase tracking-widest">Qtd</th>
                        <th className="px-8 py-5 text-left text-xs font-black text-zinc-500 uppercase tracking-widest text-right">Valor Unit.</th>
                        <th className="px-8 py-5 text-left text-xs font-black text-zinc-500 uppercase tracking-widest text-right">Total</th>
                        <th className="px-8 py-5 text-right text-xs font-black text-zinc-500 uppercase tracking-widest">Opções</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {items.map((item) => (
                        <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="text-base font-bold text-white">{item.nome}</div>
                            <div className="text-[10px] text-red-500 font-black uppercase tracking-widest mt-1 opacity-70">{item.categoria}</div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-lg text-sm font-black border border-zinc-700/50">
                              {item.quantidade}
                            </span>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium text-zinc-400 font-mono">
                            {formatCurrency(item.valorUnitario)}
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-right text-base font-black text-white font-mono">
                            {formatCurrency(item.valorTotal)}
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setShowForm(true);
                              }}
                              className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-xl transition-all border border-transparent hover:border-zinc-700"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setItemToDelete(item.id)}
                              className="p-2 text-red-600/50 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-zinc-900/50">
                      <tr>
                        <td colSpan={3} className="px-8 py-6 text-right text-sm font-black text-zinc-500 uppercase tracking-widest">Volume Financeiro Total:</td>
                        <td className="px-8 py-6 whitespace-nowrap text-right text-2xl font-black text-red-600 drop-shadow-[0_0_15px_rgba(255,0,51,0.3)]">
                          {formatCurrency(items.reduce((sum, item) => sum + item.valorTotal, 0))}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Excluir Item"
        message="Tem certeza que deseja remover este item? Esta ação afetará o volume financeiro total da operação."
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
        confirmText="Excluir Definitivamente"
        cancelText="Manter Item"
      />
    </div>
  );
}
