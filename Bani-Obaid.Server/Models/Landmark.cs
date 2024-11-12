using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Landmark
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Location { get; set; }

    public string? Description { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? Image { get; set; }

    public string? Img1 { get; set; }

    public string? Img2 { get; set; }

    public string? Img3 { get; set; }

    public string? Img4 { get; set; }

    public string? Img5 { get; set; }

    public string? Img6 { get; set; }

    public string? Img7 { get; set; }
}
