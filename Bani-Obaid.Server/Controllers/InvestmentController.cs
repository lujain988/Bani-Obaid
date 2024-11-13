using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvestmentController : ControllerBase
    {
        private readonly MyDbContext _db;
        public InvestmentController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllInvestment")]
        public ActionResult GetAll()
        {

            var investment = _db.Investments.ToList();
            if (investment != null)
            {

                return Ok(investment);
            }
            return NotFound("there is no investment for  now ");
        }


        [HttpGet("GetInvestmentById/{id}")]
        public ActionResult Getinvestment(int id)
        {
            if (id <= 0)
            {

                return BadRequest("please enter a valid id");

            }
            var investment = _db.Investments.FirstOrDefault(x => x.Id == id);
            if (investment != null)
            {

                return Ok(investment);
            }

            return NotFound("There is no investment with this id");


        }

        [HttpDelete("DeleteInvestment/{id}")]
        public IActionResult DeleteInvestment(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Please Enter A  valid Id");

            }

            var investment = _db.Investments.FirstOrDefault(y => y.Id == id);
            if (investment != null)
            {
                _db.Remove(investment);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("there is no investment with this id");
        }


        [HttpPost("addInvestment")]
        public IActionResult AddInvestment([FromForm] InvestmentDto investmentDto)
        {
            if (investmentDto.Image == null || investmentDto.Image.Length == 0)
            {
                return BadRequest("The main investment image is required.");
            }


            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var mainImageFileName = Guid.NewGuid().ToString() + "_" + investmentDto.Image.FileName;
            var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);
            using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
            {
                investmentDto.Image.CopyTo(fileStream);
            }

            var newInvestment = new Investment
            {
                Name = investmentDto.Name,
                Description = investmentDto.Description,
                Image = $"/images/{mainImageFileName}",
                FinalDate = investmentDto.FinalDate,
               
               
            };


           
            _db.Investments.Add(newInvestment);
            _db.SaveChanges();

            return Ok(newInvestment);
        }
        [HttpPut("updateInvestment/{id}")]
        public IActionResult UpdateInvestment(int id, [FromForm] InvestmentDto investmentDto)
        {
            var investment = _db.Investments.FirstOrDefault(p => p.Id == id);

            if (investment == null)
            {
                return NotFound("Investment not found.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            if (investmentDto.Image != null && investmentDto.Image.Length > 0)
            {
                var mainImageFileName = Guid.NewGuid().ToString() + "_" + investmentDto.Image.FileName;
                var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);

                using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
                {
                    investmentDto.Image.CopyTo(fileStream);
                }

                investment.Image = $"/images/{mainImageFileName}";
            }

            investment.Name = investmentDto.Name;
            investment.Description = investmentDto.Description;
            investment.FinalDate = investmentDto.FinalDate;
           

            _db.Investments.Update(investment);
            _db.SaveChanges();

            return Ok(investment);
        }

    }
}
