namespace Bani_Obaid.Server.Dto
{
    public class PollDTO
    {
        public string? Title { get; set; }

        public string? Description { get; set; }

        public IFormFile? Image { get; set; }

        public DateOnly? CreatedAt { get; set; }

        public DateOnly? CloseAt { get; set; }
    }
}
