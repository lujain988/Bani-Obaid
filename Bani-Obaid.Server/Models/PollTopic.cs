﻿using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class PollTopic
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Status { get; set; }

    public string? Image { get; set; }

    public DateOnly? CreatedAt { get; set; }

    public DateOnly? CloseAt { get; set; }

    public virtual ICollection<PollVote> PollVotes { get; set; } = new List<PollVote>();
}
