﻿using System;
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

    public virtual ICollection<LandmarkImage> LandmarkImages { get; set; } = new List<LandmarkImage>();
}
