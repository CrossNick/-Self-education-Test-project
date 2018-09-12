CREATE PROCEDURE [dbo].[USPBookInsert]
    @Title NVARCHAR (50),
    @AuthorIds [dbo].IntArray READONLY,
    @ReleaseDate DATE,
    @Rating FLOAT (53),
    @PageCount INT

AS
    INSERT
    INTO Book
    VALUES (@Title, @ReleaseDate, @Rating, @PageCount)

    DECLARE @BookID INT = IDENT_CURRENT('Book');

    INSERT
    INTO BookAuthor (AuthorId, BookId)
    SELECT [a].Id, @BookID
    FROM @AuthorIds [a]

RETURN @BookID
