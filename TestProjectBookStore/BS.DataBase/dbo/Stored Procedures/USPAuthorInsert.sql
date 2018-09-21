CREATE PROCEDURE [dbo].[USPAuthorInsert]
    @FirstName  NVARCHAR (50),
    @LastName  NVARCHAR (50)
AS
    INSERT 
    INTO Author (FirstName, LastName, BooksCount)
    VALUES (@FirstName, @LastName, 0)