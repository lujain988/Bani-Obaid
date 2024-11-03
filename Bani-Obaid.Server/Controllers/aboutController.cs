using Microsoft.AspNetCore.Mvc;

namespace Bani_Obaid.Server.Controllers
{
    public class aboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
