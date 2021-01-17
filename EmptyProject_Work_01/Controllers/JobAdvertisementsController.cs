using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmptyProject_Work_01.Models;

namespace EmptyProject_Work_01.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobAdvertisementsController : ControllerBase
    {
        private readonly JobDbContext _context;

        public JobAdvertisementsController(JobDbContext context)
        {
            _context = context;
        }

        // GET: api/JobAdvertisements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobAdvertisement>>> GetJobAdvertisements()
        {
            return await _context.JobAdvertisements.ToListAsync();
        }

        // GET: api/JobAdvertisements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobAdvertisement>> GetJobAdvertisement(int id)
        {
            var jobAdvertisement = await _context.JobAdvertisements.FindAsync(id);

            if (jobAdvertisement == null)
            {
                return NotFound();
            }

            return jobAdvertisement;
        }

        // PUT: api/JobAdvertisements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobAdvertisement(int id, JobAdvertisement jobAdvertisement)
        {
            if (id != jobAdvertisement.JobAdvertisementId)
            {
                return BadRequest();
            }

            _context.Entry(jobAdvertisement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobAdvertisementExists(id))
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

        // POST: api/JobAdvertisements
        [HttpPost]
        public async Task<ActionResult<JobAdvertisement>> PostJobAdvertisement(JobAdvertisement jobAdvertisement)
        {
            _context.JobAdvertisements.Add(jobAdvertisement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobAdvertisement", new { id = jobAdvertisement.JobAdvertisementId }, jobAdvertisement);
        }

        // DELETE: api/JobAdvertisements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<JobAdvertisement>> DeleteJobAdvertisement(int id)
        {
            var jobAdvertisement = await _context.JobAdvertisements.FindAsync(id);
            if (jobAdvertisement == null)
            {
                return NotFound();
            }

            _context.JobAdvertisements.Remove(jobAdvertisement);
            await _context.SaveChangesAsync();

            return jobAdvertisement;
        }

        private bool JobAdvertisementExists(int id)
        {
            return _context.JobAdvertisements.Any(e => e.JobAdvertisementId == id);
        }
    }
}
