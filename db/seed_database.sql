CREATE TABLE authors (
    id     uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

CREATE TABLE books (
    id               uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    publication_date INTEGER      NOT NULL,
    authorId         uuid         NOT NULL REFERENCES authors(id)
);

INSERT INTO authors (id, first_name, last_name)
VALUES
    ('8a3b2454-2d7e-496e-ae19-1d1f21a45d0f', 'Frank', 'Herbert'),
    ('778bbcb7-de17-40c7-b339-b7247c75cda1', 'Isaac', 'Asimov'),
    ('0c4d533f-dbf6-42fe-922b-1a195fddf7ae', 'Ray', 'Bradbury'),
    ('0a9096b0-b9b6-40e9-89be-adf756018a12', 'Ursula', 'Le Guin')
RETURNING *;

INSERT INTO books (title, publication_date, authorId)
VALUES
    ('Dune', 1965, '8a3b2454-2d7e-496e-ae19-1d1f21a45d0f'),
    ('Dune Messiah', 1966, '8a3b2454-2d7e-496e-ae19-1d1f21a45d0f'),
    ('Children of Dune', 1976, '8a3b2454-2d7e-496e-ae19-1d1f21a45d0f'),
    ('God Emperor of Dune', 1981, '8a3b2454-2d7e-496e-ae19-1d1f21a45d0f'),
    ('Chapterhouse: Dune', 1985, '8a3b2454-2d7e-496e-ae19-1d1f21a45d0f'),
    ('Heretics of Dune', 1984, '8a3b2454-2d7e-496e-ae19-1d1f21a45d0f'),
    ('Fahrenheit 451', 1953, '0c4d533f-dbf6-42fe-922b-1a195fddf7ae'),
    ('The Veldt', 1950, '0c4d533f-dbf6-42fe-922b-1a195fddf7ae'),
    ('The Martian Chronicles', 1950, '0c4d533f-dbf6-42fe-922b-1a195fddf7ae'),
    ('A Wizard of Earthsea', 1968, '0a9096b0-b9b6-40e9-89be-adf756018a12'),
    ('The Left Hand of Darkness', 1969, '0a9096b0-b9b6-40e9-89be-adf756018a12'),
    ('The Dispossessed: An Ambiguous Utopia', 1974, '0a9096b0-b9b6-40e9-89be-adf756018a12')
RETURNING *;
   