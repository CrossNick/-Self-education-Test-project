using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS.Data.EntityModels
{
    public class BookEM
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public IEnumerable<AuthorEM> Authors { get; set; }
        public float Rating { get; set; }
        public int PageCount { get; set; }
    }
}
