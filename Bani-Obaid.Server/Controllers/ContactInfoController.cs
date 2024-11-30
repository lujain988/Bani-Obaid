using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactInfoController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ContactInfoController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetContactInfo")]
        public IActionResult GetContactInfo()
        {
            var contactInfo = _db.MunicipalityContactInfos.ToList();
            return Ok(contactInfo);
        }

        [HttpGet("GetContactInfoByID/{id}")]
        public IActionResult GetContactInfoByID(int id)
        {
            var contactInfo = _db.MunicipalityContactInfos.FirstOrDefault(c => c.Id == id);

            if (contactInfo == null)
            {
                return NotFound("Contact info not found.");
            }

            return Ok(contactInfo);
        }

        [HttpPost("AddContactInfo")]
        public IActionResult AddContactInfo([FromForm] ContactInfoRequest contactInfoRequest)
        {
            // تحقق من وجود صورة الـ logo
            if (contactInfoRequest.Logo == null || contactInfoRequest.Logo.Length == 0)
            {
                return BadRequest("The logo image is required.");
            }

            // تحديد مجلد الصور على الخادم
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            // التأكد من أن المجلد موجود، وإذا لم يكن موجودًا، سيتم إنشاؤه
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // توليد اسم فريد للصورة
            var logoFileName = Guid.NewGuid().ToString() + "_" + contactInfoRequest.Logo.FileName;
            var logoPath = Path.Combine(uploadsFolder, logoFileName);

            // رفع الصورة إلى المجلد
            using (var fileStream = new FileStream(logoPath, FileMode.Create))
            {
                contactInfoRequest.Logo.CopyTo(fileStream);
            }

            // إنشاء الكائن الذي سيُضاف إلى قاعدة البيانات
            var newContactInfo = new MunicipalityContactInfo
            {
                Logo = $"/images/{logoFileName}",
                Email = contactInfoRequest.Email,
                Phone = contactInfoRequest.Phone,
                Facebook = contactInfoRequest.Facebook,
                Youtube = contactInfoRequest.Youtube,
                Twitter = contactInfoRequest.Twitter,
            };

            // إضافة الكائن إلى قاعدة البيانات
            _db.MunicipalityContactInfos.Add(newContactInfo);
            _db.SaveChanges();

            return Ok(newContactInfo);
        }

        [HttpPut("UpdateContactInfo/{id}")]
        public IActionResult UpdateContactInfo(int id, [FromForm] ContactInfoRequest contactInfoRequest)
        {
            var contactInfo = _db.MunicipalityContactInfos.FirstOrDefault(c => c.Id == id);

            if (contactInfo == null)
            {
                return NotFound("Contact info not found.");
            }

            // تحديد مجلد الصور على الخادم
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            // التأكد من أن المجلد موجود، وإذا لم يكن موجودًا، سيتم إنشاؤه
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            try
            {
                // إذا تم رفع صورة جديدة، نرفعها ونحدث مسارها
                if (contactInfoRequest.Logo != null && contactInfoRequest.Logo.Length > 0)
                {
                    var logoFileName = Guid.NewGuid().ToString() + "_" + contactInfoRequest.Logo.FileName;
                    var logoPath = Path.Combine(uploadsFolder, logoFileName);

                    using (var fileStream = new FileStream(logoPath, FileMode.Create))
                    {
                        contactInfoRequest.Logo.CopyTo(fileStream);
                    }

                    contactInfo.Logo = $"/images/{logoFileName}";
                }

                // تحديث باقي الحقول إذا تم تمرير قيم جديدة
                if (!string.IsNullOrEmpty(contactInfoRequest.Email))
                {
                    contactInfo.Email = contactInfoRequest.Email;
                }

                if (!string.IsNullOrEmpty(contactInfoRequest.Phone))
                {
                    contactInfo.Phone = contactInfoRequest.Phone;
                }

                if (!string.IsNullOrEmpty(contactInfoRequest.Facebook))
                {
                    contactInfo.Facebook = contactInfoRequest.Facebook;
                }

                if (!string.IsNullOrEmpty(contactInfoRequest.Youtube))
                {
                    contactInfo.Youtube = contactInfoRequest.Youtube;
                }

                if (!string.IsNullOrEmpty(contactInfoRequest.Twitter))
                {
                    contactInfo.Twitter = contactInfoRequest.Twitter;
                }

                // تحديث تاريخ التعديل
                contactInfo.UpdatedAt = DateTime.Now;

                // تحديث السجل في قاعدة البيانات
                _db.MunicipalityContactInfos.Update(contactInfo);
                _db.SaveChanges();

                return Ok(contactInfo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = "An unexpected error occurred.",
                    Error = ex.Message
                });
            }
        }

        [HttpDelete("DeleteContactInfo/{id}")]
        public IActionResult DeleteContactInfo(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Please Enter A valid Id");
            }

            var contactInfo = _db.MunicipalityContactInfos.FirstOrDefault(c => c.Id == id);
            if (contactInfo != null)
            {
                _db.Remove(contactInfo);
                _db.SaveChanges();
                return NoContent();
            }

            return NotFound("There is no contact info with this id.");
        }
    }
}
