using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmptyProject_Work_01.Models;
using System.Net.Http;
using System.Web.Http;
//using System.Web.Http.Description;


namespace EmptyProject_Work_01.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnlineJobSitesController : ControllerBase
    {
        private readonly JobDbContext db;
        

        public OnlineJobSitesController(JobDbContext context)
        {
            db = context;
        }

        // GET: api/OnlineJobSites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OnlineJobSite>>> GetOnlineJobSites()
        {
            return await db.OnlineJobSites.ToListAsync();
        }

        // GET: api/OnlineJobSites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OnlineJobSite>> GetOnlineJobSite(int id)
        {
            var onlineJobSite = await db.OnlineJobSites.FindAsync(id);

            if (onlineJobSite == null)
            {
                return NotFound();
            }

            return onlineJobSite;
        }

        

        // PUT: api/OnlineJobSites/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOnlineJobSite(int id, OnlineJobSite onlineJobSite)
        {
            if (id != onlineJobSite.OnlineJobSiteId)
            {
                return BadRequest();
            }

            //_context.Entry(onlineJobSite).State = EntityState.Modified;
            var ext = db.OnlineJobSites.Include(x => x.JobAdvertisements).Include(y => y.RegisterApplicants).First(x => x.OnlineJobSiteId == onlineJobSite.OnlineJobSiteId);
            ext.OnlineJobSiteName = onlineJobSite.OnlineJobSiteName;
            ext.StartedJourney = onlineJobSite.StartedJourney;
            ext.Web = onlineJobSite.Web;
            ext.Response = onlineJobSite.Response;

            if (onlineJobSite.JobAdvertisements != null && onlineJobSite.JobAdvertisements.Count > 0)
            {
                var prs = onlineJobSite.JobAdvertisements.ToArray();
                for (var i = 0; i < prs.Length; i++)
                {
                    var temp = ext.JobAdvertisements.FirstOrDefault(c => c.JobAdvertisementId == prs[i].JobAdvertisementId);
                    if (temp != null)
                    {
                        temp.JobAdvertisementName = prs[i].JobAdvertisementName;
                        temp.TypeName = prs[i].TypeName;
                    }
                    else
                    {
                        ext.JobAdvertisements.Add(prs[i]);
                    }
                }
                prs = ext.JobAdvertisements.ToArray();
                for (var i = 0; i < prs.Length; i++)
                {
                    var temp = onlineJobSite.JobAdvertisements.FirstOrDefault(x => x.JobAdvertisementId == prs[i].JobAdvertisementId);
                    if (temp == null)
                        db.Entry(prs[i]).State = EntityState.Deleted;
                }
            }
            if (onlineJobSite.RegisterApplicants != null && onlineJobSite.RegisterApplicants.Count > 0)
            {
                var srvs = onlineJobSite.RegisterApplicants.ToArray();
                for (var i = 0; i < srvs.Length; i++)
                {
                    var temp = ext.RegisterApplicants.FirstOrDefault(c => c.RegisterApplicantId == srvs[i].RegisterApplicantId);
                    if (temp != null)
                    {
                        temp.RegisterApplicantName = srvs[i].RegisterApplicantName;
                        temp.ContactEmail = srvs[i].ContactEmail;
                    }
                    else
                    {
                        ext.RegisterApplicants.Add(srvs[i]);
                    }
                }
                srvs = ext.RegisterApplicants.ToArray();
                for (var i = 0; i < srvs.Length; i++)
                {
                    var temp = onlineJobSite.RegisterApplicants.FirstOrDefault(x => x.RegisterApplicantId == srvs[i].RegisterApplicantId);
                    if (temp == null)
                        db.Entry(srvs[i]).State = EntityState.Deleted;
                }
            }

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OnlineJobSiteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OnlineJobSites
        [HttpPost]
        public async Task<ActionResult<OnlineJobSite>> PostOnlineJobSite(OnlineJobSite onlineJobSite)
        {
            db.OnlineJobSites.Add(onlineJobSite);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetOnlineJobSite", new { id = onlineJobSite.OnlineJobSiteId }, onlineJobSite);
        }

        // POST: api/OnlineJobSites
        //[ResponseType(typeof(OnlineJobSite))]
        //public IActionResult PostOnlineJobSite(OnlineJobSite onlineJobSite)
        //{
        //    //if (!ModelState.IsValid)
        //    //{
        //    //    return BadRequest(ModelState);
        //    //}

        //    db.OnlineJobSites.Add(onlineJobSite);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = onlineJobSite.OnlineJobSiteId }, onlineJobSite);
        //}


        // DELETE: api/OnlineJobSites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OnlineJobSite>> DeleteOnlineJobSite(int id)
        {
            var onlineJobSite = await db.OnlineJobSites.FindAsync(id);
            if (onlineJobSite == null)
            {
                return NotFound();
            }

            db.OnlineJobSites.Remove(onlineJobSite);
            await db.SaveChangesAsync();

            return onlineJobSite;
        }
        //[Route("custom/OnlineJobSites")]
        //public IQueryable<OnlineJobSite> GetOnlineJobSitesWithRelated()
        //{
        //    return db.OnlineJobSites
        //        .Include("JobAdvertisements")
        //        .Include("RegisterApplicants");
        //}
        //[Route("custom/OnlineJobSites/{id}")]
        //public ActionResult GetOnlineJobSiteWithRelated(int id)
        //{
        //    return Ok(db.OnlineJobSites
        //            .Include(x => x.JobAdvertisements)
        //            .Include(x => x.RegisterApplicants)
        //            .FirstOrDefault(x => x.OnlineJobSiteId == id));
        //}
        [Route("custom/OnlineJobSites")]
        public async Task<ActionResult<IEnumerable<OnlineJobSite>>> GetOnlineJobSitesWithRelated()
        {
            return await db.OnlineJobSites.Include("JobAdvertisements")
                .Include("RegisterApplicants").ToListAsync();
        }

        [Route("custom/OnlineJobSites/{id}")]
        public async Task<ActionResult<OnlineJobSite>> GetOnlineJobSiteWithRelated(int id)
        {
            var onlineJobSite = await db.OnlineJobSites.FindAsync(id);

            //if (onlineJobSite == null)
            //{
            //    return NotFound();
            //}

            return Ok(db.OnlineJobSites
                    .Include(x => x.JobAdvertisements)
                    .Include(x => x.RegisterApplicants)
                    .FirstOrDefault(x => x.OnlineJobSiteId == id));
        }
        private bool OnlineJobSiteExists(int id)
        {
            return db.OnlineJobSites.Any(e => e.OnlineJobSiteId == id);
        }
    }
}
