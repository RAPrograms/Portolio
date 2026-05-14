-- Purge existing tables --
DROP TABLE IF EXISTS projects;


-- Create tables --
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(20) NOT NULL,

    -- The code will use the github opengraph api if null
    image_uri TEXT,

    repository_url TEXT,
    demo_url TEXT,
    tags JSON
);