using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Tender
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Image { get; set; }

    public string? Img1 { get; set; }

    public string? Img2 { get; set; }

    public string? Img3 { get; set; }

    public string? Img4 { get; set; }

    public string? Img5 { get; set; }

    public string? Amount { get; set; }

    public DateTime? ClosingDate { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
