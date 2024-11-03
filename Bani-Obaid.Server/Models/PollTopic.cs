using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class PollTopic
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Status { get; set; }

    public string? Image { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? CloseAt { get; set; }
}
