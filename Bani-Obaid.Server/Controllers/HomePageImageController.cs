using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomePageImageController : ControllerBase
    {
        private readonly MyDbContext _db;

        public HomePageImageController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllHomePageImages")]
        public IActionResult GetAllHomePageImages()
        {
            var images = _db.HomePageImages.ToList();
            return Ok(images);
        }

        [HttpGet("GetHomePageImageById/{id}")]
        public IActionResult GetHomePageImageById(int id)
        {
            var image = _db.HomePageImages.FirstOrDefault(i => i.Id == id);
            if (image == null)
            {
                return NotFound("Home Page Image not found.");
            }

            return Ok(image);
        }


        [HttpPost("AddHomePageImage")]
        public IActionResult AddHomePageImage([FromForm] HomePageImageRequest imageRequest)
        {
            if (imageRequest.HomeImage == null || imageRequest.HomeImage.Length == 0)
            {
                return BadRequest("The home image is required.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var imageFileName = Guid.NewGuid().ToString() + "_" + imageRequest.HomeImage.FileName;
            var imagePath = Path.Combine(uploadsFolder, imageFileName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                imageRequest.HomeImage.CopyTo(fileStream);
            }

            var newHomePageImage = new HomePageImage
            {
                HomeTitle = imageRequest.HomeTitle,
                HomeDescription = imageRequest.HomeDescription,
                HomeImage = $"/images/{imageFileName}"
            };

            _db.HomePageImages.Add(newHomePageImage);
            _db.SaveChanges();

            return Ok(newHomePageImage);
        }
        [HttpPut("UpdateHomePageImage/{id}")]
        public IActionResult UpdateHomePageImage(int id, [FromForm] HomePageImageRequest imageRequest)
        {
            var existingImage = _db.HomePageImages.FirstOrDefault(i => i.Id == id);

            if (existingImage == null)
            {
                return NotFound("Home Page Image not found.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            if (!string.IsNullOrEmpty(imageRequest.HomeTitle))
            {
                existingImage.HomeTitle = imageRequest.HomeTitle;
            }

            if (!string.IsNullOrEmpty(imageRequest.HomeDescription))
            {
                existingImage.HomeDescription = imageRequest.HomeDescription;
            }

            if (imageRequest.HomeImage != null)
            {
                var fileExtension = Path.GetExtension(imageRequest.HomeImage.FileName);
                var imageFileName = Guid.NewGuid().ToString() + fileExtension;
                var imagePath = Path.Combine(uploadsFolder, imageFileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    imageRequest.HomeImage.CopyTo(stream);
                }

                existingImage.HomeImage = $"/images/{imageFileName}";
            }

            _db.HomePageImages.Update(existingImage);
            _db.SaveChanges();

            return Ok(existingImage);
        }

        [HttpDelete("DeleteHomePageImage/{id}")]
        public IActionResult DeleteHomePageImage(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Please enter a valid ID.");
            }

            var existingImage = _db.HomePageImages.FirstOrDefault(i => i.Id == id);

            if (existingImage == null)
            {
                return NotFound("Home Page Image not found.");
            }

            _db.HomePageImages.Remove(existingImage);
            _db.SaveChanges();

            return NoContent();
        }
    }
}
