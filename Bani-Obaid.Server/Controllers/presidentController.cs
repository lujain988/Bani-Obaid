using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class presidentController : ControllerBase
    {
        private readonly MyDbContext _db;
        public presidentController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetPresident")]
        public IActionResult President()
        {
            var Municipality = _db.BaniObaidClubsPresidents.ToList();
            return Ok(Municipality);
        }

        [HttpGet("GetPresidentByID/{id}")]
        public IActionResult GetPresidentByID(int id)
        {
            var President = _db.BaniObaidClubsPresidents.FirstOrDefault(m => m.Id == id);

            if (President == null)
            {
                return NotFound("President not found.");
            }

            return Ok(President);
        }


        [HttpPost("addPresident")]
        public IActionResult Municipality([FromForm] PresidentRequest presidentDTO)
        {
            if (presidentDTO.Image == null || presidentDTO.Image.Length == 0)
            {
                return BadRequest("The main municipality image is required.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var mainImageFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(presidentDTO.Image.FileName);
            var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);

            using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
            {
                presidentDTO.Image.CopyTo(fileStream);
            }

            var newPresident = new BaniObaidClubsPresident
            {
                Name = presidentDTO.Name,
                Image = $"/images/{mainImageFileName}", 
                Speech = presidentDTO.Speech
            };

            _db.BaniObaidClubsPresidents.Add(newPresident);
            _db.SaveChanges();

            return Ok(newPresident);
        }

        [HttpPut("updatePresident/{id}")]
        public IActionResult UpdatePresident(int id, [FromForm] PresidentRequest presidentRequest)
        {
            var president = _db.BaniObaidClubsPresidents.FirstOrDefault(m => m.Id == id);

            if (president == null)
            {
                return NotFound("President not found.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            if (presidentRequest.Image != null && presidentRequest.Image.Length > 0)
            {
                var mainImageFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(presidentRequest.Image.FileName);
                var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);

                using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
                {
                    presidentRequest.Image.CopyTo(fileStream);
                }

                if (!string.IsNullOrEmpty(president.Image))
                {
                    var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", president.Image.TrimStart('/'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                president.Image = $"/images/{mainImageFileName}";
            }

            if (!string.IsNullOrEmpty(presidentRequest.Name))
            {
                president.Name = presidentRequest.Name;
            }

            if (presidentRequest.Speech != null)
            {
                president.Speech = !string.IsNullOrWhiteSpace(presidentRequest.Speech)
                    ? presidentRequest.Speech
                    : president.Speech;
            }

            _db.BaniObaidClubsPresidents.Update(president);
            _db.SaveChanges();

            return Ok(president);
        }

        [HttpDelete("DeletePresident/{id}")]
        public IActionResult DeletePresident(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Please Enter A  valid Id");

            }

            var President = _db.BaniObaidClubsPresidents.FirstOrDefault(m => m.Id == id);
            if (President != null)
            {
                _db.Remove(President);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("there is no President with this id");
        }

    }
}
