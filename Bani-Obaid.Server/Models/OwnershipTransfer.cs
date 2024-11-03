using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class OwnershipTransfer
{
    public int Id { get; set; }

    public string LandlordPhone { get; set; } = null!;

    public string NewOwnerName { get; set; } = null!;

    public string NewOwnerPhone { get; set; } = null!;

    public string NationalId { get; set; } = null!;

    public string PropertyNumber { get; set; } = null!;

    public string MunicipalityName { get; set; } = null!;

    public string Basin { get; set; } = null!;

    public string District { get; set; } = null!;

    public string LandNumber { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
