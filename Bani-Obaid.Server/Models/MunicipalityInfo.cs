using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class MunicipalityInfo
{
    public int Id { get; set; }

    public string? Logo { get; set; }

    public string? Description { get; set; }

    public string? DescriptionImage { get; set; }

    public string? Vision { get; set; }

    public string? Mission { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Facebook { get; set; }

    public string? Youtube { get; set; }

    public string? Twitter { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
