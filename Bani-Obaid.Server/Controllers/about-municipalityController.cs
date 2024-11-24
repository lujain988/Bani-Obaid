using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class about_municipalityController : ControllerBase
    {
        private readonly MyDbContext _db;
        public about_municipalityController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet ("GetMunicipality")]
        public IActionResult About()
        {
            var Municipality = _db.MunicipalityInfos.ToList();
            return Ok(Municipality);
        }

        [HttpGet("GetMunicipalityByID/{id}")]
        public IActionResult GetMunicipalityByID(int id)
        {
            var municipality = _db.MunicipalityInfos.FirstOrDefault(m => m.Id == id);

            if (municipality == null)
            {
                return NotFound("Municipality not found.");
            }

            return Ok(municipality);
        }

        [HttpPost("addMunicipality")]
        public IActionResult Municipality([FromForm] AboutMunicipality municipalityrequest)
        {
            if (municipalityrequest.DescriptionImage == null || municipalityrequest.DescriptionImage.Length == 0)
            {
                return BadRequest("The main municipality image is required.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var mainImageFileName = Guid.NewGuid().ToString() + "_" + municipalityrequest.DescriptionImage.FileName;
            var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);
            using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
            {
                municipalityrequest.DescriptionImage.CopyTo(fileStream);
            }

            var newMunicipality = new MunicipalityInfo
            {
                Description = municipalityrequest.Description,
                DescriptionImage = $"/images/{mainImageFileName}",
                Vision = municipalityrequest.Vision,
                Mission = municipalityrequest.Mission,
            };

            _db.MunicipalityInfos.Add(newMunicipality);
            _db.SaveChanges();

            return Ok(newMunicipality);
        }

        [HttpPut("updateMunicipality/{id}")]
        public IActionResult UpdateMunicipality(int id, [FromForm] AboutMunicipality aboutrequest)
        {
            var Municipality = _db.MunicipalityInfos.FirstOrDefault(m => m.Id == id);

            if (Municipality == null)
            {
                return NotFound("Municipality not found.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }


            if (aboutrequest.DescriptionImage != null && aboutrequest.DescriptionImage.Length > 0)
            {
                var mainImageFileName = Guid.NewGuid().ToString() + "_" + aboutrequest.DescriptionImage.FileName;
                var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);

                using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
                {
                    aboutrequest.DescriptionImage.CopyTo(fileStream);
                }

                Municipality.DescriptionImage = $"/images/{mainImageFileName}";
            }
            Municipality.Description = aboutrequest.Description;
            Municipality.Vision = aboutrequest.Vision;
            Municipality.Mission = aboutrequest.Mission;


            _db.MunicipalityInfos.Update(Municipality);
            _db.SaveChanges();
            return Ok(Municipality);
        }


        [HttpDelete("DeleteMunicipality/{id}")]
        public IActionResult DeleteMunicipality(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Please Enter A  valid Id");

            }

            var Municipality = _db.MunicipalityInfos.FirstOrDefault(m => m.Id == id);
            if (Municipality != null)
            {
                _db.Remove(Municipality);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("there is no Municipality with this id");
        }
    
    }
}
