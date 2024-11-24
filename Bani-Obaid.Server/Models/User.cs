using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class User
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string Email { get; set; } = null!;

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }

    public DateTime? CreatedAt { get; set; }
}
