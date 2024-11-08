using System.ComponentModel.DataAnnotations;

namespace CrudOperationApi.Model
{
    public class Product
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [Range(0, 999.99)]
        public decimal Price { get; set; }
        public string? Category { get; set; }
        public int Unit { get; set; }
    }
}
