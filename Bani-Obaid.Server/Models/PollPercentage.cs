using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class PollPercentage
{
    public int Id { get; set; }

    public int? NationalId { get; set; }

    public string? UserAgreement { get; set; }

    public int? EvaluationRating { get; set; }

    public DateTime? FeedbackDate { get; set; }
}
