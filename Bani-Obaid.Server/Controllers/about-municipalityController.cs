using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public IActionResult UpdateMunicipality(int id, [FromForm] AboutMunicipality aboutRequest)
        {
            var municipality = _db.MunicipalityInfos.FirstOrDefault(m => m.Id == id);

            if (municipality == null)
            {
                return NotFound("Municipality not found.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            try
            {
                // تحديث الصورة إذا تم رفع صورة جديدة
                if (aboutRequest.DescriptionImage != null && aboutRequest.DescriptionImage.Length > 0)
                {
                    var mainImageFileName = Guid.NewGuid().ToString() + "_" + aboutRequest.DescriptionImage.FileName;
                    var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);

                    using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
                    {
                        aboutRequest.DescriptionImage.CopyTo(fileStream);
                    }

                    municipality.DescriptionImage = $"/images/{mainImageFileName}";
                }

                // تحديث الحقول الأخرى فقط إذا كانت القيم المرسلة غير فارغة
                if (!string.IsNullOrEmpty(aboutRequest.Description))
                {
                    municipality.Description = aboutRequest.Description;
                }

                if (!string.IsNullOrEmpty(aboutRequest.Vision))
                {
                    municipality.Vision = aboutRequest.Vision;
                }

                if (!string.IsNullOrEmpty(aboutRequest.Mission))
                {
                    municipality.Mission = aboutRequest.Mission;
                }

                // تحديث تاريخ التعديل
                municipality.UpdatedAt = DateTime.Now;

                // تحديث السجل في قاعدة البيانات
                _db.MunicipalityInfos.Update(municipality);
                _db.SaveChanges();

                return Ok(municipality);
            }
            catch (DbUpdateException ex)
            {
                // إرجاع تفاصيل الخطأ
                return BadRequest(new
                {
                    Message = "An error occurred while updating the municipality.",
                    Error = ex.InnerException?.Message ?? ex.Message
                });
            }
            catch (Exception ex)
            {
                // معالجة أي أخطاء أخرى
                return StatusCode(500, new
                {
                    Message = "An unexpected error occurred.",
                    Error = ex.Message
                });
            }
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
