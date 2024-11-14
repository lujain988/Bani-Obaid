using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class PollVote
{
    public int Id { get; set; }

    public int? PollTopicId { get; set; }

    public int? NationalId { get; set; }

    public string? Message { get; set; }

    public int? VoteRate { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual PollTopic? PollTopic { get; set; }
}
