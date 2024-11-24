using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplainController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ComplainController(MyDbContext db)
        {
            _db = db;
        }
        [HttpPost("Complain")]
        public async Task<IActionResult> CreateComplain([FromForm] ComplainDTo model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string imagePath = null;

                    // Check if the image file is provided
                    if (model.Image != null)
                    {
                        // Save the uploaded image
                        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/complains");
                        if (!Directory.Exists(uploadsFolder))
                        {
                            Directory.CreateDirectory(uploadsFolder);
                        }

                        var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(model.Image.FileName);
                        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await model.Image.CopyToAsync(fileStream);
                        }

                        imagePath = Path.Combine("uploads/complains", uniqueFileName).Replace("\\", "/");
                    }

                    var complain = new Complain
                    {
                        Name = model.Name,
                        Email = model.Email,
                        Phone = model.Phone,
                        NationalId = model.NationalId,
                        ComplainType = model.ComplainType,
                        ComplainDetails = model.ComplainDetails,
                        Image = imagePath, 
                        Address = model.Address,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };

                    _db.Complains.Add(complain);
                    await _db.SaveChangesAsync();

                    return Ok(new { success = true, message = "Complain submitted successfully!" });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { success = false, message = "An error occurred while processing the request.", error = ex.Message });
                }
            }

            return BadRequest(new { success = false, message = "Invalid data submitted." });
        }

    }

}
