﻿using BS.Data.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Data.Repositories
{
    public interface IBookRepository : IRepository<BookEM>
    {
        BookCreateEM Create(BookCreateEM book);
        int Edit(BookCreateEM book);
    }
}
