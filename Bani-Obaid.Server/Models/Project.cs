﻿using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Project
{
    public int Id { get; set; }

    public string? Image { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Percentage { get; set; }

    public string? Status { get; set; }

    public string? Img1 { get; set; }

    public string? Img2 { get; set; }

    public string? Img3 { get; set; }

    public string? Img4 { get; set; }

    public string? Img5 { get; set; }

    public string? Img6 { get; set; }

    public string? Img7 { get; set; }

    public string? Img8 { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
