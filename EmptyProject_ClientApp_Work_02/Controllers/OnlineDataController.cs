using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmptyProject_ClientApp_Work_02.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmptyProject_ClientApp_Work_02.Controllers
{
    [Produces("application/json")]
    public class OnlineDataController : Controller
    {
        JobDbContext db;
        public OnlineDataController(JobDbContext db) { this.db = db; }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult OnlineWithAdvertisement()
        {
            var data = db.OnlineJobSites.Include(x => x.JobAdvertisements).ToList();

            return Json(data);

        }
        [HttpGet]
        public IActionResult OnlinesWithAdvertisementById(int id)
        {
            var data = db.OnlineJobSites.Include(x => x.JobAdvertisements).First(x => x.OnlineJobSiteId == id);

            return Json(data);

        }
        [HttpPost]
        public IActionResult InsertOnlinesWithAdvertisement([FromBody]OnlineJobSite t)
        {
            db.OnlineJobSites.Add(t);
            db.SaveChanges();

            return Json(t);

        }
        [HttpPut]
        public IActionResult UpdateOnlinesWithAdvertisement(int id, [FromBody]OnlineJobSite t)
        {
            var original = db.OnlineJobSites.Include(x => x.JobAdvertisements).First(x => x.OnlineJobSiteId == id);
            original.OnlineJobSiteName = t.OnlineJobSiteName;
            original.StartedJourney = t.StartedJourney;
            
            if (t.JobAdvertisements != null && t.JobAdvertisements.Count > 0)
            {
                var crs = t.JobAdvertisements.ToArray();
                for (var i = 0; i < crs.Length; i++)
                {
                    var temp = original.JobAdvertisements.FirstOrDefault(c => c.JobAdvertisementId == crs[i].JobAdvertisementId);
                    if (temp != null)
                    {
                        temp.JobAdvertisementName = crs[i].JobAdvertisementName;
                        temp.TypeName = crs[i].TypeName;
                    }
                    else
                    {
                        original.JobAdvertisements.Add(crs[i]);
                    }
                }
                crs = original.JobAdvertisements.ToArray();
                for (var i = 0; i < crs.Length; i++)
                {
                    var temp = t.JobAdvertisements.FirstOrDefault(x => x.JobAdvertisementId == crs[i].JobAdvertisementId);
                    if (temp == null)
                        db.Entry(crs[i]).State = EntityState.Deleted;
                }
            }

            db.SaveChanges();

            return Json(t);

        }
        [HttpDelete]
        public IActionResult DeleteOnlineJobSite(int id)
        {
            var original = db.OnlineJobSites.First(x => x.OnlineJobSiteId == id);
            db.Remove(original);
            db.SaveChanges();
            return Json(original);
        }
    }
}