using Bani_Obaid.Server.Models;
using Bani_Obaid.Server.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LandMarkController : ControllerBase
    {
        private readonly MyDbContext _db;

        public LandMarkController(MyDbContext db)
        {
            _db = db;
        }

        // GET: api/LandMark
        [HttpGet]
        public IActionResult GetLand()
        {
            var land = _db.Landmarks.ToList();
            return land != null ? Ok(land) : NotFound();
        }

        [HttpGet("{id}")]
        public IActionResult GetLand(int id)
        {
            var land = _db.Landmarks.FirstOrDefault(a => a.Id == id);
            if (land == null) return NotFound();

            // Retrieve associated images
            var images = _db.LandmarkImages
                .Where(img => img.LandmarkId == id)
                .Select(img => new { img.Id, img.ImageUrl })
                .ToList();

            // Return response in the expected format
            var response = new
            {
                land,
                images
            };

            return Ok(response);
        }


        // POST: api/LandMark
        [HttpPost]
        public IActionResult CreateLandmark([FromForm] LandDTORequiest landDTO)
        {
            if (landDTO == null)
            {
                return BadRequest("Invalid data.");
            }

            var landmark = new Landmark
            {
                Name = landDTO.Name,
                Location = landDTO.Location,
                Description = landDTO.Description,
                CreatedAt = landDTO.CreatedAt ?? DateTime.Now,
            };

            // Handle main image upload
            if (landDTO.Image != null && landDTO.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                Directory.CreateDirectory(uploadsFolder);
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + landDTO.Image.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    landDTO.Image.CopyTo(fileStream);
                }

                landmark.Image = $"/images/{uniqueFileName}";
            }

            _db.Landmarks.Add(landmark);
            _db.SaveChanges();

            return CreatedAtAction(nameof(GetLand), new { id = landmark.Id }, landmark);
        }

        // PUT: api/LandMark/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateLandmark(int id, [FromForm] LandDTORequiest landDTO)
        {
            var existingLandmark = _db.Landmarks.FirstOrDefault(a => a.Id == id);
            if (existingLandmark == null)
            {
                return NotFound($"Landmark with ID {id} not found.");
            }

            // Update properties if provided
            existingLandmark.Name = landDTO.Name ?? existingLandmark.Name;
            existingLandmark.Location = landDTO.Location ?? existingLandmark.Location;
            existingLandmark.Description = landDTO.Description ?? existingLandmark.Description;
            existingLandmark.UpdatedAt = DateTime.Now;

            // Handle main image upload if a new image is provided
            if (landDTO.Image != null && landDTO.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                Directory.CreateDirectory(uploadsFolder);
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + landDTO.Image.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    landDTO.Image.CopyTo(fileStream);
                }

                // Update main image path
                existingLandmark.Image = $"/images/{uniqueFileName}";
            }

            _db.SaveChanges();
            return Ok(new { message = "Landmark updated successfully" });
        }

        // POST: api/LandMark/AddAdditionalImages/{id}
        [HttpPost("AddAdditionalImages/{id}")]
        public IActionResult AddAdditionalImages(int id, [FromForm] List<IFormFile> additionalImages)
        {
            var landmark = _db.Landmarks.FirstOrDefault(a => a.Id == id);
            if (landmark == null)
            {
                return NotFound($"Landmark with ID {id} not found.");
            }

            if (additionalImages != null && additionalImages.Count > 0)
            {
                foreach (var imgFile in additionalImages)
                {
                    if (imgFile != null && imgFile.Length > 0)
                    {
                        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                        Directory.CreateDirectory(uploadsFolder);
                        var uniqueFileName = Guid.NewGuid().ToString() + "_" + imgFile.FileName;
                        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            imgFile.CopyTo(fileStream);
                        }

                        var landmarkImage = new LandmarkImage
                        {
                            LandmarkId = landmark.Id,
                            ImageUrl = $"/images/{uniqueFileName}"
                        };
                        _db.LandmarkImages.Add(landmarkImage);
                    }
                }
                _db.SaveChanges();
            }

            return Ok(new { message = "Additional images added successfully" });
        }

        [HttpGet("showImages/{id}")]
        public IActionResult showImages(int id)
        {
            var images = _db.LandmarkImages.Where(a=> a.LandmarkId==id).ToList();
            return images != null ? Ok(images) : NotFound();

        }

        // DELETE: api/LandMark/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteLandmark(int id)
        {
            var landmark = _db.Landmarks.FirstOrDefault(a => a.Id == id);
            if (landmark == null)
            {
                return NotFound();
            }

            // Delete main image if it exists
            if (!string.IsNullOrEmpty(landmark.Image))
            {
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", landmark.Image.TrimStart('/'));
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }

            // Delete associated images from landmark_images
            var images = _db.LandmarkImages.Where(img => img.LandmarkId == id).ToList();
            foreach (var image in images)
            {
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.ImageUrl.TrimStart('/'));
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
                _db.LandmarkImages.Remove(image);
            }

            _db.Landmarks.Remove(landmark);
            _db.SaveChanges();
            return NoContent();
        }

        // DELETE: api/LandMark/DeleteImage/{imageId}
        [HttpDelete("DeleteImage/{imageId}")]
        public IActionResult DeleteImage(int imageId)
        {
            var image = _db.LandmarkImages.FirstOrDefault(img => img.Id == imageId);
            if (image == null)
            {
                return NotFound("Image not found.");
            }

            // Delete image file from the server
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.ImageUrl.TrimStart('/'));
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }

            _db.LandmarkImages.Remove(image);
            _db.SaveChanges();
            return Ok(new { message = "Image deleted successfully" });
        }
    }
}
