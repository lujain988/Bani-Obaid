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
        public IActionResult PostJob([FromBody] JobCreateDto jobDto)
        {
            var job = new Job
            {
                Image = jobDto.Image,
                Img1 = jobDto.Img1,
                Img2 = jobDto.Img2,
                Img3 = jobDto.Img3,
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

            // Only update if values are not null
            job.Image = jobDto.Image ?? job.Image;
            job.Img1 = jobDto.Img1 ?? job.Img1;
            job.Img2 = jobDto.Img2 ?? job.Img2;
            job.Img3 = jobDto.Img3 ?? job.Img3;
            job.Title = jobDto.Title ?? job.Title;
            job.Type = jobDto.Type ?? job.Type;
            job.Link = jobDto.Link ?? job.Link;
            job.Status = jobDto.Status ?? job.Status;
            job.UpdatedAt = DateTime.Now;

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