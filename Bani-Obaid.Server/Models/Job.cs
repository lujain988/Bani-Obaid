using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Job
{
    public int Id { get; set; }

    public string Image { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string? Link { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
