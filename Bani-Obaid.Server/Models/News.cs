using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class News
{
    public int Id { get; set; }

    public string PreviewImage { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly Date { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
