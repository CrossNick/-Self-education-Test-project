CREATE PROCEDURE [dbo].[USPUpdateBook]
    @Id INT,
    @Title NVARCHAR (50),
    @AuthorIds [dbo].IntArray READONLY,
    @ReleaseDate DATE,
    @Rating FLOAT (53),
    @PageCount INT

AS
	--Remove current authors
	DECLARE @RemovedAuthorsId TABLE (
		Id INT
	);

	INSERT INTO @RemovedAuthorsId
	SELECT AuthorId AS Id
	FROM BookAuthor
	WHERE BookId = @Id

	DELETE
    FROM BookAuthor
    WHERE BookId = @Id

	--Reduce current authors book counts
	UPDATE [a]
	SET [a].BooksCount = BooksCount-1
	FROM Author [a]
	INNER JOIN @RemovedAuthorsId [ra] ON [ra].Id = [a].Id 

	--Update book
    UPDATE Book
    SET Title = @Title, ReleaseDate = @ReleaseDate, Rating = @Rating, PageCount = @PageCount
    WHERE Id =  @Id

   
    --Insert New Authors and increase their BooksCount
    INSERT
    INTO BookAuthor (AuthorId, BookId)
    SELECT [a].Id, @Id
    FROM @AuthorIds [a]

	UPDATE [a]
	SET [a].BooksCount = [a].BooksCount + 1
	FROM Author [a]
	Inner JOIN @AuthorIds [ai] ON [a].Id = [ai].Id

RETURN @Id
