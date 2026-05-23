-- Disable foreign key constraints
PRAGMA foreign_keys = OFF;

-- Drop child table first, then parent
DROP TABLE IF EXISTS featured_projects;
DROP TABLE IF EXISTS projects;

-- Re-enable constraints
PRAGMA foreign_keys = ON;


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

CREATE TABLE featured_projects (
    project_id INTEGER PRIMARY KEY,
    caption VARCHAR(52),
    theme VARCHAR(100),

    FOREIGN KEY (project_id) REFERENCES projects(id)
)