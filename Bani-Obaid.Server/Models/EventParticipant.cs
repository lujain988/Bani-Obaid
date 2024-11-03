using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class EventParticipant
{
    public int Id { get; set; }

    public int? EventId { get; set; }

    public string? Name { get; set; }

    public string? Number { get; set; }

    public string? Email { get; set; }

    public string? ParticipationStatus { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Event? Event { get; set; }
}
