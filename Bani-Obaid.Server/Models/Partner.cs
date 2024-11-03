using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Partner
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Logo { get; set; }

    public string? Link { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
