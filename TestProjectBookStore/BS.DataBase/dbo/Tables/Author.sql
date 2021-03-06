﻿CREATE TABLE [dbo].[Author] (
    [Id]   INT     IDENTITY(1,1)      NOT NULL,
    [FirstName]  NVARCHAR (50) NOT NULL,
    [LastName]   NVARCHAR (50) NOT NULL,
    [BooksCount] INT           NULL,
    CONSTRAINT [PK_Author] PRIMARY KEY CLUSTERED ([Id] ASC)
);

