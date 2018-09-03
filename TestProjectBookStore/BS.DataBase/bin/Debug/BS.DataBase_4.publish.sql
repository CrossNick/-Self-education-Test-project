/*
Скрипт развертывания для BugTrackerDb

Этот код был создан программным средством.
Изменения, внесенные в этот файл, могут привести к неверному выполнению кода и будут потеряны
в случае его повторного формирования.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "BugTrackerDb"
:setvar DefaultFilePrefix "BugTrackerDb"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\"

GO
:on error exit
GO
/*
Проверьте режим SQLCMD и отключите выполнение скрипта, если режим SQLCMD не поддерживается.
Чтобы повторно включить скрипт после включения режима SQLCMD выполните следующую инструкцию:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'Для успешного выполнения этого скрипта должен быть включен режим SQLCMD.';
        SET NOEXEC ON;
    END


GO
USE [master];


GO

IF (DB_ID(N'$(DatabaseName)') IS NOT NULL) 
BEGIN
    ALTER DATABASE [$(DatabaseName)]
    SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [$(DatabaseName)];
END

GO
PRINT N'Выполняется создание $(DatabaseName)...'
GO
CREATE DATABASE [$(DatabaseName)]
    ON 
    PRIMARY(NAME = [$(DatabaseName)], FILENAME = N'$(DefaultDataPath)$(DefaultFilePrefix)_Primary.mdf')
    LOG ON (NAME = [$(DatabaseName)_log], FILENAME = N'$(DefaultLogPath)$(DefaultFilePrefix)_Primary.ldf') COLLATE SQL_Latin1_General_CP1_CI_AS
GO
USE [$(DatabaseName)];


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET ANSI_NULLS ON,
                ANSI_PADDING ON,
                ANSI_WARNINGS ON,
                ARITHABORT ON,
                CONCAT_NULL_YIELDS_NULL ON,
                NUMERIC_ROUNDABORT OFF,
                QUOTED_IDENTIFIER ON,
                ANSI_NULL_DEFAULT ON,
                CURSOR_DEFAULT LOCAL,
                RECOVERY FULL,
                CURSOR_CLOSE_ON_COMMIT OFF,
                AUTO_CREATE_STATISTICS ON,
                AUTO_SHRINK OFF,
                AUTO_UPDATE_STATISTICS ON,
                RECURSIVE_TRIGGERS OFF 
            WITH ROLLBACK IMMEDIATE;
        ALTER DATABASE [$(DatabaseName)]
            SET AUTO_CLOSE OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET ALLOW_SNAPSHOT_ISOLATION OFF;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET READ_COMMITTED_SNAPSHOT OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET AUTO_UPDATE_STATISTICS_ASYNC OFF,
                PAGE_VERIFY NONE,
                DATE_CORRELATION_OPTIMIZATION OFF,
                DISABLE_BROKER,
                PARAMETERIZATION SIMPLE,
                SUPPLEMENTAL_LOGGING OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF IS_SRVROLEMEMBER(N'sysadmin') = 1
    BEGIN
        IF EXISTS (SELECT 1
                   FROM   [master].[dbo].[sysdatabases]
                   WHERE  [name] = N'$(DatabaseName)')
            BEGIN
                EXECUTE sp_executesql N'ALTER DATABASE [$(DatabaseName)]
    SET TRUSTWORTHY OFF,
        DB_CHAINING OFF 
    WITH ROLLBACK IMMEDIATE';
            END
    END
ELSE
    BEGIN
        PRINT N'Параметры базы данных изменить нельзя. Применить эти параметры может только пользователь SysAdmin.';
    END


GO
IF IS_SRVROLEMEMBER(N'sysadmin') = 1
    BEGIN
        IF EXISTS (SELECT 1
                   FROM   [master].[dbo].[sysdatabases]
                   WHERE  [name] = N'$(DatabaseName)')
            BEGIN
                EXECUTE sp_executesql N'ALTER DATABASE [$(DatabaseName)]
    SET HONOR_BROKER_PRIORITY OFF 
    WITH ROLLBACK IMMEDIATE';
            END
    END
ELSE
    BEGIN
        PRINT N'Параметры базы данных изменить нельзя. Применить эти параметры может только пользователь SysAdmin.';
    END


GO
IF fulltextserviceproperty(N'IsFulltextInstalled') = 1
    EXECUTE sp_fulltext_database 'enable';


GO
PRINT N'Выполняется создание [dbo].[Author]...';


GO
CREATE TABLE [dbo].[Author] (
    [Id]         INT           NOT NULL,
    [FirstName]  NVARCHAR (50) NOT NULL,
    [LastName]   NVARCHAR (50) NOT NULL,
    [BooksCount] INT           NULL,
    CONSTRAINT [PK_Author] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[Book]...';


GO
CREATE TABLE [dbo].[Book] (
    [Id]          INT           NOT NULL,
    [Title]       NVARCHAR (50) NOT NULL,
    [ReleaseDate] DATE          NULL,
    [Rating]      FLOAT (53)    NULL,
    [PageCount]   INT           NULL,
    CONSTRAINT [PK_Book] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Выполняется создание [dbo].[BookAuthor]...';


GO
CREATE TABLE [dbo].[BookAuthor] (
    [BookId]   INT NOT NULL,
    [AuthorId] INT NOT NULL
);


GO
PRINT N'Выполняется создание [dbo].[FK_BookAuthor_Author]...';


GO
ALTER TABLE [dbo].[BookAuthor]
    ADD CONSTRAINT [FK_BookAuthor_Author] FOREIGN KEY ([AuthorId]) REFERENCES [dbo].[Author] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[FK_BookAuthor_Book]...';


GO
ALTER TABLE [dbo].[BookAuthor]
    ADD CONSTRAINT [FK_BookAuthor_Book] FOREIGN KEY ([BookId]) REFERENCES [dbo].[Book] ([Id]);


GO
PRINT N'Выполняется создание [dbo].[USPAuthorDelete]...';


GO
CREATE PROCEDURE [dbo].[USPAuthorDelete]
    @param1 int = 0,
    @param2 int
AS
    SELECT @param1, @param2
RETURN 0
GO
PRINT N'Выполняется создание [dbo].[USPAuthorInsert]...';


GO
CREATE PROCEDURE [dbo].[USPAuthorInsert]
    @param1 int = 0,
    @param2 int
AS
    SELECT @param1, @param2
RETURN 0
GO
PRINT N'Выполняется создание [dbo].[USPBookAuthorInsert]...';


GO
CREATE PROCEDURE [dbo].[USPBookAuthorInsert]
    @param1 int = 0,
    @param2 int
AS
    SELECT @param1, @param2
RETURN 0
GO
PRINT N'Выполняется создание [dbo].[USPBookDelete]...';


GO
CREATE PROCEDURE [dbo].[USPBookDelete]
    @param1 int = 0,
    @param2 int
AS
    SELECT @param1, @param2
RETURN 0
GO
PRINT N'Выполняется создание [dbo].[USPBookInsert]...';


GO
CREATE PROCEDURE [dbo].[USPBookInsert]
    @param1 int = 0,
    @param2 int
AS
    SELECT @param1, @param2
RETURN 0
GO
PRINT N'Выполняется создание [dbo].[USPGetAuthor]...';


GO
CREATE PROCEDURE [dbo].[USPGetAuthor]
    @param1 int = 0,
    @param2 int
AS
    SELECT @param1, @param2
RETURN 0
GO
PRINT N'Выполняется создание [dbo].[USPGetBook]...';


GO
CREATE PROCEDURE [dbo].[USPGetBook]
    @param1 int = 0,
    @param2 int
AS
    SELECT @param1, @param2
RETURN 0
GO
PRINT N'Выполняется создание [dbo].[USPUpdateAuthor]...';


GO
CREATE PROCEDURE [dbo].[USPUpdateAuthor]
    @param1 int = 0,
    @param2 int
AS
    SELECT @param1, @param2
RETURN 0
GO
PRINT N'Выполняется создание [dbo].[USPUpdateBook]...';


GO
CREATE PROCEDURE [dbo].[USPUpdateBook]
    @param1 int = 0,
    @param2 int
AS
    SELECT @param1, @param2
RETURN 0
GO
/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
DECLARE @BooksToInsert TABLE
                     ( 
                     [Id]      INT           NOT NULL,
					 [Title]       NVARCHAR (50) NOT NULL,
					 [ReleaseDate] DATE          NULL,
					 [Rating]      FLOAT (53)    NULL,
					 [PageCount]   INT           NULL
                     ); 

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
SELECT [bi].Id,
		[bi].[Title],
		[bi].[ReleaseDate],
		[bi].[Rating],
		[bi].[PageCount]
FROM @BooksToInsert AS [bi]
     LEFT JOIN [Book] AS [b] ON [bi].[Id] = [b].[Id]
WHERE [b].[Id] IS NULL
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
SELECT [ai].[Id],
		[ai].[FirstName],
		[ai].[LastName],
		[ai].[BooksCount]
FROM @AuthorsToInsert AS [ai]
     LEFT JOIN [Author] AS [a] ON [ai].[Id] = [a].[Id]
WHERE [a].[Id] IS NULL
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
GO

GO
DECLARE @VarDecimalSupported AS BIT;

SELECT @VarDecimalSupported = 0;

IF ((ServerProperty(N'EngineEdition') = 3)
    AND (((@@microsoftversion / power(2, 24) = 9)
          AND (@@microsoftversion & 0xffff >= 3024))
         OR ((@@microsoftversion / power(2, 24) = 10)
             AND (@@microsoftversion & 0xffff >= 1600))))
    SELECT @VarDecimalSupported = 1;

IF (@VarDecimalSupported > 0)
    BEGIN
        EXECUTE sp_db_vardecimal_storage_format N'$(DatabaseName)', 'ON';
    END


GO
PRINT N'Обновление завершено.';


GO
