using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Medium
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public string FilePath { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
