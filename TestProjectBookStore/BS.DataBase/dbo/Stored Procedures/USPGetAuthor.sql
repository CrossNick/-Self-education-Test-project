CREATE PROCEDURE [dbo].[USPGetAuthor]
    @AuthorId INT = NULL,
    @Start                     INT           = 1, 
    @Length                    INT           = 1000, 
    @Total                     INT OUTPUT, 
    @ColumName                 NVARCHAR(50)  = 'AuthorId', 
    @DescendingOrder           BIT           = 0
AS
     SELECT @Total = COUNT(*)
     FROM [Author];

     SELECT [Id] AS AuthorId, [FirstName], [LastName], [BooksCount]
     FROM
     (
         SELECT DENSE_RANK() OVER(ORDER BY CASE
                                               WHEN @ColumName = 'FirstName'
                                                    AND @DescendingOrder = 1
                                               THEN [a].[FirstName]
                                           END DESC,
                                           CASE
                                               WHEN @ColumName = 'FirstName'
                                               THEN [a].[FirstName]
                                           END,
                                           CASE
                                               WHEN @ColumName = 'LastName'
                                                    AND @DescendingOrder = 1
                                               THEN [a].[LastName]
                                           END DESC,
                                           CASE
                                               WHEN @ColumName = 'LastName'
                                               THEN [a].[LastName]
                                           END,
                                           CASE
                                               WHEN @ColumName = 'BooksCount'
                                                    AND @DescendingOrder = 1
                                               THEN [a].[BooksCount]
                                           END DESC,
                                           CASE
                                               WHEN @ColumName = 'BooksCount'
                                               THEN [a].[BooksCount]
                                           END) AS [AuthorNum],
                                           *

         FROM [Author] [a]
     ) t
     WHERE t.[AuthorNum] BETWEEN @Start * (@Length + 1) AND (@Start + 1) * @Length;

