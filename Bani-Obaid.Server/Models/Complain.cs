using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Complain
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? NationalId { get; set; }

    public string? ComplainType { get; set; }

    public string? ComplainDetails { get; set; }

    public string? Image { get; set; }

    public string? Address { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
