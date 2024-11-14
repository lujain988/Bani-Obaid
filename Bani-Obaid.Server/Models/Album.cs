using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Bani_Obaid.Server.Models;

public partial class Album
{
    public int Id { get; set; }

    public string? Image { get; set; }

    public string? Title { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? GenralLandId { get; set; }
    [JsonIgnore]
    public virtual GenralLand? GenralLand { get; set; }
}
