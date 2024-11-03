using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Event
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Location { get; set; }

    public TimeOnly? Time { get; set; }

    public DateOnly? EventDate { get; set; }

    public string? Image { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<EventParticipant> EventParticipants { get; set; } = new List<EventParticipant>();
}
