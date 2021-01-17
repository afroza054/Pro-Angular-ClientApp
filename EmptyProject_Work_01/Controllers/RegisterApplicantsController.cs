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
    public class RegisterApplicantsController : ControllerBase
    {
        private readonly JobDbContext _context;

        public RegisterApplicantsController(JobDbContext context)
        {
            _context = context;
        }

        // GET: api/RegisterApplicants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisterApplicant>>> GetRegisterApplicants()
        {
            return await _context.RegisterApplicants.ToListAsync();
        }

        // GET: api/RegisterApplicants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegisterApplicant>> GetRegisterApplicant(int id)
        {
            var registerApplicant = await _context.RegisterApplicants.FindAsync(id);

            if (registerApplicant == null)
            {
                return NotFound();
            }

            return registerApplicant;
        }

        // PUT: api/RegisterApplicants/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegisterApplicant(int id, RegisterApplicant registerApplicant)
        {
            if (id != registerApplicant.RegisterApplicantId)
            {
                return BadRequest();
            }

            _context.Entry(registerApplicant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisterApplicantExists(id))
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

        // POST: api/RegisterApplicants
        [HttpPost]
        public async Task<ActionResult<RegisterApplicant>> PostRegisterApplicant(RegisterApplicant registerApplicant)
        {
            _context.RegisterApplicants.Add(registerApplicant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegisterApplicant", new { id = registerApplicant.RegisterApplicantId }, registerApplicant);
        }

        // DELETE: api/RegisterApplicants/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RegisterApplicant>> DeleteRegisterApplicant(int id)
        {
            var registerApplicant = await _context.RegisterApplicants.FindAsync(id);
            if (registerApplicant == null)
            {
                return NotFound();
            }

            _context.RegisterApplicants.Remove(registerApplicant);
            await _context.SaveChangesAsync();

            return registerApplicant;
        }

        private bool RegisterApplicantExists(int id)
        {
            return _context.RegisterApplicants.Any(e => e.RegisterApplicantId == id);
        }
    }
}
