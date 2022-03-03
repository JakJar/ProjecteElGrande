using System.Collections.Generic;
using KeepMovinAPI.Models.Dtos;

namespace KeepMovinAPI.DAOs
{
    public interface IDao<T>
    {
        void Add(T item);
        void Remove(int id);
        T Get(int id);
        IEnumerable<T> GetAll();
    }
}