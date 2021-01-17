using EmptyProject_ClientApp_Work_02.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace EmptyProject_ClientApp_Work_02
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<JobDbContext>(o => o.UseSqlServer(this.Configuration.GetConnectionString("modelDbString")));
            services.AddCors(options => {
                options.AddPolicy("EnableCORS", builder => {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
                });
            });
            //services.AddMvc()
            //    .AddJsonOptions(options => {
            //        options.SerializerSettings.ContractResolver = new DefaultContractResolver();
            //        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            //    });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env /*JobDbContext db*/)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //if (!db.Database.CanConnect())
            //{
            //    if (db.Database.EnsureCreated())
            //    {
            //        DbSeeder.Seed(db);
            //    }
            //}
            else
            {
                app.UseExceptionHandler("/Error");
            }
            app.UseCors("EnableCORS");
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
