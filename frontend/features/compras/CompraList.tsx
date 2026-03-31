'use client';

import { useState, useEffect } from 'react';
import { apiService, Compra } from '@/services/api';
import ItemModal from './ItemModal';
import ConfirmModal from '@/components/ConfirmModal';

export default function CompraList() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompra, setSelectedCompra] = useState<Compra | null>(null);
  const [compraToDelete, setCompraToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadCompras();
  }, []);

  const loadCompras = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCompras();
      setCompras(data);
    } catch (err) {
      setError('Erro ao carregar compras');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!compraToDelete) return;

    try {
      await apiService.deleteCompra(compraToDelete);
      setCompras(compras.filter(c => c.id !== compraToDelete));
      setCompraToDelete(null);
    } catch (err) {
      setError('Erro ao excluir compra');
    }
  };

  const handleUpdate = async () => {
    // Recarrega as compras para atualizar valores totais e quantidade de itens
    const data = await apiService.getCompras();
    setCompras(data);
    
    // Atualiza a compra selecionada se ainda estiver aberta no modal
    if (selectedCompra) {
      const updated = data.find(c => c.id === selectedCompra.id);
      if (updated) setSelectedCompra(updated);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="h-16 w-16 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl flex items-center gap-4">
        <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="font-medium">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-zinc-800 flex justify-between items-center bg-gradient-to-r from-zinc-900/50 to-transparent">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Histórico de Movimentação</h2>
            <p className="text-zinc-500 text-sm mt-1">Acompanhe suas últimas aquisições</p>
          </div>
          <div className="p-2 bg-zinc-800/50 rounded-xl border border-zinc-700">
            <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
        </div>
        
        {compras.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="inline-flex p-4 bg-zinc-800/30 rounded-3xl mb-4 border border-zinc-800">
              <svg className="h-10 w-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-zinc-500 text-lg">Nenhum registro encontrado no sistema.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-zinc-800/10">
                  <th className="px-8 py-5 text-left text-xs font-black text-zinc-500 uppercase tracking-widest">
                    Cronologia
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-black text-zinc-500 uppercase tracking-widest">
                    Localização
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-black text-zinc-500 uppercase tracking-widest">
                    Volume Financeiro
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-black text-zinc-500 uppercase tracking-widest text-right">
                    Gerenciamento
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {compras.map((compra) => (
                  <tr key={compra.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-white font-bold text-base">{formatDate(compra.dataCompra)}</div>
                      <div className="text-zinc-500 text-xs mt-1 uppercase tracking-tighter">Data de Registro</div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(255,0,51,0.6)]"></div>
                        <span className="text-zinc-300 font-medium">{compra.mercado}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-white font-black text-lg tracking-tight">
                        {formatCurrency(compra.valorTotal)}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                          {compra.itens?.length || 0} Itens
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => setSelectedCompra(compra)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all font-bold text-sm border border-zinc-700/50"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Itens
                      </button>
                      <button
                        onClick={() => setCompraToDelete(compra.id)}
                        className="p-2 rounded-xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all border border-red-600/20"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!compraToDelete}
        title="Excluir Compra"
        message="Tem certeza que deseja excluir esta compra? Esta ação não pode ser desfeita e removerá todos os itens vinculados."
        onConfirm={handleDelete}
        onCancel={() => setCompraToDelete(null)}
        confirmText="Excluir"
        cancelText="Cancelar"
      />

      {selectedCompra && (
        <ItemModal 
          compra={selectedCompra} 
          onClose={() => setSelectedCompra(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
