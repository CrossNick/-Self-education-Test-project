using System;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BS.Data.EntityModels;
using System.Configuration;

namespace BS.Data.Repositories
{
    public class BookRepository : IBookRepository
    {
        private const string SP_INSERT_BOOK = "USPBookInsert";
        private const string SP_INSERT_BOOK_AUTHOR = "USPBookAuthorInsert";
        private const string SP_DELETE_BOOK= "USPBookDelete";
        private const string SP_GET_BOOK = "USPGetBook";
        private const string SP_UPDATE_BOOK = "USPUpdateBook";
        private string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        private List<BookEM> books = new List<BookEM>(){
                new BookEM(){BookId=1, Title="Book 1", ReleaseDate=new DateTime(2010,1,1), Rating=10, PageCount=300},
                new BookEM(){BookId=2, Title="Book 2", ReleaseDate=new DateTime(2010,2,2), Rating=5, PageCount=500},
                new BookEM(){BookId=3, Title="Book 3", ReleaseDate=new DateTime(2010,3,3), Rating=8, PageCount=600}
            };


        public int Edit(BookCreateEM book)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@Id", book.BookId, DbType.String);
                sqlParams.Add("@Title", book.Title, DbType.String);
                sqlParams.Add("@ReleaseDate", book.ReleaseDate, DbType.Date);
                sqlParams.Add("@Rating", book.Rating, DbType.Double);
                sqlParams.Add("@PageCount", book.PageCount, DbType.Int32);
                sqlParams.Add("@AuthorIds", book.Authors.AuthorsAsDataTableParam().AsTableValuedParameter("IntArray"));
                book.BookId = db.Query<int>(SP_UPDATE_BOOK, sqlParams, null, true, null, CommandType.StoredProcedure).FirstOrDefault();
            }
            return book.BookId;
        }

        public BookCreateEM Create(BookCreateEM book)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@Title", book.Title, DbType.String);
                sqlParams.Add("@ReleaseDate", book.ReleaseDate, DbType.Date);
                sqlParams.Add("@Rating", book.Rating, DbType.Double);
                sqlParams.Add("@PageCount", book.PageCount, DbType.Int32);
                sqlParams.Add("@AuthorIds", book.Authors.AuthorsAsDataTableParam().AsTableValuedParameter("IntArray"));
                book.BookId = db.Query<int>(SP_INSERT_BOOK, sqlParams, null, true, null, CommandType.StoredProcedure).FirstOrDefault();
            }
            return book;
        }

        public BookEM Create(BookEM entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(int BookId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@BookId", BookId, DbType.String);
                db.Query(SP_DELETE_BOOK, sqlParams, null, true, null, CommandType.StoredProcedure);
            }
        }

        public IEnumerable<BookEM> Get()
        {
            IEnumerable<BookEM> result;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@BookId", null, DbType.String);
                using (var multi = db.QueryMultiple(SP_GET_BOOK, sqlParams, null, null, CommandType.StoredProcedure))
                {
                    result = multi.Read<BookEM>();
                    foreach(var book in result)
                    {
                        if(!multi.IsConsumed)
                            book.Authors = multi.Read<AuthorEM>();
                    }

                }
            }
            return result;
        }

        public BookEM Get(int BookId)
        {
            BookEM result;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                result = db.Query<BookEM>(SP_GET_BOOK, BookId, null, true, null, CommandType.StoredProcedure).FirstOrDefault();
            }
            return result;
        }

        public void Update(BookEM entity)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Query(SP_UPDATE_BOOK, entity, null, true, null, CommandType.StoredProcedure);
            }
        }
    }
}
