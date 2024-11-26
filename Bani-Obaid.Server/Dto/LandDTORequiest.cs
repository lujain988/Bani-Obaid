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

        //public List<IFormFile>? AdditionalImages { get; set; }
    }
}
