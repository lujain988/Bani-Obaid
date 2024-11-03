using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class BaniObaidClubsPresident
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public string? Speech { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
