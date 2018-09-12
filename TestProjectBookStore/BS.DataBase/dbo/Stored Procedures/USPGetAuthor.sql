CREATE PROCEDURE [dbo].[USPGetAuthor]
    @AuthorId INT = NULL
AS
    SELECT Author.Id AS AuthorId, * FROM Author
    WHERE ISNULL(@AuthorId, Author.Id) = Author.Id

