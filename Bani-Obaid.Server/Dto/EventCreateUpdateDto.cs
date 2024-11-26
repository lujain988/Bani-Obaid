namespace Bani_Obaid.Server.Dto
{
    public class EventCreateUpdateDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public TimeOnly? Time { get; set; }

        public DateOnly? EventDate { get; set; }
        public string? Image { get; set; }

    }
}
