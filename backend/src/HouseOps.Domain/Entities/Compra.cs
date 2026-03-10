namespace HouseOps.Domain.Entities;

public class Compra
{
    public Guid Id { get; private set; }
    public DateTime DataCompra { get; private set; }
    public decimal ValorTotal { get; private set; }
    public string Mercado { get; private set; } = string.Empty;
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }
    
    private readonly List<Item> _itens = new();
    public IReadOnlyCollection<Item> Itens => _itens.AsReadOnly();

    public Compra(DateTime dataCompra, string mercado)
    {
        Id = Guid.NewGuid();
        DataCompra = dataCompra;
        Mercado = mercado;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public void AdicionarItem(Item item)
    {
        _itens.Add(item);
        CalcularValorTotal();
        UpdatedAt = DateTime.UtcNow;
    }

    public void RemoverItem(Item item)
    {
        _itens.Remove(item);
        CalcularValorTotal();
        UpdatedAt = DateTime.UtcNow;
    }

    private void CalcularValorTotal()
    {
        ValorTotal = _itens.Sum(i => i.ValorTotal);
    }

    public void AtualizarDataCompra(DateTime novaData)
    {
        DataCompra = novaData;
        UpdatedAt = DateTime.UtcNow;
    }

    public void AtualizarMercado(string novoMercado)
    {
        Mercado = novoMercado;
        UpdatedAt = DateTime.UtcNow;
    }
}
