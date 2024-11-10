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

    }
}
