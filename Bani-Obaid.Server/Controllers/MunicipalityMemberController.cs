using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipalityMemberController : ControllerBase
    {
        private readonly MyDbContext _db;
        public MunicipalityMemberController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllMembers")]
        public IActionResult GetMember()
        {
            var member = _db.Members.ToList();
            return Ok(member);
        }

        [HttpPost("addMember")]
        public IActionResult AddMember([FromForm] MunicipalityMember memberrequest)
        {
            if (memberrequest.Image == null || memberrequest.Image.Length == 0)
            {
                return BadRequest("The main investment image is required.");
            }


            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var mainImageFileName = Guid.NewGuid().ToString() + "_" + memberrequest.Image.FileName;
            var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);
            using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
            {
                memberrequest.Image.CopyTo(fileStream);
            }

            var newmember = new Member
            {
                Name = memberrequest.Name,
                Role = memberrequest.Role,
                Image = $"/images/{mainImageFileName}",
            };



            _db.Members.Add(newmember);
            _db.SaveChanges();

            return Ok(newmember);
        }

        [HttpPut("updatemember/{id}")]
        public IActionResult UpdateMeber(int id, [FromForm] MunicipalityMember memberrequset)
        {
            var member = _db.Members.FirstOrDefault(m => m.Id == id);

            if (member == null)
            {
                return NotFound("Member not found.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }


            if (memberrequset.Image != null && memberrequset.Image.Length > 0)
            {
                var mainImageFileName = Guid.NewGuid().ToString() + "_" + memberrequset.Image.FileName;
                var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);

                using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
                {
                    memberrequset.Image.CopyTo(fileStream);
                }

                member.Image = $"/images/{mainImageFileName}";
            }

            member.Name = memberrequset.Name;
            member.Role = memberrequset.Role;
            


            _db.Members.Update(member);
            _db.SaveChanges();
            return Ok(member);
        }

        [HttpDelete("DeleteMember/{id}")]
        public IActionResult DeleteMember(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Please Enter A  valid Id");

            }

            var DeleteMember = _db.Members.FirstOrDefault(m => m.Id == id);
            if (DeleteMember != null)
            {
                _db.Remove(DeleteMember);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("there is no Member with this id");
        }

    }
}
