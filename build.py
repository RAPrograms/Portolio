from jinja2 import Environment, FileSystemLoader

from pathlib import Path

# Ensuring the dist folder is created
dist = Path.cwd() / ".dist"
dist.mkdir(exist_ok=True)

# Render html page
env = Environment(loader = FileSystemLoader(Path.cwd() / "content"))
page = env.get_template('main.html')
with (dist / "index.html").open("w") as file:
    file.write(page.render())


# Copy scripts, styling and public files to dist
for folder in ["styling", "scripts", "public"]:
    from_dir = Path.cwd() / folder
    to_dir = dist / folder

    to_dir.mkdir(exist_ok=True)

    for file in from_dir.iterdir():
        new_file = to_dir / file.name
        content = file.read_bytes()
        new_file.write_bytes(content)