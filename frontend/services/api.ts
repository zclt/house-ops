const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5017/api';

export interface Compra {
  id: string;
  dataCompra: string;
  valorTotal: number;
  mercado: string;
  createdAt: string;
  updatedAt: string;
  itens: Item[];
}

export interface Item {
  id: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  categoria: string;
  compraId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompraDto {
  dataCompra: string;
  mercado: string;
}

export interface UpdateCompraDto {
  dataCompra: string;
  mercado: string;
}

class ApiService {
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {} as T;
  }

  // Compras
  async getCompras(): Promise<Compra[]> {
    return this.request<Compra[]>('/compras');
  }

  async getCompra(id: string): Promise<Compra> {
    return this.request<Compra>(`/compras/${id}`);
  }

  async createCompra(data: CreateCompraDto): Promise<Compra> {
    return this.request<Compra>('/compras', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCompra(id: string, data: UpdateCompraDto): Promise<Compra> {
    return this.request<Compra>(`/compras/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCompra(id: string): Promise<void> {
    await this.request(`/compras/${id}`, {
      method: 'DELETE',
    });
  }

  async getComprasByPeriodo(dataInicio: string, dataFim: string): Promise<Compra[]> {
    return this.request<Compra[]>(`/compras/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`);
  }

  async getComprasByMercado(mercado: string): Promise<Compra[]> {
    return this.request<Compra[]>(`/compras/mercado/${mercado}`);
  }

  // Itens
  async getItemsByCompra(compraId: string): Promise<Item[]> {
    return this.request<Item[]>(`/items/compra/${compraId}`);
  }

  async getItem(id: string): Promise<Item> {
    return this.request<Item>(`/items/${id}`);
  }

  async createItem(data: { nome: string; quantidade: number; valorUnitario: number; categoria: string; compraId: string }): Promise<Item> {
    return this.request<Item>('/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateItem(id: string, data: { nome: string; quantidade: number; valorUnitario: number; categoria: string }): Promise<Item> {
    return this.request<Item>(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteItem(id: string): Promise<void> {
    await this.request(`/items/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
