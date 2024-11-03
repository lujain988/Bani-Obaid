using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Service
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Urls { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
