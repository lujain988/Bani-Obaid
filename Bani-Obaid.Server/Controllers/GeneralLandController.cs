using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralLandController : ControllerBase
    {
        private readonly MyDbContext _db;

        public GeneralLandController(MyDbContext db)
        {
            _db = db;
        }
        // GET: api/LandMark
        [HttpGet]
        public IActionResult GetLand()
        {
            var land = _db.GenralLands.ToList();
            return land != null ? Ok(land) : NotFound();
        }

        [HttpGet("{id}")]
        public IActionResult GetLand(int id)
        {
            var land = _db.GenralLands.FirstOrDefault(a => a.Id == id);
            if (land == null) return NotFound();

            // Retrieve associated images
            var images = _db.Albums
                .Where(img => img.GenralLandId == id)
                .Select(img => new { img.Id, img.Image })
                .ToList();

            var response = new
            {
                land,
                images
            };

            return Ok(response);
        }

        // POST: api/LandMark
        [HttpPost]
        public IActionResult CreateLandmark([FromForm] GenralLandDTO landDTO)
        {
            if (landDTO == null)
            {
                return BadRequest("Invalid data.");
            }

            var landmark = new GenralLand
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

            _db.GenralLands.Add(landmark);
            _db.SaveChanges();

            // Handle additional images in landmark_images table
            if (landDTO.AdditionalImages != null && landDTO.AdditionalImages.Count > 0)
            {
                foreach (var imgFile in landDTO.AdditionalImages)
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

                        var landmarkImage = new Album
                        {
                            GenralLandId = landmark.Id,
                            Image = $"/images/{uniqueFileName}"
                        };
                        _db.Albums.Add(landmarkImage);
                    }
                }
                _db.SaveChanges();
            }

            return CreatedAtAction(nameof(GetLand), new { id = landmark.Id }, landmark);
        }


        // PUT: api/LandMark/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateLandmark(int id, [FromForm] GenralLandDTO landDTO)
        {
            var existingLandmark = _db.GenralLands.FirstOrDefault(a => a.Id == id);
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

            // Handle additional images
            if (landDTO.AdditionalImages != null && landDTO.AdditionalImages.Count > 0)
            {
                foreach (var imgFile in landDTO.AdditionalImages)
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

                        var landmarkImage = new Album
                        {
                            GenralLandId = existingLandmark.Id,
                            Image = $"/images/{uniqueFileName}"
                        };
                        _db.Albums.Add(landmarkImage);
                    }
                }
            }

            _db.SaveChanges();
            return Ok(new { message = "Landmark updated successfully" });
        }




        // DELETE: api/GeneralLand/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteGeneralLand(int id)
        {
            var generalLand = _db.GenralLands.FirstOrDefault(a => a.Id == id);
            if (generalLand == null)
            {
                return NotFound();
            }

            // Delete main image if it exists
            if (!string.IsNullOrEmpty(generalLand.Image))
            {
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", generalLand.Image.TrimStart('/'));
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }

            // Delete associated images from albums (related to the GeneralLand)
            var albums = _db.Albums.Where(a => a.GenralLandId == id).ToList();
            foreach (var album in albums)
            {
                // Delete album image if it exists
                if (!string.IsNullOrEmpty(album.Image))
                {
                    var albumImagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", album.Image.TrimStart('/'));
                    if (System.IO.File.Exists(albumImagePath))
                    {
                        System.IO.File.Delete(albumImagePath);
                    }
                }
                _db.Albums.Remove(album);
            }

            // Now delete the GenralLand
            _db.GenralLands.Remove(generalLand);
            _db.SaveChanges();

            return NoContent();
        }


        // DELETE: api/LandMark/DeleteImage/{imageId}
        [HttpDelete("DeleteImage/{imageId}")]
        public IActionResult DeleteImage(int imageId)
        {
            var image = _db.Albums.FirstOrDefault(img => img.Id == imageId);
            if (image == null)
            {
                return NotFound("Image not found.");
            }

            // Delete image file from the server
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.Image.TrimStart('/'));
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }

            _db.Albums.Remove(image);
            _db.SaveChanges();
            return Ok(new { message = "Image deleted successfully" });
        }
    }
}


