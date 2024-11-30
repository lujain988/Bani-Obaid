using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class MunicipalityContactInfo
{
    public int Id { get; set; }

    public string? Logo { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Facebook { get; set; }

    public string? Youtube { get; set; }

    public string? Twitter { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
