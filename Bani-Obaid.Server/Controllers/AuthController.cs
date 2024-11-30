using Bani_Obaid.Helpers;
using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Helpers;
using Bani_Obaid.Server.Models;
using hosam.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IConfiguration config, GenerateJwtToken generateJwt, MyDbContext context)
   : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromForm] UserLoginDto admin)
        {

            var dbadmin = context.Users.FirstOrDefault(u => u.Email == admin.Email);
            if (dbadmin == null || !PasswordHasher.VerifyPasswordHash(admin.Password, dbadmin.PasswordHash, dbadmin.PasswordSalt))
            {
                return Unauthorized(new { message = "Bad Credentials" });
            }
            var token = generateJwt.Generate(dbadmin.Id);
            return Ok(new { token = token, id = dbadmin.Id });
        }



        [HttpPost("Register")]
        public IActionResult AddUser([FromForm] AdminRegisterRequestDTO addAdmin)
        {
            var admin = context.Users.FirstOrDefault(a => a.Email == addAdmin.Email);
            if (admin != null)
            {
                return BadRequest("email already used");
            }
            byte[] hash, salt;
            PasswordHasher.CreatePasswordHash(addAdmin.Password, out hash, out salt);
            var newuser = new User()
            {
                Name = "Admin",
                Email = addAdmin.Email,
                PasswordSalt = salt,
                PasswordHash = hash
            };
            context.Users.Add(newuser);
            context.SaveChanges();
            return Ok(newuser);
        }

        [HttpPut]
        public IActionResult ResetPassword([FromForm] resetPasswordDTO newpass)
        {
            var user = context.Users.FirstOrDefault(u => u.Email == newpass.Email);
            if (user == null)
            {
                return BadRequest();
            }

            var isConfirmed = PasswordHasher.VerifyPasswordHash(newpass.OldPassword, user.PasswordHash, user.PasswordSalt);
            if (!isConfirmed)
            {
                return BadRequest("passwords don't match");
            }
            byte[] hash, salt;
            PasswordHasher.CreatePasswordHash(newpass.Password, out hash, out salt);
            user.PasswordSalt = salt;
            user.PasswordHash = hash;
            context.Users.Update(user);
            context.SaveChanges();
            return Ok(user);
        }
    }
}

