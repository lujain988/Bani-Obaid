using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class BaniObaidClubsPresident
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Image { get; set; } = null!;

    public string Speech { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
