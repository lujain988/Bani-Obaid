namespace Bani_Obaid.Server.Dto
{
    public class InvestmentDto
    {

   

        public string? Name { get; set; }

        public IFormFile? Image { get; set; }

        public string? Description { get; set; }

        public DateTime? FinalDate { get; set; }
    }
}
