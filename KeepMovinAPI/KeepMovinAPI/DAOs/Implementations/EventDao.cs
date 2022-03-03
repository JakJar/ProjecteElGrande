using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using KeepMovinAPI.Domain;
using System;

namespace KeepMovinAPI.DAOs.Implementations
{
    public class EventDao : IEventDao
    {
        private readonly KeepMovinDbContext _context;

        public EventDao(KeepMovinDbContext context)
        {
            _context = context;
        }

        public void Add(Event eventModel)
        {
            _context.Event.Add(eventModel);
            _context.SaveChanges();
        }

        public void Remove(Guid id)
        {
            throw new System.NotImplementedException();
        }

        public Event Get(Guid id)
        {
            var query = _context.Event.Find(id);
            return query;
        }

        public IEnumerable<Event> GetByInput(string input)
        {
            var query = _context.Event.Where(i => i.Name.ToLower().Contains(input.ToLower()));
            return query.ToList();
        }

        public IEnumerable<Event> GetAll()
        {
            var query = _context.Event.ToList();
            return query;
        }

        public IEnumerable<Event> GetAllByMonthAndYear(DateTime givenDate)
        {
            var query = _context.Event
                .Where(i => i.StartEvent.Month == givenDate.Month && i.StartEvent.Year == givenDate.Year).ToList();
            return query;
        }
    }
}