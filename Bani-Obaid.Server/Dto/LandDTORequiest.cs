namespace Bani_Obaid.Server.Dto
{
    public class LandDTORequiest
    {
        public string? Name { get; set; }

        public string? Location { get; set; }

        public string? Description { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public IFormFile? Image { get; set; }

        public IFormFile? Img1 { get; set; }

        public IFormFile? Img2 { get; set; }

        public IFormFile? Img3 { get; set; }

        public IFormFile? Img4 { get; set; }

        public IFormFile? Img5 { get; set; }

        public IFormFile? Img6 { get; set; }

        public IFormFile? Img7 { get; set; }
    }
}
