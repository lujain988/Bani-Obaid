namespace Bani_Obaid.Server.Dto
{
    public class HomePageImageRequest
    {
        public string? HomeTitle { get; set; }

        public string? HomeDescription { get; set; }

        public IFormFile? HomeImage { get; set; } 
    }
}
