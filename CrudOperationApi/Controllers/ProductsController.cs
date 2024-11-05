using CrudOperationApi.Data;
using CrudOperationApi.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudOperationApi.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ProductsController : ControllerBase
    {
        private ProductsAPIDbContext dbContext;
        public ProductsController(ProductsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await dbContext.Products.ToListAsync());
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetProduct([FromRoute] Guid id)
        {
            var product = await dbContext.Products.FindAsync(id);
            if (product != null)
            {                
                return Ok(product);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(ProductRequest productRequest)
        {
            var product = new Product()
            {
                Id = Guid.NewGuid(),
                Name = productRequest.Name,
                Price = productRequest.Price,
                Category = productRequest.Category,
            };
            await dbContext.Products.AddAsync(product);
            await dbContext.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid id, ProductRequest productRequest)
        {
            var product = await dbContext.Products.FindAsync(id);
            if (product != null)
            {
                product.Name = productRequest.Name;
                product.Price = productRequest.Price;
                product.Category = productRequest.Category;
                
                await dbContext.SaveChangesAsync();
                return Ok(product);
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var product = await dbContext.Products.FindAsync(id);
            if (product != null)
            {
                dbContext.Remove(product);
                dbContext.SaveChanges();
                return Ok(product);
            }
            return NotFound();
        }
    }
}
