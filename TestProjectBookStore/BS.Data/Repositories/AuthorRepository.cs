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
    public class AuthorRepository: IAuthorRepository
    {
        private const string SP_INSERT_AUTHOR = "USPAuthorInsert";
        private const string SP_DELETE_AUTHOR = "USPAuthorDelete";
        private const string SP_GET_AUTHOR = "USPGetAuthor";
        private const string SP_UPDATE_AUTHOR = "USPUpdateAuthor";
        private string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public AuthorEM Create(AuthorEM author)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@FirstName", author.FirstName, DbType.String);
                sqlParams.Add("@LastName", author.LastName, DbType.String);
                author.AuthorId = db.Query<int>(SP_INSERT_AUTHOR, sqlParams, null, true, null, CommandType.StoredProcedure).FirstOrDefault();
            }
            return author;
        }

        public void Delete(int AuthorId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@AuthorId", AuthorId, DbType.Int32);
                db.Query(SP_DELETE_AUTHOR, sqlParams, null, true, null, CommandType.StoredProcedure);
            }
        }

        public IEnumerable<AuthorEM> Get()
        {
            IEnumerable<AuthorEM> result;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                result = db.Query<AuthorEM>(SP_GET_AUTHOR, null, null, true, null, CommandType.StoredProcedure);
            }
            return result;
        }
        public AuthorEM Get(int AuthorId)
        {
            AuthorEM result;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@AuthorId", AuthorId, DbType.Int32);
                result = db.Query<AuthorEM>(SP_GET_AUTHOR, sqlParams, null, true, null, CommandType.StoredProcedure).FirstOrDefault();
            }
            return result;
        }

        public void Update(AuthorEM author)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@AuthorId", author.AuthorId, DbType.Int32);
                sqlParams.Add("@FirstName", author.FirstName, DbType.String);
                sqlParams.Add("@LastName", author.LastName, DbType.String);
                db.Query(SP_UPDATE_AUTHOR, sqlParams, null, true, null, CommandType.StoredProcedure);
            }
        }
    }
}
