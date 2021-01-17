using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmptyProject_Work_01.Models
{
    //public enum JobType { Manager = 1, MTO, Senior, Junior, Officer, ItProfessional }

    public class OnlineJobSite
    {
        //1
        public OnlineJobSite()
        {
            this.JobAdvertisements = new List<JobAdvertisement>();
            this.RegisterApplicants = new List<RegisterApplicant>();
        }
        [Display(Name = "Job Site ID")]
        public int OnlineJobSiteId { get; set; }

        [Required, StringLength(50), Display(Name = "Name of JobSite")]
        public string OnlineJobSiteName { get; set; }

        [Required, Column(TypeName = "date"),
        Display(Name = "Started Journey"), DataType(DataType.Date),
        DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime StartedJourney { get; set; }

        [DataType(DataType.Url), Display(Name = "Website")]
        public string Web { get; set; }

        [Display(Name = "Response Instantly")]
        public bool Response { get; set; }

        public virtual ICollection<JobAdvertisement> JobAdvertisements { get; set; }
        public virtual ICollection<RegisterApplicant> RegisterApplicants { get; set; }
    }
    //2
    public class JobAdvertisement
    {

        [Display(Name = "Advertisement ID")]
        public int JobAdvertisementId { get; set; }

        [Required, StringLength(50), Display(Name = "Advertisement Name")]
        public string JobAdvertisementName { get; set; }

        //[EnumDataType(typeof(JobType))]
        //[JsonConverter(typeof(StringEnumConverter))]
        //public JobType Post { get; set; }

        [Required, StringLength(50), Display(Name = "Advertisement Type")]
        public string TypeName { get; set; }

        [Required, ForeignKey("OnlineJobSite")]
        public int OnlineJobSiteId { get; set; }
        public virtual OnlineJobSite OnlineJobSite { get; set; }

    }
    //3
    public class RegisterApplicant
    {
        [Display(Name = "Register ID")]
        public int RegisterApplicantId { get; set; }

        [Required, StringLength(50), Display(Name = "Applicant Name")]
        public string RegisterApplicantName { get; set; }

        [Required, Display(Name = "E mail"), DataType(DataType.EmailAddress),
        StringLength(50)]
        public string ContactEmail { get; set; }

        [Required, ForeignKey("OnlineJobSite")]
        public int OnlineJobSiteId { get; set; }
        public virtual OnlineJobSite OnlineJobSite { get; set; }
    }
    public class JobDbContext :DbContext
    {
        public JobDbContext(DbContextOptions<JobDbContext> options) : base(options) { }
        public DbSet<OnlineJobSite> OnlineJobSites { get; set; }
        public DbSet<JobAdvertisement> JobAdvertisements { get; set; }
        public DbSet<RegisterApplicant> RegisterApplicants { get; set; }
    }
    //public class JobDbContext : DbContext
    //{
    //    //public JobDbContext(DbContextOptions<JobDbContext> options) : base(options) { }
    //    public JobDbContext()
    //    {
    //        this.Configuration.LazyLoadingEnabled = false;
    //        this.Configuration.ProxyCreationEnabled = false;
    //    }
    //    public DbSet<OnlineJobSite> OnlineJobSites { get; set; }
    //    public DbSet<JobAdvertisement> JobAdvertisements { get; set; }
    //    public DbSet<RegisterApplicant> RegisterApplicants { get; set; }
    //}
}
