namespace Bani_Obaid.Server.Dto
{
    public class JobCreateDto
    {
        public IFormFile? Image { get; set; }
        public IFormFile? Img1 { get; set; }
        public IFormFile? Img2 { get; set; }
        public IFormFile? Img3 { get; set; }
        public string? Title { get; set; }
        public string? Type { get; set; }
        public string? Link { get; set; }
        public string? Status { get; set; }
    }
}
