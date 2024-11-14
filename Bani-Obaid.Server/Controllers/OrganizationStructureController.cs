using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationStructureController : ControllerBase
    {
        private readonly MyDbContext _db;
        public OrganizationStructureController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetStructure")]
        public IActionResult Structure()
        {
            var Structure = _db.OrganizationStructures.ToList();
            return Ok(Structure);
        }

        [HttpPost("addStructure")]
        public IActionResult AddOrganizationStructures([FromForm] StructureRequest structureDto)
        {
            if (structureDto.Image == null || structureDto.Image.Length == 0)
            {
                return BadRequest("The main municipality image is required.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var mainImageFileName = Guid.NewGuid().ToString() + "_" + structureDto.Image.FileName;
            var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);
            using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
            {
                structureDto.Image.CopyTo(fileStream);
            }

            var newStructure= new OrganizationStructure
            {
                Title = structureDto.Title,
                Image = $"/images/{mainImageFileName}",
            };

            _db.OrganizationStructures.Add(newStructure);
            _db.SaveChanges();

            return Ok(newStructure);
        }


        [HttpPut("updateStructure/{id}")]
        public IActionResult UpdateStructure(int id, [FromForm] StructureRequest structureDto)
        {
            var OrganizationStructures = _db.OrganizationStructures.FirstOrDefault(m => m.Id == id);

            if (OrganizationStructures == null)
            {
                return NotFound("Structure not found.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }


            if (structureDto.Image != null && structureDto.Image.Length > 0)
            {
                var mainImageFileName = Guid.NewGuid().ToString() + "_" + structureDto.Image.FileName;
                var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);

                using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
                {
                    structureDto.Image.CopyTo(fileStream);
                }

                OrganizationStructures.Image = $"/images/{mainImageFileName}";
            }
            OrganizationStructures.Title = structureDto.Title;



            _db.OrganizationStructures.Update(OrganizationStructures);
            _db.SaveChanges();
            return Ok(OrganizationStructures);
        }


        [HttpDelete("Deletestructure/{id}")]
        public IActionResult Deletestructure(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Please Enter A  valid Id");

            }

            var Structure = _db.OrganizationStructures.FirstOrDefault(s => s.Id == id);
            if (Structure != null)
            {
                _db.Remove(Structure);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("there is no Structure with this id");
        }
    }
}
