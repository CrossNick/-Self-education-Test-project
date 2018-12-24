CREATE PROCEDURE [dbo].[USPCreateReview]
	@Name				NVARCHAR(50),
    @DateOfBirth				 DATE,
    @Message			NVARCHAR(MAX) 
AS
    BEGIN
		INSERT INTO Review (Name, DateOfBirth, Message)
		VALUES (@Name, @DateOfBirth, @Message)

		RETURN SCOPE_IDENTITY(); 
    END
