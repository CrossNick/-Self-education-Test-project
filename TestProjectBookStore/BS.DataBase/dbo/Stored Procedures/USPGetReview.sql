CREATE PROCEDURE [dbo].[USPGetReview]
    @ReviewId                    INT = NULL
AS
    BEGIN
		SELECT * FROM Review
		WHERE @ReviewId IS NULL OR @ReviewId = Id
    END
