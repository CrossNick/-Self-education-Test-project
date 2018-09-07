CREATE PROCEDURE [dbo].[USPGetBook]
    @BookId int = NULL
AS
    SELECT * FROM Book
    WHERE ISNULL(@BookId, Book.Id) = Book.Id


        --Cursor example

      --DECLARE @Id INT;
      --      DECLARE @Name VARCHAR(MAX);
      --      DECLARE @FieldTypeId INT;
      --      DECLARE @IsActive BIT;
      --      DECLARE @NewCustomFieldId INT;

      --      DECLARE @CustomFieldCursor CURSOR;


      --      SET @CustomFieldCursor = CURSOR FORWARD_ONLY
      --      FOR SELECT * FROM @Fields;

      --      OPEN @CustomFieldCursor;
      --      FETCH NEXT FROM @CustomFieldCursor INTO @Id,
      --                                              @Name,
      --                                              @FieldTypeId,
      --                                              @IsActive;
      --WHILE @@FETCH_STATUS = 0
      --  FETCH NEXT FROM @CustomFieldCursor INTO @Id,
      --                                                      @Name,
      --                                                      @FieldTypeId,
      --                                                      @IsActive;
