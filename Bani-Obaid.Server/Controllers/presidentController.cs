using Bani_Obaid.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class presidentController : ControllerBase
    {
        private readonly MyDbContext _db;
        public presidentController(MyDbContext db)
        {
            _db = db;
        }
        // There is no data for the President
    }
}
