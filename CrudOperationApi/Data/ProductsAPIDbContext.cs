

using CrudOperationApi.Model;
using Microsoft.EntityFrameworkCore;

namespace CrudOperationApi.Data
{
    public class ProductsAPIDbContext : DbContext
    {
        public ProductsAPIDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}
