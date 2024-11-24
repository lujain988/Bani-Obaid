using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PollsController : ControllerBase
    {
        private readonly MyDbContext _db;
        public PollsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetAllPulls()
        {
            var polls = _db.PollTopics.ToList();
            return Ok(polls);
        }

        [HttpGet("GetPullById/{id}")]
        public IActionResult GetPullById(int id)
        {
            var poll = _db.PollTopics.Find(id);
            if (poll == null)
            {
                return BadRequest();
            }
            return Ok(poll);
        }

        [HttpGet("GetPollPercentage/{id}")]
        public IActionResult GetPollPercentage(int id)
        {
            var votes = _db.PollVotes.Where(p => p.PollTopicId == id).ToList();
            if (votes == null || votes.Count == 0)
            {
                return Ok(0);
            }
            decimal total = votes.Sum(v => v.VoteRate ?? 0);
            decimal averageVoteRate = total / votes.Count;
            decimal percentage = averageVoteRate * 25;
            return Ok(Math.Round(percentage, 1));
        }


        [HttpPost("PostVote/{id}")]
        public IActionResult PostVote(int id, [FromForm] PostVoteDTO vote)
        {
            var voted = _db.PollVotes.FirstOrDefault(v => v.PollTopicId == id && v.NationalId == vote.NationalId);
            if (voted != null) { 
                voted.VoteRate = vote.VoteRate;
                voted.Message = vote.Message;
                _db.PollVotes.Update(voted);
                _db.SaveChanges();
                return Ok(11);
            }
            var pollVote = new PollVote
            {
                PollTopicId = id,
                NationalId = vote.NationalId,
                Message = vote.Message,
                VoteRate = vote.VoteRate,
            };
            _db.PollVotes.Add(pollVote);
            _db.SaveChanges();
            return Ok(1);
        }
    }
}
