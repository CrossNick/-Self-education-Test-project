﻿CREATE PROCEDURE [dbo].[USPBookDelete]
    @BookId int
AS
	DECLARE @Transaction NVARCHAR(MAX) = 'USPBookDelete transaction';

	BEGIN TRANSACTION @Transaction;

	BEGIN TRY

		DECLARE @RemovedAuthorsId TABLE (
			Id INT
		);

		INSERT INTO @RemovedAuthorsId (Id)
		SELECT AuthorId AS Id
		FROM BookAuthor
		WHERE BookId = @BookId

		UPDATE [a]
		SET [a].BooksCount = BooksCount-1
		FROM Author [a]
		INNER JOIN @RemovedAuthorsId [ra] ON [ra].Id = [a].Id 

		DELETE FROM BookAuthor
		WHERE BookId = @BookId

		 DELETE FROM Book
		WHERE Id = @BookId

		RETURN 0
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