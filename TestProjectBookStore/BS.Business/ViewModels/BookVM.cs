﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Business.ViewModels
{
    public class BookVM : DataTableInfoVM
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string ReleaseDate { get; set; }
        public IEnumerable<AuthorVM> Authors { get; set; }
        public float Rating { get; set; }
        public int PageCount { get; set; }
        public string Mode { get; set; }
    }

    public class BookCreateVM
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public IEnumerable<int> Authors { get; set; }
        public float Rating { get; set; }
        public int PageCount { get; set; }
        public string Mode { get; set; }
    }
}
