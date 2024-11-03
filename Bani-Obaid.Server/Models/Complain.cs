using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Complain
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string NationalId { get; set; } = null!;

    public string ComplainType { get; set; } = null!;

    public string ComplainDetails { get; set; } = null!;

    public string? Image { get; set; }

    public string? Address { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
