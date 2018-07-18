CREATE TABLE [dbo].[Book] (
    [BookId]      INT           NOT NULL,
    [Title]       NVARCHAR (50) NOT NULL,
    [ReleaseDate] DATE          NULL,
    [Rating]      FLOAT (53)    NULL,
    [PageCount]   INT           NULL,
    CONSTRAINT [PK_Book] PRIMARY KEY CLUSTERED ([BookId] ASC)
);

