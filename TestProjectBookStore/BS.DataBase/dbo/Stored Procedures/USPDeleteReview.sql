CREATE PROCEDURE [dbo].[USPDeleteReview]
    @ReviewId                    INT
AS
    BEGIN
		DELETE FROM Review
		WHERE @ReviewId = Id
    END
