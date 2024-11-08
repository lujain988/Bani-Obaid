using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ProjectController(MyDbContext db)
        {

            _db = db;
        }


        [HttpGet("GetAllProjects")]
        public IActionResult GetProjects()
        {
            var project = _db.Projects.ToList();
            if (project != null)
            {
                return Ok(project);

            }

            return NotFound("there is no procts");
        }



        [HttpGet("GetProjectbyId/{id}")]

        public IActionResult GetProjectbyId(int id) {
            if (id <= 0)
            {
                return BadRequest("Please enter a valid Id");

            }    
        var project = _db.Projects.FirstOrDefault(p=>p.Id == id);
            if (project != null) { 
            
            return Ok(project); 
            }

            return NotFound("There is no project With this Id");

        }


        [HttpDelete("daleteproject/{id}")]
        public IActionResult DeleteProject(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Please Enter a Valid Id");
            }

            var project = _db.Projects.FirstOrDefault(p => p.Id == id);
            if (project != null)
            {
                _db.Projects.Remove(project);
                _db.SaveChanges();
                return NoContent();
            }
            return NotFound("There is no Project with this id ");
        }

        [HttpPost("addProject")]
        public IActionResult AddProject([FromForm] ProjectDto projectDto)
        {
            if (projectDto.Image == null || projectDto.Image.Length == 0)
            {
                return BadRequest("The main project image is required.");
            }

           
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var mainImageFileName = Guid.NewGuid().ToString() + "_" + projectDto.Image.FileName;
            var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);
            using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
            {
                projectDto.Image.CopyTo(fileStream);
            }

            var newProject = new Project
            {
                Title = projectDto.Title,
                Description = projectDto.Description,
                Percentage = projectDto.Percentage,
                Status = projectDto.Status,
                Image = $"/images/{mainImageFileName}", 
            };

           
            newProject.Img1 = SaveOptionalImage(projectDto.Img1, uploadsFolder);
            newProject.Img2 = SaveOptionalImage(projectDto.Img2, uploadsFolder);
            newProject.Img3 = SaveOptionalImage(projectDto.Img3, uploadsFolder);
            newProject.Img4 = SaveOptionalImage(projectDto.Img4, uploadsFolder);
            newProject.Img5 = SaveOptionalImage(projectDto.Img5, uploadsFolder);
            newProject.Img6 = SaveOptionalImage(projectDto.Img6, uploadsFolder);
            newProject.Img7 = SaveOptionalImage(projectDto.Img7, uploadsFolder);
            newProject.Img8 = SaveOptionalImage(projectDto.Img8, uploadsFolder);

            _db.Projects.Add(newProject);
            _db.SaveChanges();

            return Ok(newProject);
        }

       
        private string? SaveOptionalImage(IFormFile? imageFile, string uploadsFolder)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    imageFile.CopyTo(fileStream);
                }
                return $"/images/{uniqueFileName}";
            }
            return null;
        }



        [HttpGet("getVisibleProjects")]
        public IActionResult GetVisibleProjects()
        {
            var visibleProjects = _db.Projects.Where(p => p.Status == "Visible").ToList();
            return Ok(visibleProjects);
        }




        [HttpPut("updateProject/{id}")]
        public IActionResult UpdateProject(int id, [FromForm] ProjectDto projectDto)
        {
            var project = _db.Projects.FirstOrDefault(p => p.Id == id);

            if (project == null)
            {
                return NotFound("Project not found.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            if (projectDto.Image != null && projectDto.Image.Length > 0)
            {
                var mainImageFileName = Guid.NewGuid().ToString() + "_" + projectDto.Image.FileName;
                var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);

                using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
                {
                    projectDto.Image.CopyTo(fileStream);
                }

                project.Image = $"/images/{mainImageFileName}";
            }

            project.Title = projectDto.Title;
            project.Description = projectDto.Description;
            project.Percentage = projectDto.Percentage;
            project.Status = projectDto.Status;

            project.Img1 = projectDto.Img1 != null ? SaveOptionalImage(projectDto.Img1, uploadsFolder) : project.Img1;
            project.Img2 = projectDto.Img2 != null ? SaveOptionalImage(projectDto.Img2, uploadsFolder) : project.Img2;
            project.Img3 = projectDto.Img3 != null ? SaveOptionalImage(projectDto.Img3, uploadsFolder) : project.Img3;
            project.Img4 = projectDto.Img4 != null ? SaveOptionalImage(projectDto.Img4, uploadsFolder) : project.Img4;
            project.Img5 = projectDto.Img5 != null ? SaveOptionalImage(projectDto.Img5, uploadsFolder) : project.Img5;
            project.Img6 = projectDto.Img6 != null ? SaveOptionalImage(projectDto.Img6, uploadsFolder) : project.Img6;
            project.Img7 = projectDto.Img7 != null ? SaveOptionalImage(projectDto.Img7, uploadsFolder) : project.Img7;
            project.Img8 = projectDto.Img8 != null ? SaveOptionalImage(projectDto.Img8, uploadsFolder) : project.Img8;

            _db.Projects.Update(project);
            _db.SaveChanges();

            return Ok(project);
        }

    }
}