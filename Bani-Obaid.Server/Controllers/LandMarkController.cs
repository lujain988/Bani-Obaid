using Bani_Obaid.Server.Models;
using Bani_Obaid.Server.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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

        // GET: api/LandMark/{id}
        [HttpGet("{id}")]
        public IActionResult GetLand(int id)
        {
            var land = _db.Landmarks.FirstOrDefault(a => a.Id == id);
            return land != null ? Ok(land) : NotFound();
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

            // Handle image upload
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

            // Only update properties if they are not null or empty
            if (!string.IsNullOrEmpty(landDTO.Name))
            {
                existingLandmark.Name = landDTO.Name;
            }

            if (!string.IsNullOrEmpty(landDTO.Location))
            {
                existingLandmark.Location = landDTO.Location;
            }

            if (!string.IsNullOrEmpty(landDTO.Description))
            {
                existingLandmark.Description = landDTO.Description;
            }

            // Always update the UpdatedAt timestamp
            existingLandmark.UpdatedAt = landDTO.UpdatedAt ?? DateTime.Now;

            // Handle image upload if a new image is provided
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

                // Update image path
                existingLandmark.Image = $"/images/{uniqueFileName}";
            }

            _db.SaveChanges();
            return Ok(new { message = "Landmark updated successfully" });
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

            if (!string.IsNullOrEmpty(landmark.Image))
            {
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", landmark.Image.TrimStart('/'));
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }

            _db.Landmarks.Remove(landmark);
            _db.SaveChanges();
            return NoContent();
        }
    }
}
