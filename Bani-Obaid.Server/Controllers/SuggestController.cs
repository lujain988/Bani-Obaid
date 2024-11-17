using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestController : ControllerBase
    {
        private readonly MyDbContext _db;

        public SuggestController(MyDbContext db)
        {
            _db = db;

        }

        [HttpGet("GetAllSuggestion")]
        public IActionResult GetSuggestion()
        {

            var suggest = _db.Suggestions.ToList();
            if (suggest != null)
            {
                return Ok(suggest);

            }
            return NotFound("There is no suggestion");
        }


        [HttpGet("GetSuggestionbyId/{id}")]
        public IActionResult GetSuggestionById(int id)
        {

            if (id <= 0)
            {

                return BadRequest("Please Enter a Valid Id");
            }
            var suggest = _db.Suggestions.FirstOrDefault(s => s.Id == id);
            if (suggest != null)
            {
                return Ok(suggest);
            }
            return NotFound("there is not Suggestion with this id ");
        }

        [HttpPost("AddNewSuggestion")]
        public IActionResult AddSuggestion([FromForm] SuggestionDto suggest)
        {
            if (suggest == null)
            {
                return BadRequest(new { success = false });
            }

            var suggestion = new Suggestion
            {
                Name = suggest.Name,
                Number = suggest.Number,
                Email = suggest.Email,
                Sector = suggest.Sector,
                Place = suggest.Place,
                Details = suggest.Details
            };

            _db.Suggestions.Add(suggestion);
            _db.SaveChanges();

            return Ok(new { success = true});
        }
    }
    }
