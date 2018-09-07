CREATE PROCEDURE [dbo].[USPGetAuthor]
    @AuthorId INT = NULL
AS
    SELECT * FROM Author
    WHERE ISNULL(@AuthorId, Author.Id) = Author.Id

