using Bani_Obaid.Server.Dto;
using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TendersController : ControllerBase
    {

        private readonly MyDbContext _db;
        public TendersController(MyDbContext db)
        {
            _db = db;

        }

        [HttpGet("GetAllTenders")]
        public IActionResult GetAllTenders()
        {
            var tenders = _db.Tenders.ToList();
            if (tenders != null)
            {

                return Ok(tenders);
            }
            return NotFound("there is no tenders");

        }

        [HttpGet("GetTendersbyId/{id}")]
        public IActionResult GetTenders(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Please enter a valid Id");

            }
            var tender = _db.Tenders.FirstOrDefault(t => t.Id == id);
            if (tender == null)
            {
                return NotFound("No tendrs with this id ");
            }
            return Ok(tender);
        }

        [HttpDelete("DeleteTender/{id}")]

        public IActionResult DeleteTenders(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Please enter a valid Id");
            }

            var tender = _db.Tenders.FirstOrDefault(t => t.Id == id);
            if (tender == null)
            {
                return NotFound("there is no tender with this id ");

            }

            _db.Tenders.Remove(tender);
            _db.SaveChanges();
            return NoContent();
        }

        [HttpPost("AddNewTender")]
        public IActionResult AddTender([FromForm] TenderDto tender) {

            if (tender.Image == null || tender.Image.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

           
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + tender.Image.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                tender.Image.CopyTo(fileStream);
            }
            var imagePath = $"/images/{uniqueFileName}";

            string? img1Path = null;
            if (tender.Img1 != null && tender.Img1.Length > 0)
            {
                var uniqueFileName1 = Guid.NewGuid().ToString() + "_" + tender.Img1.FileName;
                var filePath1 = Path.Combine(uploadsFolder, uniqueFileName1);
                using (var fileStream = new FileStream(filePath1, FileMode.Create))
                {
                    tender.Img1.CopyTo(fileStream);
                }
                img1Path = $"/images/{uniqueFileName1}";
            }

            string? img2Path = null;
            if (tender.Img2 != null && tender.Img2.Length > 0)
            {
                var uniqueFileName2 = Guid.NewGuid().ToString() + "_" + tender.Img2.FileName;
                var filePath2 = Path.Combine(uploadsFolder, uniqueFileName2);
                using (var fileStream = new FileStream(filePath2, FileMode.Create))
                {
                    tender.Img2.CopyTo(fileStream);
                }
                img2Path = $"/images/{uniqueFileName2}";
            }

            string? img3Path = null;
            if (tender.Img3 != null && tender.Img3.Length > 0)
            {
                var uniqueFileName3 = Guid.NewGuid().ToString() + "_" + tender.Img3.FileName;
                var filePath3 = Path.Combine(uploadsFolder, uniqueFileName3);
                using (var fileStream = new FileStream(filePath3, FileMode.Create))
                {
                    tender.Img3.CopyTo(fileStream);
                }
                img3Path = $"/images/{uniqueFileName3}";
            }

            string? img4Path = null;
            if (tender.Img4 != null && tender.Img4.Length > 0)
            {
                var uniqueFileName4 = Guid.NewGuid().ToString() + "_" + tender.Img4.FileName;
                var filePath4 = Path.Combine(uploadsFolder, uniqueFileName4);
                using (var fileStream = new FileStream(filePath4, FileMode.Create))
                {
                    tender.Img4.CopyTo(fileStream);
                }
                img4Path = $"/images/{uniqueFileName4}";
            }

            string? img5Path = null;
            if (tender.Img5 != null && tender.Img5.Length > 0)
            {
                var uniqueFileName5 = Guid.NewGuid().ToString() + "_" + tender.Img5.FileName;
                var filePath5 = Path.Combine(uploadsFolder, uniqueFileName5);
                using (var fileStream = new FileStream(filePath5, FileMode.Create))
                {
                    tender.Img5.CopyTo(fileStream);
                }
                img5Path = $"/images/{uniqueFileName5}";
            }

           
            var newTender = new Tender
            {
                Title = tender.Title,
                Description = tender.Description,
                Image = imagePath,
                Img1 = img1Path,
                Img2 = img2Path,
                Img3 = img3Path,
                Img4 = img4Path,
                Img5 = img5Path,
                Amount = tender.Amount,
                ClosingDate = tender.ClosingDate,
               
            };

            _db.Tenders.Add(newTender);
            _db.SaveChanges();

            return Ok(newTender);
        }

        [HttpPut("UpdateTenders/{id}")]
        public IActionResult UpdateTender(int id, [FromForm]  TenderDto tender ) {
        
        var newtender=_db.Tenders.Where(t=>t.Id == id).FirstOrDefault();
            if (newtender == null) {
                return NotFound("tenders with this id doesnt exist");

            }


            if (tender.Image != null && tender.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + tender.Image.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    tender.Image.CopyTo(fileStream);
                }

                newtender.Title = tender.Title;
                newtender.Description = tender.Description;
                newtender.Image = $"/images/{uniqueFileName}"; 
                newtender.Amount = tender.Amount;
                newtender.ClosingDate = tender.ClosingDate;

                if (tender.Img1 != null && tender.Img1.Length > 0)
                {
                    var uniqueFileName1 = Guid.NewGuid().ToString() + "_" + tender.Img1.FileName;
                    var filePath1 = Path.Combine(uploadsFolder, uniqueFileName1);
                    using (var fileStream = new FileStream(filePath1, FileMode.Create))
                    {
                        tender.Img1.CopyTo(fileStream);
                    }
                    newtender.Img1 = $"/images/{uniqueFileName1}";
                }

                if (tender.Img2 != null && tender.Img2.Length > 0)
                {
                    var uniqueFileName2 = Guid.NewGuid().ToString() + "_" + tender.Img2.FileName;
                    var filePath2 = Path.Combine(uploadsFolder, uniqueFileName2);
                    using (var fileStream = new FileStream(filePath2, FileMode.Create))
                    {
                        tender.Img2.CopyTo(fileStream);
                    }
                    newtender.Img2 = $"/images/{uniqueFileName2}";
                }

                if (tender.Img3 != null && tender.Img3.Length > 0)
                {
                    var uniqueFileName3 = Guid.NewGuid().ToString() + "_" + tender.Img3.FileName;
                    var filePath3 = Path.Combine(uploadsFolder, uniqueFileName3);
                    using (var fileStream = new FileStream(filePath3, FileMode.Create))
                    {
                        tender.Img3.CopyTo(fileStream);
                    }
                    newtender.Img3 = $"/images/{uniqueFileName3}";
                }

                if (tender.Img4 != null && tender.Img4.Length > 0)
                {
                    var uniqueFileName4 = Guid.NewGuid().ToString() + "_" + tender.Img4.FileName;
                    var filePath4 = Path.Combine(uploadsFolder, uniqueFileName4);
                    using (var fileStream = new FileStream(filePath4, FileMode.Create))
                    {
                        tender.Img4.CopyTo(fileStream);
                    }
                    newtender.Img4 = $"/images/{uniqueFileName4}";
                }

                if (tender.Img5 != null && tender.Img5.Length > 0)
                {
                    var uniqueFileName5 = Guid.NewGuid().ToString() + "_" + tender.Img5.FileName;
                    var filePath5 = Path.Combine(uploadsFolder, uniqueFileName5);
                    using (var fileStream = new FileStream(filePath5, FileMode.Create))
                    {
                        tender.Img5.CopyTo(fileStream);
                    }
                    newtender.Img5 = $"/images/{uniqueFileName5}";
                }

                _db.Tenders.Update(newtender);
                _db.SaveChanges();

                return Ok(newtender);
            }

            return BadRequest("There is an error in updating the tender.");
        }

    }
}
     