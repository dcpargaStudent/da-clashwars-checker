using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DaClashWarsChecker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClanCheckerController : ControllerBase
    {
        private readonly ILogger<ClanCheckerController> _logger;

        public ClanCheckerController(ILogger<ClanCheckerController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<MemberData> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new MemberData()
            {
                Name = $"Player_{index}",
                DonationsGive = rng.Next(0, 200),
                DonationsReceived = rng.Next(0, 2000),
                Fame = rng.Next(0, 4000)
            });
        }
    }
}