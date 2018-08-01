﻿/*
Deployment script for BS.DB

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "BS.DB"
:setvar DefaultFilePrefix "BS.DB"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
/*
The column [dbo].[Author].[AuthorId] is being dropped, data loss could occur.

The column [dbo].[Author].[Id] on table [dbo].[Author] must be added, but the column has no default value and does not allow NULL values. If the table contains data, the ALTER script will not work. To avoid this issue you must either: add a default value to the column, mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.
*/

IF EXISTS (select top 1 1 from [dbo].[Author])
    RAISERROR (N'Rows were detected. The schema update is terminating because data loss might occur.', 16, 127) WITH NOWAIT

GO
PRINT N'Dropping [dbo].[FK_BookAuthor_Author]...';


GO
ALTER TABLE [dbo].[BookAuthor] DROP CONSTRAINT [FK_BookAuthor_Author];


GO
PRINT N'Starting rebuilding table [dbo].[Author]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [dbo].[tmp_ms_xx_Author] (
    [Id]         INT           NOT NULL,
    [FirstName]  NVARCHAR (50) NOT NULL,
    [LastName]   NVARCHAR (50) NOT NULL,
    [BooksCount] INT           NULL,
    CONSTRAINT [tmp_ms_xx_constraint_PK_Author1] PRIMARY KEY CLUSTERED ([Id] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [dbo].[Author])
    BEGIN
        INSERT INTO [dbo].[tmp_ms_xx_Author] ([FirstName], [LastName], [BooksCount])
        SELECT [FirstName],
               [LastName],
               [BooksCount]
        FROM   [dbo].[Author];
    END

DROP TABLE [dbo].[Author];

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_Author]', N'Author';

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_constraint_PK_Author1]', N'PK_Author', N'OBJECT';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Creating [dbo].[FK_BookAuthor_Author]...';


GO
ALTER TABLE [dbo].[BookAuthor] WITH NOCHECK
    ADD CONSTRAINT [FK_BookAuthor_Author] FOREIGN KEY ([AuthorId]) REFERENCES [dbo].[Author] ([Id]);


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
		(2, 'Harry Potter and the Philosophers Stone', convert(DATE, '26-06-1997'), 4.9, 223),
		(3, 'Harry Potter and the Prisoner of Azkaban', convert(DATE, '08-07-1999'), 4.7, 317),
		(4, 'The Fellowship of the Ring', convert(DATE, '29-07-1954'), 5, 423),
		(5, 'The Two Towers', convert(DATE, '11-11-1954'), 4.9, 352),
		(6, 'The Return of the King', convert(DATE, '20-10-1955'), 4.8, 416),
		(7, 'A Game of Thrones', convert(DATE, '01-08-1996'), 5, 694),
		(8, 'A Clash of Kings', convert(DATE, '01-03-1997'), 4.9, 768),
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
PRINT N'Checking existing data against newly created constraints';


GO
USE [$(DatabaseName)];


GO
ALTER TABLE [dbo].[BookAuthor] WITH CHECK CHECK CONSTRAINT [FK_BookAuthor_Author];


GO
PRINT N'Update complete.';


GO