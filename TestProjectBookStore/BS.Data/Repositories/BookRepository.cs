using System;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BS.Data.EntityModels;

namespace BS.Data.Repositories
{
    class BookRepository : IBookRepository
    {
        private const string SP_INSERT_BOOK = "USPBookInsert";
        private const string SP_INSERT_BOOK_AUTHOR = "USPBookAuthorInsert";
        private const string SP_DELETE_BOOK= "USPBookDelete";
        private const string SP_GET_BOOK = "USPGetBook";
        private const string SP_UPDATE_BOOK = "USPUpdateBook";

        public BookEM Create(BookEM book)
        {
            using (IDbConnection db = new SqlConnection("DefaultConnection"))
            {
                book.BookId = db.Query<int>(SP_INSERT_BOOK, book, null,true,null,CommandType.StoredProcedure).FirstOrDefault();
                foreach (var author in book.Authors)
                {
                    DynamicParameters sqlParams = new DynamicParameters();
                    sqlParams.Add("BookId", book.BookId, DbType.Int32, ParameterDirection.Input);
                    sqlParams.Add("AuthorId", author.AuthorId, DbType.Int32, ParameterDirection.Input);
                    db.Query(SP_INSERT_BOOK_AUTHOR, sqlParams, null, true, null, CommandType.StoredProcedure);
                }
            }
            return book;
        }

        public void Delete(int BookId)
        {
            using (IDbConnection db = new SqlConnection("DefaultConnection"))
            {
                db.Query(SP_DELETE_BOOK, BookId, null, true, null, CommandType.StoredProcedure);
            }
        }

        public IEnumerable<BookEM> Get()
        {
            IEnumerable<BookEM> result;
            using (IDbConnection db = new SqlConnection("DefaultConnection"))
            {
                result = db.Query<BookEM>(SP_GET_BOOK, null,null,true,null,CommandType.StoredProcedure);
            }
            return result;
        }
        public BookEM Get(int BookId)
        {
            BookEM result;
            using (IDbConnection db = new SqlConnection("DefaultConnection"))
            {
                result = db.Query<BookEM>(SP_GET_BOOK, BookId, null, true, null, CommandType.StoredProcedure).FirstOrDefault();
            }
            return result;
        }

        public void Update(BookEM entity)
        {
            using (IDbConnection db = new SqlConnection("DefaultConnection"))
            {
                db.Query(SP_UPDATE_BOOK, entity, null, true, null, CommandType.StoredProcedure);
            }
        }
    }
}
