CREATE PROCEDURE [dbo].[USPAuthorDelete]
    @AuthorId int
AS
	DECLARE @Transaction NVARCHAR(MAX) = 'USPAuthorDelete transaction';

	BEGIN TRANSACTION @Transaction;

	BEGIN TRY
	   DELETE 
	   FROM BookAuthor
	   WHERE AuthorId = @AuthorId

	   DELETE
	   FROM Author
	   WHERE Id = @AuthorId
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