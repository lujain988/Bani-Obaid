using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Tender
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly ClosingDate { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<TendersDetaile> TendersDetailes { get; set; } = new List<TendersDetaile>();
}
