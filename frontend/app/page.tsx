'use client';

import { useState } from 'react';
import CompraList from '@/features/compras/CompraList';
import CompraForm from '@/features/compras/CompraForm';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCompraCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            House Ops
          </h1>
          <p className="text-lg text-gray-600">
            Sistema para gerenciar compras semanais de mercado
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <CompraForm onSuccess={handleCompraCreated} />
          </div>
          
          <div className="lg:col-span-2">
            <CompraList key={refreshKey} />
          </div>
        </div>
      </div>
    </main>
  );
}
