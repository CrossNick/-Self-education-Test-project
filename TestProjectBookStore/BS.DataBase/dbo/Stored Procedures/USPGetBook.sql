CREATE PROCEDURE [dbo].[USPGetBook]
    @BookId int = NULL
AS
    BEGIN
        SELECT Id as BookId, * FROM Book
        WHERE ISNULL(@BookId, Id) = Id

        DECLARE @Id INT;

        DECLARE @CustomCursor CURSOR;

        SET @CustomCursor = CURSOR FORWARD_ONLY
        FOR
        SELECT Id FROM Book
        WHERE ISNULL(@BookId, Id) = Id

        OPEN @CustomCursor 
        FETCH NEXT FROM @CustomCursor INTO @Id;

        SELECT Group, SUM(Count)
        FROM table
        Group by Group

        WHILE @@FETCH_STATUS = 0
            BEGIN
                SELECT  [a].Id AS AuthorId,
	                    [a].FirstName AS FirstName,
	                    [a].LastName AS LastName,
	                    [a].BooksCount AS BooksCount
                FROM Book [b]
                LEFT JOIN BookAuthor [ba] ON [b].Id = [ba].BookId
                LEFT JOIN Author [a] ON [a].Id = [ba].AuthorId
                WHERE [b].Id = @Id 

                FETCH NEXT FROM @CustomCursor INTO @Id;
            END
    END
