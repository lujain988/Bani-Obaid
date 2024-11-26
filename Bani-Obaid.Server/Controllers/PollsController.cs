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

        [HttpPut("EditPollById/{id}")]
        public IActionResult EditPollById(int id, [FromForm] PollDTO data)
        {
            var poll = _db.PollTopics.Find(id);
            if (poll == null) { return BadRequest(); };

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            if (data.Image != null && data.Image.Length > 0)
            {
                var mainImageFileName = Guid.NewGuid().ToString() + "_" + data.Image.FileName;
                var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);

                using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
                {
                    data.Image.CopyTo(fileStream);
                }

                poll.Image = $"/images/{mainImageFileName}";
            }
            poll.Title = data.Title;
            poll.Description = data.Description;
            poll.CreatedAt = data.CreatedAt;
            poll.CloseAt = data.CloseAt;
            _db.PollTopics.Update(poll);
            _db.SaveChanges();
            return Ok(poll);
        }

        [HttpPost("PostPoll")]
        public IActionResult PostPoll([FromForm] PollDTO data)
        {
            if (data.Image == null || data.Image.Length == 0)
            {
                return BadRequest("The main investment image is required.");
            }


            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var mainImageFileName = Guid.NewGuid().ToString() + "_" + data.Image.FileName;
            var mainImagePath = Path.Combine(uploadsFolder, mainImageFileName);
            using (var fileStream = new FileStream(mainImagePath, FileMode.Create))
            {
                data.Image.CopyTo(fileStream);
            }
            var poll = new PollTopic()
            {
            Title = data.Title,
            Description = data.Description,
            Image = $"/images/{mainImageFileName}",
            CreatedAt = data.CreatedAt,
            CloseAt = data.CloseAt,
            };
            _db.PollTopics.Add(poll);
            _db.SaveChanges();
            return Ok(poll);
        }

        [HttpDelete("DeletePollById/{id}")]
        public IActionResult DeletePollById(int id)
        {
            var poll = _db.PollTopics.Find(id);
            if (poll == null) { return BadRequest(); };
            _db.PollTopics.Remove(poll);
            _db.SaveChanges();
            return Ok();
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
