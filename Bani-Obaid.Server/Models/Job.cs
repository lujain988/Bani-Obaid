using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Job
{
    public int Id { get; set; }

    public string? Image { get; set; }

    public string? Img1 { get; set; }

    public string? Img2 { get; set; }

    public string? Img3 { get; set; }

    public string? Title { get; set; }

    public string? Type { get; set; }

    public string? Link { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
