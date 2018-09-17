CREATE PROCEDURE [dbo].[USPBookDelete]
    @BookId int
AS
    

   


	DECLARE @RemovedAuthorsId TABLE (
		Id INT
	);

	INSERT INTO @RemovedAuthorsId
	SELECT AuthorId AS Id
	FROM BookAuthor
	WHERE BookId = @BookId

	UPDATE [a]
	SET [a].BooksCount = BooksCount-1
	FROM Author [a]
	INNER JOIN @RemovedAuthorsId [ra] ON [ra].Id = [a].Id 

	DELETE FROM BookAuthor
    WHERE BookId = @BookId

	 DELETE FROM Book
    WHERE Id = @BookId

RETURN 0
