using HouseOps.Domain.Entities;
using HouseOps.Domain.Interfaces;
using HouseOps.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HouseOps.Infrastructure.Repositories;

public class ItemRepository : IItemRepository
{
    private readonly AppDbContext _context;

    public ItemRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Item?> GetByIdAsync(Guid id)
    {
        return await _context.Itens.FindAsync(id);
    }

    public async Task<IEnumerable<Item>> GetAllAsync()
    {
        return await _context.Itens.ToListAsync();
    }

    public async Task<Item> AddAsync(Item entity)
    {
        await _context.Itens.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Item> UpdateAsync(Item entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _context.Itens.FindAsync(id);
        if (entity == null)
            return false;

        _context.Itens.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Item>> GetByCompraIdAsync(Guid compraId)
    {
        return await _context.Itens
            .Where(i => i.CompraId == compraId)
            .ToListAsync();
    }
}
