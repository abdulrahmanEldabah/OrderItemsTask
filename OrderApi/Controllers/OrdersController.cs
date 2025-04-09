using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace OrderApi
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder([FromBody] Order order)
        {
            if (order == null || order.OrderItems == null || !order.OrderItems.Any())
            {
                return BadRequest("Order must contain at least one item.");
            }

            foreach (var orderItem in order.OrderItems)
            {
                if (orderItem.Quantity <= 0 || orderItem.Price <= 0)
                {
                    return BadRequest("Invalid item in order.");
                }

                var item = await _context.Items.FindAsync(orderItem.ItemId);
                if (item == null)
                {
                    return NotFound($"Item with ID {orderItem.ItemId} not found.");
                }
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _context.Orders.Include(o => o.OrderItems).ToListAsync();
            return Ok(orders);
        }

        [HttpDelete("{orderId}")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
