namespace HouseOps.Application.DTOs;

public class CompraDto
{
    public Guid Id { get; set; }
    public DateTime DataCompra { get; set; }
    public decimal ValorTotal { get; set; }
    public string Mercado { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<ItemDto> Itens { get; set; } = new();
}

public class CreateCompraDto
{
    public DateTime DataCompra { get; set; }
    public string Mercado { get; set; } = string.Empty;
}

public class UpdateCompraDto
{
    public DateTime DataCompra { get; set; }
    public string Mercado { get; set; } = string.Empty;
}
