using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class FailedJob
{
    public int Id { get; set; }

    public Guid Uuid { get; set; }

    public string Connection { get; set; } = null!;

    public string Queue { get; set; } = null!;

    public string Payload { get; set; } = null!;

    public string Exception { get; set; } = null!;

    public DateTime? FailedAt { get; set; }
}
