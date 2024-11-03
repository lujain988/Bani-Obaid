using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Suggestion
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Number { get; set; }

    public string? Email { get; set; }

    public string? Sector { get; set; }

    public string? Place { get; set; }

    public string? Details { get; set; }
}
