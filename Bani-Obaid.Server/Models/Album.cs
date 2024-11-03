﻿using System;
using System.Collections.Generic;

namespace Bani_Obaid.Server.Models;

public partial class Album
{
    public int Id { get; set; }

    public string PreviewImage { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
