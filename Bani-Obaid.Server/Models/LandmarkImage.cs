using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class LandmarkImage
{
    public int Id { get; set; }

    public int LandmarkId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Landmark Landmark { get; set; } = null!;
}
