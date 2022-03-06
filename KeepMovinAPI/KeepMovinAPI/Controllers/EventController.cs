using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KeepMovinAPI.Authentication;
using KeepMovinAPI.DAOs;
using KeepMovinAPI.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using KeepMovinAPI.Domain.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace KeepMovinAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ILogger<EventController> _logger;
        private IEventDao _daoEvent;
        private readonly IJwtAuthenticationManager _jwtAuthenticationManager;
        private IUserDao _userDao;


        public EventController(ILogger<EventController> logger, IEventDao daoEvent, IJwtAuthenticationManager jwt)
        {
            _logger = logger;
            _daoEvent = daoEvent;
            _jwtAuthenticationManager = jwt;
        }

        [HttpGet("{id}")]
        public Event Get(Guid id)
        {
            Event eventModel = _daoEvent.Get(id);
            return eventModel;
        }


        [HttpGet("input/{input}")]
        public IEnumerable<Event> GetByInput(string input)
        {
            var listOfEvents = _daoEvent.GetByInput(input);
            return listOfEvents;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<Event>>> GetFilteredEvents([FromQuery] Filter filter)
        {
            var listOfEvents = _daoEvent.GetFiltered(filter);
            if (!listOfEvents.Any())
            {
                return NoContent();
            }
            return Ok(listOfEvents);

        }
        
        [HttpGet("all")]
        public IEnumerable<Event> GetAll()
        {
            var listOfEvents = _daoEvent.GetAll();
            return listOfEvents;
        }

        [HttpPost]
        public IActionResult Add(Event eventModel)
        {
            string jwt = Request.Cookies["token"];
            if (Validate(eventModel.User.Organiser.Userid, jwt))
            {
                _daoEvent.Add(eventModel);
                return Ok();
            }

            return Unauthorized();
        }


        [NonAction]
        public bool Validate(Guid userId, string jwt)
        {
            try
            {
                var token = _jwtAuthenticationManager.Verify(jwt);
                var tokenClaims = token.Claims.ToList();
                var user = _userDao.Get(Guid.Parse(tokenClaims[0].Value));
                if (userId == user.Userid)
                    return true;
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}