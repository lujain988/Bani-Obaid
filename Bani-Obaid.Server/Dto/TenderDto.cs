namespace Bani_Obaid.Server.Dto
{
    public class TenderDto
    {
        public string? Title { get; set; }

        public string? Description { get; set; }

        public IFormFile? Image { get; set; }

        public IFormFile? Img1 { get; set; }

        public IFormFile? Img2 { get; set; }

        public IFormFile? Img3 { get; set; }

        public IFormFile? Img4 { get; set; }

        public IFormFile? Img5 { get; set; }

        public string? Amount { get; set; }

        public DateTime? ClosingDate { get; set; }

      
    }
}
