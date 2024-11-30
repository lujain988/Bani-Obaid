namespace Bani_Obaid.Server.Dto
{
    public class ContactInfoRequest
    {
        public IFormFile? Logo { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Facebook { get; set; }

        public string? Youtube { get; set; }

        public string? Twitter { get; set; }
    }
}
