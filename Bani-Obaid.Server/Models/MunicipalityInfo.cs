using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class MunicipalityInfo
{
    public int Id { get; set; }

    public string? Logo { get; set; }

    public string Description { get; set; } = null!;

    public string DescriptionImage { get; set; } = null!;

    public string Vision { get; set; } = null!;

    public string Mission { get; set; } = null!;

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Facebook { get; set; }

    public string? Youtube { get; set; }

    public string? Twitter { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
