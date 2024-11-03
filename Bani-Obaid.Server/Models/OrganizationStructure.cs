using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class OrganizationStructure
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Image { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
