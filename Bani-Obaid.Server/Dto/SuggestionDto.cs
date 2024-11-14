using System.ComponentModel.DataAnnotations;

namespace Bani_Obaid.Server.Dto
{
    public class SuggestionDto
    {

        [Required]
        public string? Name { get; set; }
        [Required]
        [Phone]
        public string? Number { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Sector { get; set; }
        [Required]
        public string? Place { get; set; }
        [Required]
        public string? Details { get; set; }
    }
}
