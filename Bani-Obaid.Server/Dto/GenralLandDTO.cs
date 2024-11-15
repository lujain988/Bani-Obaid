using Bani_Obaid.Server.Models;

namespace Bani_Obaid.Server.Dto
{
    public class GenralLandDTO
    {
        public string? Name { get; set; }

        public string? Location { get; set; }

        public string? Description { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        // Main image for the GeneralLand
        public IFormFile? Image { get; set; }

        // List of album images only
        public List<IFormFile>? AdditionalImages { get; set; }
    }
}
