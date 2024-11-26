using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class MunicipalityInfo
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public string? DescriptionImage { get; set; }

    public string? Vision { get; set; }

    public string? Mission { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
