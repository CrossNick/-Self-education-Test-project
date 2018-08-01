DECLARE @BooksAuthorsToInsert TABLE
                     ( 
                       [BookId]   INT NOT NULL,
					   [AuthorId] INT NOT NULL
                     ); 

INSERT INTO @BooksAuthorsToInsert
VALUES
		(1,1),
		(2,1),
		(3,1),
		(4,2),
		(5,2),
		(6,2),
		(7,3),
		(8,3),
		(9,3)

INSERT INTO [dbo].[BookAuthor]
SELECT [bi].[BookId],
		[bi].AuthorId
FROM @BooksAuthorsToInsert AS [bi]
     LEFT JOIN [BookAuthor] AS [b] ON b.AuthorId = bi.AuthorId AND b.BookId=bi.BookId
WHERE [b].AuthorId IS NULL AND [b].BookId IS NULL