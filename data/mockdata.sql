INSERT INTO projects (title, description, languages, type, image_uri, repository_url, demo_url, tags)
VALUES
("Hangman", "A simple word based guessing game", '["javascript", "html", "css", "typescript", "svelte"]', '["web","frontend"]', "https://github.com/user-attachments/assets/68e27d59-8b54-4bde-bc17-0174edcf9873", "https://github.com/RAPrograms/Hangman", "https://raprograms.github.io/Hangman/", '["Svelte"]'),
("Weather App", "A simple wether app in KMP", '["java", "kotlin"]', 'mobile', "https://placeimg.dev/400x300/4F46E5", null, null, '["Svelte"]');


INSERT INTO featured_projects (project_id, caption, theme)
VALUES
(1, "A simple word based guessing game", "Arctic Berry"),
(2, "A simple KMP weather app", "Deep Forest");