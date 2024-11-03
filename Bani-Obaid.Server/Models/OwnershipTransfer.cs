using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class OwnershipTransfer
{
    public int Id { get; set; }

    public string? LandlordPhone { get; set; }

    public string? NewOwnerName { get; set; }

    public string? NewOwnerPhone { get; set; }

    public string? NationalId { get; set; }

    public string? PropertyNumber { get; set; }

    public string? MunicipalityName { get; set; }

    public string? Basin { get; set; }

    public string? District { get; set; }

    public string? LandNumber { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
