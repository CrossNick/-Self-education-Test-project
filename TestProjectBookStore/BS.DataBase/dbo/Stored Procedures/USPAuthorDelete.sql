CREATE PROCEDURE [dbo].[USPAuthorDelete]
    @AuthorId int
AS
   DELETE 
   FROM BookAuthor
   WHERE AuthorId = @AuthorId

   DELETE
   FROM Author
   WHERE Id = @AuthorId
