using HouseOps.Application.DTOs;
using HouseOps.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace HouseOps.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ComprasController : ControllerBase
{
    private readonly CompraService _compraService;

    public ComprasController(CompraService compraService)
    {
        _compraService = compraService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CompraDto>>> GetAllCompras()
    {
        var compras = await _compraService.GetAllComprasAsync();
        return Ok(compras);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CompraDto>> GetCompra(Guid id)
    {
        var compra = await _compraService.GetCompraByIdAsync(id);
        
        if (compra == null)
            return NotFound();
            
        return Ok(compra);
    }

    [HttpPost]
    public async Task<ActionResult<CompraDto>> CreateCompra([FromBody] CreateCompraDto createDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var compra = await _compraService.CreateCompraAsync(createDto);
        
        return CreatedAtAction(nameof(GetCompra), new { id = compra.Id }, compra);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<CompraDto>> UpdateCompra(Guid id, [FromBody] UpdateCompraDto updateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var compra = await _compraService.UpdateCompraAsync(id, updateDto);
        
        if (compra == null)
            return NotFound();
            
        return Ok(compra);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCompra(Guid id)
    {
        var result = await _compraService.DeleteCompraAsync(id);
        
        if (!result)
            return NotFound();
            
        return NoContent();
    }

    [HttpGet("periodo")]
    public async Task<ActionResult<IEnumerable<CompraDto>>> GetComprasByPeriodo(
        [FromQuery] DateTime dataInicio, 
        [FromQuery] DateTime dataFim)
    {
        var compras = await _compraService.GetComprasByPeriodoAsync(dataInicio, dataFim);
        return Ok(compras);
    }

    [HttpGet("mercado/{mercado}")]
    public async Task<ActionResult<IEnumerable<CompraDto>>> GetComprasByMercado(string mercado)
    {
        var compras = await _compraService.GetComprasByMercadoAsync(mercado);
        return Ok(compras);
    }
}
