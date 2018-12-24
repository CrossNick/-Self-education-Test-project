CREATE PROCEDURE [dbo].[USPUpdateReview]
    @Id                    INT,
	@Name				NVARCHAR(50),
    @DateOfBirth				 DATE,
    @Message			NVARCHAR(MAX) 
AS
    BEGIN
		UPDATE Review
		SET [Name] = @Name, [DateOfBirth] = @DateOfBirth, [Message] = @Message
		WHERE @Id = Id
    END
