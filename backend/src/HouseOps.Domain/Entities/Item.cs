namespace HouseOps.Domain.Entities;

public class Item
{
    public Guid Id { get; private set; }
    public string Nome { get; private set; } = string.Empty;
    public int Quantidade { get; private set; }
    public decimal ValorUnitario { get; private set; }
    public decimal ValorTotal => Quantidade * ValorUnitario;
    public string Categoria { get; private set; } = string.Empty;
    public Guid CompraId { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }

    public Item(string nome, int quantidade, decimal valorUnitario, string categoria, Guid compraId)
    {
        Id = Guid.NewGuid();
        Nome = nome;
        Quantidade = quantidade;
        ValorUnitario = valorUnitario;
        Categoria = categoria;
        CompraId = compraId;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public void AtualizarQuantidade(int novaQuantidade)
    {
        Quantidade = novaQuantidade;
        UpdatedAt = DateTime.UtcNow;
    }

    public void AtualizarValorUnitario(decimal novoValor)
    {
        ValorUnitario = novoValor;
        UpdatedAt = DateTime.UtcNow;
    }

    public void AtualizarNome(string novoNome)
    {
        Nome = novoNome;
        UpdatedAt = DateTime.UtcNow;
    }

    public void AtualizarCategoria(string novaCategoria)
    {
        Categoria = novaCategoria;
        UpdatedAt = DateTime.UtcNow;
    }
}
