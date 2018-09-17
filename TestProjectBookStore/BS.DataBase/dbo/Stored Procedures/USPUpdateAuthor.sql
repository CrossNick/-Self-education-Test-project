CREATE PROCEDURE [dbo].[USPUpdateAuthor]
    @AuthorId int,
    @FirstName nvarchar(50),
	@LastName nvarchar(50)
AS
    UPDATE Author
	SET FirstName = @FirstName, LastName = @LastName
	WHERE Id = @AuthorId