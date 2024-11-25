namespace Bani_Obaid.Server.Dto
{
    public class PresidentRequest
    {
        public string? Name { get; set; }

        public IFormFile? Image { get; set; }

        public string? Speech { get; set; }
    }
}
