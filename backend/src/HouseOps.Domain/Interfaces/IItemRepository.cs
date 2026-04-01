using HouseOps.Domain.Entities;

namespace HouseOps.Domain.Interfaces;

public interface IItemRepository : IRepository<Item>
{
    Task<IEnumerable<Item>> GetByCompraIdAsync(Guid compraId);
}
