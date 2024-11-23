namespace Bani_Obaid.Server.Dto
{
    public class ComplainDTo
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string NationalId { get; set; }
        public string ComplainType { get; set; }
        public string ComplainDetails { get; set; }
        public string Address { get; set; }
        public IFormFile? Image { get; set; } 
    }
}
