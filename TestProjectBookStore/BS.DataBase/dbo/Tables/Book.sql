﻿CREATE TABLE [dbo].[Book] (
    [Id]      INT        IDENTITY(1,1)   NOT NULL,
    [Title]       NVARCHAR (50) NOT NULL,
    [ReleaseDate] DATE          NULL,
    [Rating]      FLOAT (53)    NULL,
    [PageCount]   INT           NULL,
    CONSTRAINT [PK_Book] PRIMARY KEY CLUSTERED ([Id] ASC)
);

