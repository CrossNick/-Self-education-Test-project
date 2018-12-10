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

        public IEnumerable<AuthorEM> Get(int Length, int Start, out int total, string columName = null, bool descOrder = false)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                IEnumerable<AuthorEM> result;
                var spParams = new DynamicParameters();
                spParams.Add("Length", Length);
                spParams.Add("Start", Start);
                if (columName != null)
                {
                    spParams.Add("ColumName", columName);
                    spParams.Add("DescendingOrder", descOrder);
                }
                spParams.Add("Total", dbType: DbType.Int32, direction: ParameterDirection.Output);
                result = db.Query<AuthorEM>(SP_GET_AUTHOR, spParams, commandType: CommandType.StoredProcedure);
                total = spParams.Get<int>("Total");
                return result;
            }
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

        public IEnumerable<AuthorEM> Get()
        {
            throw new NotImplementedException();
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
