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
    public class ReviewRepository : IReviewRepository
    {
        private const string SP_GET_REVIEW = "USPGetReview";
        private const string SP_UPDATE_REVIEW = "USPUpdateReview";
        private const string SP_Delete_REVIEW = "USPDeleteReview";
        private const string SP_Create_REVIEW = "USPCreateReview";

        private string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;


        public ReviewEM Create(ReviewEM model)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
  
                sqlParams.Add("@Name", model.Name, DbType.String);
                sqlParams.Add("@DateOfBirth", model.DateOfBirth, DbType.Date);
                sqlParams.Add("@Message", model.Message, DbType.String);
                model.Id = db.Query<int>(SP_Create_REVIEW, sqlParams, null, true, null, CommandType.StoredProcedure).FirstOrDefault();
            }
            return model;
        }

        public void Delete(int Id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@ReviewId", Id, DbType.Int32);
                db.Query<ReviewEM>(SP_Delete_REVIEW, sqlParams, null, true, null, CommandType.StoredProcedure);
            };
        }

        public IEnumerable<ReviewEM> Get()
        {
            IEnumerable<ReviewEM> result;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@ReviewId", null, DbType.Int32);
                result = db.Query<ReviewEM>(SP_GET_REVIEW, sqlParams, null, true, null, CommandType.StoredProcedure);
            }
            return result;
        }

        public ReviewEM Get(int Id)
        {
            ReviewEM result;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                DynamicParameters sqlParams = new DynamicParameters();
                sqlParams.Add("@ReviewId", Id, DbType.Int32);
                result = db.Query<ReviewEM>(SP_GET_REVIEW, sqlParams, null, true, null, CommandType.StoredProcedure).First();
            }
            return result;
        }

        public void Update(ReviewEM model)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Query(SP_UPDATE_REVIEW, model, null, true, null, CommandType.StoredProcedure);
            }
        }
    }
}
