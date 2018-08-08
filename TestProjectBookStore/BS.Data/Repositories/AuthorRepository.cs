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
    public class AuthorRepository: IAuthorRepository
    {
        private const string SP_INSERT_AUTHOR = "USPAuthorInsert";
        private const string SP_DELETE_AUTHOR = "USPAuthorDelete";
        private const string SP_GET_AUTHOR = "USPGetAuthor";
        private const string SP_UPDATE_AUTHOR = "USPUpdateAuthor";

        public AuthorEM Create(AuthorEM author)
        {
            using (IDbConnection db = new SqlConnection("DefaultConnection"))
            {
                author.AuthorId = db.Query<int>(SP_INSERT_AUTHOR, author, null, true, null, CommandType.StoredProcedure).FirstOrDefault();
            }
            return author;
        }

        public void Delete(int AuthorId)
        {
            using (IDbConnection db = new SqlConnection("DefaultConnection"))
            {
                db.Query(SP_DELETE_AUTHOR, AuthorId, null, true, null, CommandType.StoredProcedure);
            }
        }

        public IEnumerable<AuthorEM> Get()
        {
            IEnumerable<AuthorEM> result;
            result = new List<AuthorEM>(){
                new AuthorEM(){AuthorId=1, FirstName="John", LastName="Smith", BooksCount=2},
                new AuthorEM(){AuthorId=2, FirstName="James", LastName="Mitch", BooksCount=3},
                new AuthorEM(){AuthorId=2, FirstName="Joe", LastName="Truth", BooksCount=2}
            };
            //using (IDbConnection db = new SqlConnection("DefaultConnection"))
            //{
            //    result = db.Query<AuthorEM>(SP_GET_AUTHOR, null, null, true, null, CommandType.StoredProcedure);
            //}
            return result;
        }
        public AuthorEM Get(int AuthorId)
        {
            AuthorEM result;
            using (IDbConnection db = new SqlConnection("DefaultConnection"))
            {
                result = db.Query<AuthorEM>(SP_GET_AUTHOR, AuthorId, null, true, null, CommandType.StoredProcedure).FirstOrDefault();
            }
            return result;
        }

        public void Update(AuthorEM entity)
        {
            using (IDbConnection db = new SqlConnection("DefaultConnection"))
            {
                db.Query(SP_UPDATE_AUTHOR, entity, null, true, null, CommandType.StoredProcedure);
            }
        }

        public IEnumerable<AuthorEM> GetAuthors(int bookId)
        {
            IEnumerable<AuthorEM> result;
           
            if (bookId == 1)
                result = new List<AuthorEM>(){
                new AuthorEM(){AuthorId=1, FirstName="John", LastName="Smith", BooksCount=2},
                new AuthorEM(){AuthorId=2, FirstName="James", LastName="Mitch", BooksCount=3}
                };
            else if(bookId == 2)
                result = new List<AuthorEM>(){
                new AuthorEM(){AuthorId=2, FirstName="James", LastName="Mitch", BooksCount=3},
                new AuthorEM(){AuthorId=2, FirstName="Joe", LastName="Truth", BooksCount=2}
                };
            else
                result = new List<AuthorEM>(){
                new AuthorEM(){AuthorId=1, FirstName="John", LastName="Smith", BooksCount=2},
                new AuthorEM(){AuthorId=2, FirstName="James", LastName="Mitch", BooksCount=3},
                new AuthorEM(){AuthorId=2, FirstName="Joe", LastName="Truth", BooksCount=2}
                };

            return result;

            throw new NotImplementedException();
        }
    }
}
