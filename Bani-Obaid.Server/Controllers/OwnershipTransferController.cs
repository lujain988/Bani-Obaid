using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnershipTransferController : ControllerBase
    {
        private readonly MyDbContext _db;
        public OwnershipTransferController(MyDbContext db)
        {
            _db = db;
        }
        // GET: api/OwnershipTransfer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OwnershipTransfer>>> GetAllOwnershipTransfers()
        {
            return await _db.OwnershipTransfers.ToListAsync();
        }

        // GET: api/OwnershipTransfer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OwnershipTransfer>> GetOwnershipTransfer(int id)
        {
            var ownershipTransfer = await _db.OwnershipTransfers.FindAsync(id);

            if (ownershipTransfer == null)
            {
                return NotFound();
            }

            return ownershipTransfer;
        }
        [HttpPost]
        [Route("api/OwnershipTransfers")]
        public async Task<IActionResult> CreateOwnershipTransfer([FromBody] OwnershipTransferDto dto)
        {
            var transfer = new OwnershipTransfer
            {
                LandlordPhone = dto.LandlordPhone,
                NewOwnerName = dto.NewOwnerName,
                NewOwnerPhone = dto.NewOwnerPhone,
                NationalId = dto.NationalId,
                PropertyNumber = dto.PropertyNumber,
                MunicipalityName = dto.MunicipalityName,
                Basin = dto.Basin,
                District = dto.District,
                LandNumber = dto.LandNumber,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _db.OwnershipTransfers.Add(transfer);
            await _db.SaveChangesAsync();

            return Ok(transfer);
        }


        // PUT: api/OwnershipTransfer/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOwnershipTransfer(int id, OwnershipTransfer ownershipTransfer)
        {
            if (id != ownershipTransfer.Id)
            {
                return BadRequest();
            }

            var existingTransfer = await _db.OwnershipTransfers.FindAsync(id);
            if (existingTransfer == null)
            {
                return NotFound();
            }

            // Update fields as necessary
            existingTransfer.LandlordPhone = ownershipTransfer.LandlordPhone;
            existingTransfer.NewOwnerName = ownershipTransfer.NewOwnerName;
            existingTransfer.NewOwnerPhone = ownershipTransfer.NewOwnerPhone;
            existingTransfer.NationalId = ownershipTransfer.NationalId;
            existingTransfer.PropertyNumber = ownershipTransfer.PropertyNumber;
            existingTransfer.MunicipalityName = ownershipTransfer.MunicipalityName;
            existingTransfer.Basin = ownershipTransfer.Basin;
            existingTransfer.District = ownershipTransfer.District;
            existingTransfer.LandNumber = ownershipTransfer.LandNumber;
            existingTransfer.UpdatedAt = DateTime.Now;

            _db.Entry(existingTransfer).State = EntityState.Modified;

            await _db.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/OwnershipTransfer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOwnershipTransfer(int id)
        {
            var ownershipTransfer = await _db.OwnershipTransfers.FindAsync(id);
            if (ownershipTransfer == null)
            {
                return NotFound();
            }

            _db.OwnershipTransfers.Remove(ownershipTransfer);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}

