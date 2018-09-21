CREATE PROCEDURE [dbo].[USPUpdateBook]
    @Id INT,
    @Title NVARCHAR (50),
    @AuthorIds [dbo].IntArray READONLY,
    @ReleaseDate DATE,
    @Rating FLOAT (53),
    @PageCount INT

AS
	DECLARE @Transaction NVARCHAR(MAX) = 'USPUodateBook transaction';

	BEGIN TRANSACTION @Transaction;

	BEGIN TRY
		--Remove current authors
		DECLARE @RemovedAuthorsId TABLE (
			Id INT
		);

		INSERT INTO @RemovedAuthorsId (Id)
		SELECT AuthorId AS Id
		FROM BookAuthor
		WHERE BookId = @Id

		DELETE
		FROM BookAuthor
		WHERE BookId = @Id

		--Reduce current authors book counts
		UPDATE [a]
		SET [a].BooksCount = BooksCount-1
		FROM Author [a]
		INNER JOIN @RemovedAuthorsId [ra] ON [ra].Id = [a].Id 

		--Update book
		UPDATE Book
		SET Title = @Title, ReleaseDate = @ReleaseDate, Rating = @Rating, PageCount = @PageCount
		WHERE Id =  @Id

   
		--Insert New Authors and increase their BooksCount
		INSERT
		INTO BookAuthor (AuthorId, BookId)
		SELECT [a].Id, @Id
		FROM @AuthorIds [a]

		UPDATE [a]
		SET [a].BooksCount = [a].BooksCount + 1
		FROM Author [a]
		Inner JOIN @AuthorIds [ai] ON [a].Id = [ai].Id

		RETURN @Id
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
