using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class TendersDetaile
{
    public int Id { get; set; }

    public int TenderId { get; set; }

    public string Detail { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Tender Tender { get; set; } = null!;
}
