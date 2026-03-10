namespace HouseOps.Application.DTOs;

public class ItemDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Quantidade { get; set; }
    public decimal ValorUnitario { get; set; }
    public decimal ValorTotal { get; set; }
    public string Categoria { get; set; } = string.Empty;
    public Guid CompraId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreateItemDto
{
    public string Nome { get; set; } = string.Empty;
    public int Quantidade { get; set; }
    public decimal ValorUnitario { get; set; }
    public string Categoria { get; set; } = string.Empty;
    public Guid CompraId { get; set; }
}

public class UpdateItemDto
{
    public string Nome { get; set; } = string.Empty;
    public int Quantidade { get; set; }
    public decimal ValorUnitario { get; set; }
    public string Categoria { get; set; } = string.Empty;
}
