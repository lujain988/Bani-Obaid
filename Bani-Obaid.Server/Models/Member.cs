using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Member
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Role { get; set; }

    public string? Image { get; set; }

    public string? Bio { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
