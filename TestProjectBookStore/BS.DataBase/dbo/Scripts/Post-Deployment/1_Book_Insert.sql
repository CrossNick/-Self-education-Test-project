DECLARE @BooksToInsert TABLE
                     ( 
                     [Id]      INT           NOT NULL,
					 [Title]       NVARCHAR (50) NOT NULL,
					 [ReleaseDate] DATE          NULL,
					 [Rating]      FLOAT (53)    NULL,
					 [PageCount]   INT           NULL
                     ); 
SET IDENTITY_INSERT dbo.Book ON;  
INSERT INTO @BooksToInsert
VALUES
		(1, 'Harry Potter and the Chamber of Secrets', convert(DATE, '02-07-1998'), 4.6, 251),
		(2, 'Harry Potter and the Philosophers Stone', convert(DATE, '06-26-1997'), 4.9, 223),
		(3, 'Harry Potter and the Prisoner of Azkaban', convert(DATE, '07-08-1999'), 4.7, 317),
		(4, 'The Fellowship of the Ring', convert(DATE, '07-29-1954'), 5, 423),
		(5, 'The Two Towers', convert(DATE, '11-11-1954'), 4.9, 352),
		(6, 'The Return of the King', convert(DATE, '10-20-1955'), 4.8, 416),
		(7, 'A Game of Thrones', convert(DATE, '08-01-1996'), 5, 694),
		(8, 'A Clash of Kings', convert(DATE, '03-01-1997'), 4.9, 768),
		(9, 'A Storm of Swords', convert(DATE, '01-01-2000'), 4.7, 973)

INSERT INTO [dbo].[Book]
SELECT 
		[bi].[Title],
		[bi].[ReleaseDate],
		[bi].[Rating],
		[bi].[PageCount]
FROM @BooksToInsert AS [bi]
     LEFT JOIN [Book] AS [b] ON [bi].[Id] = [b].[Id]
WHERE [b].[Id] IS NULL