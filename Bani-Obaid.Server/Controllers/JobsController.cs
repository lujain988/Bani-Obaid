using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bani_Obaid.Server.Models;
using Bani_Obaid.Server.Dto;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public JobsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Jobs/ActiveJobs/1
        [HttpGet("ActiveJobs/{type}")]
        public IActionResult GetActiveJobsByType(int type)
        {
            var jobs = _context.Jobs
                .Where(j => j.Status == "active" && j.Type == type.ToString())
                .Select(j => new JobResponseDto
                {
                    Id = j.Id,
                    Image = j.Image,
                    Img1 = j.Img1,
                    Img2 = j.Img2,
                    Img3 = j.Img3,
                    Title = j.Title,
                    Type = j.Type,
                    Link = j.Link,
                    Status = j.Status,
                    //CreatedAt = j.CreatedAt,
                    //UpdatedAt = j.UpdatedAt
                })
                .ToList();

            return Ok(jobs);
        }

        // GET: api/Jobs
        [HttpGet]
        public IActionResult GetAllJobs()
        {
            var jobs = _context.Jobs
                .Select(j => new JobResponseDto
                {
                    Id = j.Id,
                    Image = j.Image,
                    Img1 = j.Img1,
                    Img2 = j.Img2,
                    Img3 = j.Img3,
                    Title = j.Title,
                    Type = j.Type,
                    Link = j.Link,
                    Status = j.Status,
                    //CreatedAt = j.CreatedAt,
                    //UpdatedAt = j.UpdatedAt
                })
                .ToList();

            return Ok(jobs);
        }

        // GET: api/Jobs/5
        [HttpGet("{id}")]
        public IActionResult GetJobById(int id)
        {
            var job = _context.Jobs
                .Where(j => j.Id == id)
                .Select(j => new JobResponseDto
                {
                    Id = j.Id,
                    Image = j.Image,
                    Img1 = j.Img1,
                    Img2 = j.Img2,
                    Img3 = j.Img3,
                    Title = j.Title,
                    Type = j.Type,
                    Link = j.Link,
                    Status = j.Status,
                    //CreatedAt = j.CreatedAt,
                    //UpdatedAt = j.UpdatedAt
                })
                .FirstOrDefault();

            if (job == null)
                return NotFound();

            return Ok(job);
        }

        // POST: api/Jobs
        [HttpPost]
        public IActionResult PostJob([FromForm] JobCreateDto jobDto)
        {
            if (jobDto.Image == null || jobDto.Image.Length == 0)
            {
                return BadRequest("Main image is required.");
            }

            // Folder path for saving images
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Helper method to save file and return relative path
            string SaveFile(IFormFile file)
            {
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                return $"/images/{uniqueFileName}";
            }

            // Save images and get paths
            var imagePath = SaveFile(jobDto.Image);
            var img1Path = jobDto.Img1 != null ? SaveFile(jobDto.Img1) : null;
            var img2Path = jobDto.Img2 != null ? SaveFile(jobDto.Img2) : null;
            var img3Path = jobDto.Img3 != null ? SaveFile(jobDto.Img3) : null;

            // Create the job object
            var job = new Job
            {
                Image = imagePath,
                Img1 = img1Path,
                Img2 = img2Path,
                Img3 = img3Path,
                Title = jobDto.Title,
                Type = jobDto.Type,
                Link = jobDto.Link,
                Status = jobDto.Status
            };

            _context.Jobs.Add(job);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetJobById), new { id = job.Id }, job);
        }


        // PUT: api/Jobs/5
        [HttpPut("{id}")]
        public IActionResult EditJob(int id, [FromForm] JobUpdateDto jobDto)
        {
            var job = _context.Jobs.Find(id);

            if (job == null)
                return NotFound();

            // تحديث الصورة إذا تم رفع صورة جديدة
            if (jobDto.Image != null && jobDto.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // إنشاء اسم فريد للصورة
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + jobDto.Image.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // حفظ الصورة على الخادم
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    jobDto.Image.CopyTo(fileStream);
                }

                // تحديث مسار الصورة في قاعدة البيانات
                job.Image = $"/images/{uniqueFileName}";
            }

            // تحديث الحقول الأخرى إذا لم تكن فارغة
            job.Img1 = jobDto.Img1 ?? job.Img1;
            job.Img2 = jobDto.Img2 ?? job.Img2;
            job.Img3 = jobDto.Img3 ?? job.Img3;
            job.Title = jobDto.Title ?? job.Title;
            job.Type = jobDto.Type ?? job.Type;
            job.Link = jobDto.Link ?? job.Link;
            job.Status = jobDto.Status ?? job.Status;
            job.UpdatedAt = DateTime.Now;

            // تحديث البيانات في قاعدة البيانات
            _context.Jobs.Update(job);
            _context.SaveChanges();

            return Ok(job);
        }



        // DELETE: api/Jobs/5
        [HttpDelete("{id}")]
        public IActionResult DeleteJob(int id)
        {
            var job = _context.Jobs.Find(id);

            if (job == null)
                return NotFound();

            _context.Jobs.Remove(job);
            _context.SaveChanges();

            return NoContent();
        }

        // PUT: api/Jobs/ChangeStatus/5
        [HttpGet("ChangeStatus/{id}")]
        public IActionResult ChangeStatus(int id)
        {
            var job = _context.Jobs.Find(id);

            if (job == null)
                return NotFound();

            job.Status = job.Status == "active" ? "unactive" : "active";

            _context.Jobs.Update(job);
            _context.SaveChanges();

            return Ok(job);
        }

    }

}