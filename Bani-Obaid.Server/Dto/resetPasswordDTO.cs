namespace Bani_Obaid.Server.Dto
{
    public class resetPasswordDTO
    {
        public string Email { get; set; } = null!;
        public string OldPassword { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}

