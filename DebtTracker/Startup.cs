using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DebtTracker.Startup))]
namespace DebtTracker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
