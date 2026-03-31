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
        <div className="text-lg text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Compras Registradas</h2>
        </div>
        
        {compras.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            Nenhuma compra encontrada
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mercado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Itens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {compras.map((compra) => (
                  <tr key={compra.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(compra.dataCompra)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {compra.mercado}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {formatCurrency(compra.valorTotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {compra.itens?.length || 0} itens
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                      <button
                        onClick={() => setSelectedCompra(compra)}
                        className="text-blue-600 hover:text-blue-900 transition"
                      >
                        Gerenciar Itens
                      </button>
                      <button
                        onClick={() => setCompraToDelete(compra.id)}
                        className="text-red-600 hover:text-red-900 transition"
                      >
                        Excluir
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
