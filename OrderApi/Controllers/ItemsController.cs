namespace OrderApi;

using Microsoft.AspNetCore.Mvc;
using OrderApi;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    // This will act like a mock in-memory item list for now

    private readonly ApplicationDbContext _context;

    public ItemsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Item>> GetItems()
    {
        return Ok(_context.Items.ToList());
    }
}
