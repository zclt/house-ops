using HouseOps.Application.DTOs;
using HouseOps.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace HouseOps.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly ItemService _itemService;

    public ItemsController(ItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ItemDto>> GetItem(Guid id)
    {
        var item = await _itemService.GetItemByIdAsync(id);
        
        if (item == null)
            return NotFound();
            
        return Ok(item);
    }

    [HttpGet("compra/{compraId:guid}")]
    public async Task<ActionResult<IEnumerable<ItemDto>>> GetItemsByCompra(Guid compraId)
    {
        var items = await _itemService.GetItemsByCompraIdAsync(compraId);
        return Ok(items);
    }

    [HttpPost]
    public async Task<ActionResult<ItemDto>> CreateItem([FromBody] CreateItemDto createDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var item = await _itemService.CreateItemAsync(createDto);
        
        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ItemDto>> UpdateItem(Guid id, [FromBody] UpdateItemDto updateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var item = await _itemService.UpdateItemAsync(id, updateDto);
        
        if (item == null)
            return NotFound();
            
        return Ok(item);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteItem(Guid id)
    {
        var result = await _itemService.DeleteItemAsync(id);
        
        if (!result)
            return NotFound();
            
        return NoContent();
    }
}
