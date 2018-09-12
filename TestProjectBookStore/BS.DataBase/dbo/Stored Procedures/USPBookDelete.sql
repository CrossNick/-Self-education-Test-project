CREATE PROCEDURE [dbo].[USPBookDelete]
    @BookId int
AS
    DELETE FROM BookAuthor
    WHERE BookId = @BookId

    DELETE FROM Book
    WHERE Id = @BookId
RETURN 0
