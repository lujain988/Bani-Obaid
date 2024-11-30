using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public EventsController(MyDbContext db)
        {
            _db = db;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var events = await _db.Events.ToListAsync();
            return Ok(events);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEventDetails(int id)
        {
            var eventDetails = await _db.Events.FindAsync(id);
            if (eventDetails == null)
            {
                return NotFound(new { message = "Event not found" });
            }
            return Ok(eventDetails);
        }


        [HttpPost]
        public async Task<IActionResult> AddEvent([FromForm] EventCreateUpdateDto newEventDto)
        {
            if (newEventDto == null)
            {
                return BadRequest(new { message = "Invalid event data" });
            }

            if (newEventDto.Image == null || newEventDto.Image.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }


            var uniqueFileName = Guid.NewGuid().ToString() + "_" + newEventDto.Image.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                newEventDto.Image.CopyTo(fileStream);
            }
            var imagePath = $"/images/{uniqueFileName}";


            var newEvent = new Event
            {
                Title = newEventDto.Title,
                Description = newEventDto.Description,
                Location = newEventDto.Location,
                Time = newEventDto.Time,
                EventDate = newEventDto.EventDate,
                Image = imagePath,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _db.Events.Add(newEvent);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEventDetails), new { id = newEvent.Id }, newEvent);
        }


        // ** Update Event **
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromForm] EventCreateUpdateDto updatedEventDto)
        {
            var existingEvent = await _db.Events.FindAsync(id);
            if (existingEvent == null)
            {
                return NotFound(new { message = "Event not found" });
            }

            if (updatedEventDto.Image != null && updatedEventDto.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + updatedEventDto.Image.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    updatedEventDto.Image.CopyTo(fileStream);
                }

                existingEvent.Title = updatedEventDto.Title;
                existingEvent.Description = updatedEventDto.Description;
                existingEvent.Location = updatedEventDto.Location;
                existingEvent.Time = updatedEventDto.Time;
                existingEvent.EventDate = updatedEventDto.EventDate;
                existingEvent.Image = $"/images/{uniqueFileName}";
                existingEvent.UpdatedAt = DateTime.Now;
                await _db.SaveChangesAsync();

                return Ok(existingEvent);
            }
            return BadRequest();
        }


        // ** Delete Event **
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventToDelete = await _db.Events.FindAsync(id);
            if (eventToDelete == null)
            {
                return NotFound(new { message = "Event not found" });
            }

            _db.Events.Remove(eventToDelete);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Event deleted successfully" });
        }













        [HttpPost("{id}/register")]
        public async Task<IActionResult> RegisterParticipant(int id, [FromBody] EventParticipantDto participantDto)
        {
            if (participantDto == null)
            {
                return BadRequest(new { message = "Invalid participant data" });
            }

            var participant = new EventParticipant
            {
                EventId = id,
                Name = participantDto.Name,
                Number = participantDto.Phone,
                Email = participantDto.Email
            };

            _db.EventParticipants.Add(participant);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Participant registered successfully" });
        }

        [HttpGet("events/names")]   
        public async Task<IActionResult> GetEventNames()
        {
            var events = await _db.Events
                                       .Select(e => new { e.Id, e.Title })
                                       .ToListAsync();
            return Ok(events);
        }

        [HttpGet("registrations")]
        public async Task<IActionResult> GetAllRegistrations()
        {
            var registrations = await _db.EventParticipants.ToListAsync();
            return Ok(registrations);
        }

        [HttpGet("registrations/{eventId}")]
        public async Task<IActionResult> GetRegistrationsByEvent(int eventId)
        {
            var registrations = await _db.EventParticipants
                                               .Where(r => r.EventId == eventId)
                                               .ToListAsync();
            return Ok(registrations);
        }

        [HttpDelete("registrations/{id}")]
        public async Task<IActionResult> DeleteRegistration(int id)
        {
            var registration = await _db.EventParticipants.FindAsync(id);
            if (registration == null)
                return NotFound();

            _db.EventParticipants.Remove(registration);
            await _db.SaveChangesAsync();
            return NoContent();
        }







    }



    public class EventParticipantDto
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }

}
