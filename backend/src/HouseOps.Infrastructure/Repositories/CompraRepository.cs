using HouseOps.Domain.Entities;
using HouseOps.Domain.Interfaces;
using HouseOps.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HouseOps.Infrastructure.Repositories;

public class CompraRepository : ICompraRepository
{
    private readonly AppDbContext _context;

    public CompraRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Compra?> GetByIdAsync(Guid id)
    {
        return await _context.Compras
            .Include(c => c.Itens)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Compra>> GetAllAsync()
    {
        return await _context.Compras
            .Include(c => c.Itens)
            .OrderByDescending(c => c.DataCompra)
            .ToListAsync();
    }

    public async Task<Compra> AddAsync(Compra entity)
    {
        await _context.Compras.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Compra> UpdateAsync(Compra entity)
    {
        _context.Compras.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var compra = await _context.Compras.FindAsync(id);
        if (compra == null)
            return false;

        _context.Compras.Remove(compra);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Compra>> GetComprasByPeriodoAsync(DateTime dataInicio, DateTime dataFim)
    {
        return await _context.Compras
            .Include(c => c.Itens)
            .Where(c => c.DataCompra >= dataInicio && c.DataCompra <= dataFim)
            .OrderByDescending(c => c.DataCompra)
            .ToListAsync();
    }

    public async Task<IEnumerable<Compra>> GetComprasByMercadoAsync(string mercado)
    {
        return await _context.Compras
            .Include(c => c.Itens)
            .Where(c => c.Mercado.ToLower().Contains(mercado.ToLower()))
            .OrderByDescending(c => c.DataCompra)
            .ToListAsync();
    }
}
