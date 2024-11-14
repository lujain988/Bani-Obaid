namespace Bani_Obaid.Server.Dto
{
    public class AboutMunicipality
    {
        public string Description { get; set; } = null!;

        public IFormFile? DescriptionImage { get; set; } = null!;

        public string Vision { get; set; } = null!;

        public string Mission { get; set; } = null!;
    }
}
