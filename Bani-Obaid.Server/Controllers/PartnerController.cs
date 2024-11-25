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
    public class PartnerController : ControllerBase
    {
        private readonly MyDbContext _db;

        public PartnerController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllPartners")]
        public IActionResult GetAllPartners()
        {
            var partners = _db.Partners.ToList();
            return Ok(partners);
        }

        [HttpGet("GetPartnerById/{id}")]
        public IActionResult GetPartnerById(int id)
        {
            var partner = _db.Partners.FirstOrDefault(p => p.Id == id);

            if (partner == null)
            {
                return NotFound("Partner not found.");
            }

            return Ok(partner);
        }

        [HttpPost("AddPartner")]
        public IActionResult AddPartner([FromForm] PartnerRequest partnerRequest)
        {
            if (partnerRequest.Logo == null || partnerRequest.Logo.Length == 0)
            {
                return BadRequest("Logo is required.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var logoFileName = Guid.NewGuid().ToString() + "_" + partnerRequest.Logo.FileName;
            var logoPath = Path.Combine(uploadsFolder, logoFileName);

            using (var fileStream = new FileStream(logoPath, FileMode.Create))
            {
                partnerRequest.Logo.CopyTo(fileStream);
            }

            var newPartner = new Partner
            {
                Name = partnerRequest.Name,
                Logo = $"/images/{logoFileName}",
                Link = partnerRequest.Link
            };

            _db.Partners.Add(newPartner);
            _db.SaveChanges();

            return Ok(newPartner);
        }

        [HttpPut("UpdatePartner/{id}")]
        public IActionResult UpdatePartner(int id, [FromForm] PartnerRequest partnerRequest)
        {
            var partner = _db.Partners.FirstOrDefault(p => p.Id == id);

            if (partner == null)
            {
                return NotFound("Partner not found.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            try
            {
                if (partnerRequest.Logo != null && partnerRequest.Logo.Length > 0)
                {
                    var logoFileName = Guid.NewGuid().ToString() + "_" + partnerRequest.Logo.FileName;
                    var logoPath = Path.Combine(uploadsFolder, logoFileName);

                    using (var fileStream = new FileStream(logoPath, FileMode.Create))
                    {
                        partnerRequest.Logo.CopyTo(fileStream);
                    }

                    partner.Logo = $"/images/{logoFileName}";
                }

                if (!string.IsNullOrEmpty(partnerRequest.Name))
                {
                    partner.Name = partnerRequest.Name;
                }

                if (!string.IsNullOrEmpty(partnerRequest.Link))
                {
                    partner.Link = partnerRequest.Link;
                }

                _db.Partners.Update(partner);
                _db.SaveChanges();

                return Ok(partner);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = "An error occurred while updating the partner.",
                    Error = ex.Message
                });
            }
        }

        [HttpDelete("DeletePartner/{id}")]
        public IActionResult DeletePartner(int id)
        {
            var partner = _db.Partners.FirstOrDefault(p => p.Id == id);

            if (partner == null)
            {
                return NotFound("Partner not found.");
            }

            _db.Partners.Remove(partner);
            _db.SaveChanges();

            return NoContent();
        }
    }
}
