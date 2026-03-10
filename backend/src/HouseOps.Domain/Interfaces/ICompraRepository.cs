using HouseOps.Domain.Entities;

namespace HouseOps.Domain.Interfaces;

public interface ICompraRepository : IRepository<Compra>
{
    Task<IEnumerable<Compra>> GetComprasByPeriodoAsync(DateTime dataInicio, DateTime dataFim);
    Task<IEnumerable<Compra>> GetComprasByMercadoAsync(string mercado);
}
