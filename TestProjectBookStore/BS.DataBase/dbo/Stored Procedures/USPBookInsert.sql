CREATE PROCEDURE [dbo].[USPBookInsert]
    @Title NVARCHAR (50),
    @AuthorIds [dbo].IntArray READONLY,
    @ReleaseDate DATE,
    @Rating FLOAT (53),
    @PageCount INT

AS
	
	DECLARE @Transaction NVARCHAR(MAX) = 'USPBookInsert transaction';

	BEGIN TRANSACTION @Transaction;

	BEGIN TRY
		-- Understand ordering commands in SELECT
		-- Group BY and HAVING
		-- Stored procedures msdn 
		--sql excersizes 
		INSERT
		INTO Book (Title, ReleaseDate, Rating, PageCount)
		VALUES (@Title, @ReleaseDate, @Rating, @PageCount)

		DECLARE @BookID INT = IDENT_CURRENT('Book');

		INSERT
		INTO BookAuthor (AuthorId, BookId)
		SELECT [a].Id, @BookID
		FROM @AuthorIds [a]

		UPDATE [a]
		SET [a].BooksCount = [a].BooksCount + 1
		FROM Author [a]
			JOIN @AuthorIds [ai] ON [a].Id = [ai].Id

		RETURN @BookID
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			BEGIN
				ROLLBACK TRANSACTION @Transaction;
			END;
		DECLARE @ErrMessage   NVARCHAR(4000),
				@ErrNumber    INT,
				@ErrSeverity  INT,
				@ErrState     INT,
				@ErrLine      INT,
				@ErrProcedure NVARCHAR(200);
		SELECT @ErrNumber = ERROR_NUMBER()
			  ,@ErrSeverity = ERROR_SEVERITY()
			  ,@ErrState = ERROR_STATE()
			  ,@ErrLine = ERROR_LINE()
			  ,@ErrProcedure = ISNULL(ERROR_PROCEDURE(),'-');
		SELECT @ErrMessage = N'Error %d, Level %d, State %d, Procedure %s, Line %d, '+'Message: '+ERROR_MESSAGE();
		SELECT-1 AS [Result];
		RAISERROR(@ErrMessage,@ErrSeverity,1,@ErrNumber,@ErrSeverity,@ErrState,@ErrProcedure,@ErrLine);
	END CATCH;

	IF @@TRANCOUNT > 0
		BEGIN
			COMMIT TRANSACTION @Transaction;
		END;
-- SELECT Col1
-- FROM Test
-- GROUP BY Col1
