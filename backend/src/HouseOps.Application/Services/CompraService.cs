using HouseOps.Application.DTOs;
using HouseOps.Domain.Entities;
using HouseOps.Domain.Interfaces;

namespace HouseOps.Application.Services;

public class CompraService
{
    private readonly ICompraRepository _compraRepository;

    public CompraService(ICompraRepository compraRepository)
    {
        _compraRepository = compraRepository;
    }

    public async Task<CompraDto> CreateCompraAsync(CreateCompraDto createDto)
    {
        var compra = new Compra(createDto.DataCompra, createDto.Mercado);
        
        var result = await _compraRepository.AddAsync(compra);
        
        return MapToDto(result);
    }

    public async Task<CompraDto?> GetCompraByIdAsync(Guid id)
    {
        var compra = await _compraRepository.GetByIdAsync(id);
        
        return compra == null ? null : MapToDto(compra);
    }

    public async Task<IEnumerable<CompraDto>> GetAllComprasAsync()
    {
        var compras = await _compraRepository.GetAllAsync();
        
        return compras.Select(MapToDto);
    }

    public async Task<CompraDto?> UpdateCompraAsync(Guid id, UpdateCompraDto updateDto)
    {
        var compra = await _compraRepository.GetByIdAsync(id);
        
        if (compra == null)
            return null;

        compra.AtualizarDataCompra(updateDto.DataCompra);
        compra.AtualizarMercado(updateDto.Mercado);

        var result = await _compraRepository.UpdateAsync(compra);
        
        return MapToDto(result);
    }

    public async Task<bool> DeleteCompraAsync(Guid id)
    {
        return await _compraRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<CompraDto>> GetComprasByPeriodoAsync(DateTime dataInicio, DateTime dataFim)
    {
        var compras = await _compraRepository.GetComprasByPeriodoAsync(dataInicio, dataFim);
        
        return compras.Select(MapToDto);
    }

    public async Task<IEnumerable<CompraDto>> GetComprasByMercadoAsync(string mercado)
    {
        var compras = await _compraRepository.GetComprasByMercadoAsync(mercado);
        
        return compras.Select(MapToDto);
    }

    private static CompraDto MapToDto(Compra compra)
    {
        return new CompraDto
        {
            Id = compra.Id,
            DataCompra = compra.DataCompra,
            ValorTotal = compra.ValorTotal,
            Mercado = compra.Mercado,
            CreatedAt = compra.CreatedAt,
            UpdatedAt = compra.UpdatedAt,
            Itens = compra.Itens.Select(item => new ItemDto
            {
                Id = item.Id,
                Nome = item.Nome,
                Quantidade = item.Quantidade,
                ValorUnitario = item.ValorUnitario,
                ValorTotal = item.ValorTotal,
                Categoria = item.Categoria,
                CompraId = item.CompraId,
                CreatedAt = item.CreatedAt,
                UpdatedAt = item.UpdatedAt
            }).ToList()
        };
    }
}
