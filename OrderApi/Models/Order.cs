namespace OrderApi;

public class Order
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public decimal TotalPrice => OrderItems.Sum(item => item.Total);

    public void AddOrderItem(OrderItem item)
    {
        OrderItems.Add(item);
    }
}