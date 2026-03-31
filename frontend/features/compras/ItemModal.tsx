'use client';

import { useState, useEffect } from 'react';
import { apiService, Item, Compra } from '@/services/api';
import ItemForm from './ItemForm';

interface ItemModalProps {
  compra: Compra;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ItemModal({ compra, onClose, onUpdate }: ItemModalProps) {
  const [items, setItems] = useState<Item[]>(compra.itens || []);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);
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

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    
    try {
      await apiService.deleteItem(id);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Itens da Compra</h2>
            <p className="text-sm text-gray-500">
              {compra.mercado} - {new Date(compra.dataCompra).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {showForm ? (
            <ItemForm 
              compraId={compra.id} 
              item={editingItem}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(undefined);
              }}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Lista de Produtos</h3>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition inline-flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Adicionar Item
                </button>
              </div>

              {items.length === 0 ? (
                <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  Nenhum item nesta compra ainda.
                </div>
              ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Unit.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.nome}</div>
                            <div className="text-xs text-gray-500">{item.categoria}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {item.quantidade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatCurrency(item.valorUnitario)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {formatCurrency(item.valorTotal)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setShowForm(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">Total da Compra:</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
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
    </div>
  );
}
