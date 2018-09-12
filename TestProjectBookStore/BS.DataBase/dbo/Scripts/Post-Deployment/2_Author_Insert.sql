DECLARE @AuthorsToInsert TABLE
                     ( 
                    [Id]   INT           NOT NULL,
					[FirstName]  NVARCHAR (50) NOT NULL,
					[LastName]   NVARCHAR (50) NOT NULL,
					[BooksCount] INT           NULL
                     ); 
INSERT INTO @AuthorsToInsert
VALUES
		(1, 'Joanne', 'Rowling',3),
		(2, 'John','Tolkien',3),
		(3, 'George', 'Martin', 3)

INSERT INTO [dbo].[Author]
SELECT 
		[ai].[FirstName],
		[ai].[LastName],
		[ai].[BooksCount]
FROM @AuthorsToInsert AS [ai]
     LEFT JOIN [Author] AS [a] ON [ai].[Id] = [a].[Id]
WHERE [a].[Id] IS NULL