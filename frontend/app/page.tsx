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
    <main className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="mb-12 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <h1 className="text-6xl font-extrabold tracking-tighter mb-4 bg-gradient-to-r from-white via-white to-red-500 bg-clip-text text-transparent">
              House Ops
            </h1>
            <p className="text-xl text-zinc-400 font-medium max-w-2xl leading-relaxed">
              Gestão inteligente de compras semanais com estética de alta performance.
            </p>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 h-fit sticky top-8">
            <div className="card-premium p-1 bg-gradient-to-b from-red-500/20 to-transparent rounded-2xl">
              <div className="bg-[#111111] rounded-xl p-2">
                <CompraForm onSuccess={handleCompraCreated} />
              </div>
            </div>
            
            <div className="mt-8 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Estatísticas Rápidas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total Mensal</span>
                  <span className="text-white font-bold">R$ --</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 w-2/3 shadow-[0_0_10px_rgba(255,0,51,0.5)]"></div>
                </div>
              </div>
            </div>
          </aside>
          
          <section className="lg:col-span-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-transparent blur-lg opacity-50"></div>
              <div className="relative">
                <CompraList key={refreshKey} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
