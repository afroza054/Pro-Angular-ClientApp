using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmptyProject_Work_01.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmptyProject_Work_01.Controllers
{
    public class AdvertisementDataController : Controller
    {
        JobDbContext db;
        public AdvertisementDataController(JobDbContext db) { this.db = db; }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult GetOnlineJobSitesForDropDown()
        {
            return Json(db.OnlineJobSites.ToList());
        }
        [HttpGet]
        public IActionResult GetJobAdvertisements()
        {
            return Json(db.JobAdvertisements.ToList());
        }
        [HttpGet]
        public IActionResult GetJobAdvertisementById(int id)
        {
            return Json(db.JobAdvertisements.First(x => x.JobAdvertisementId == id));
        }
        [HttpPost]
        public IActionResult InsertJobAdvertisement([FromBody]JobAdvertisement c)
        {
            db.JobAdvertisements.Add(c);
            db.SaveChanges();
            return Json(c);
        }
        [HttpPut]
        public IActionResult UpdateJobAdvertisement(int id, [FromBody] JobAdvertisement c)
        {
            var original = db.JobAdvertisements.First(x => x.JobAdvertisementId == id);
            original.JobAdvertisementName = c.JobAdvertisementName;
            original.TypeName = c.TypeName;
            original.OnlineJobSiteId = c.OnlineJobSiteId;
            db.SaveChanges();
            return Json(c);
        }
        [HttpDelete]
        public IActionResult DeleteJobAdvertisement(int id)
        {
            var original = db.JobAdvertisements.First(x => x.JobAdvertisementId == id);
            db.Remove(original);
            db.SaveChanges();
            return Json(original);
        }
    }
}