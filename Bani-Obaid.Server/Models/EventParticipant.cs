using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class EventParticipant
{
    public int Id { get; set; }

    public int EventId { get; set; }

    public int UserId { get; set; }

    public string ParticipationStatus { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
