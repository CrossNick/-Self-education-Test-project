CREATE PROCEDURE [dbo].[USPUpdateBook]
    @Id INT,
    @Title NVARCHAR (50),
    @AuthorIds [dbo].IntArray READONLY,
    @ReleaseDate DATE,
    @Rating FLOAT (53),
    @PageCount INT

AS
    UPDATE Book
    SET Title = @Title, ReleaseDate = @ReleaseDate, Rating = @Rating, PageCount = @PageCount
    WHERE Id =  @Id

    DELETE
    FROM BookAuthor
    WHERE BookId = @Id

    INSERT
    INTO BookAuthor (AuthorId, BookId)
    SELECT [a].Id, @Id
    FROM @AuthorIds [a]

RETURN @Id
