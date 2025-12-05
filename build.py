from jinja2 import Environment, FileSystemLoader
from pathlib import Path

# Ensuring the dist folder is created
dist = Path.cwd() / "dist"
dist.mkdir(exist_ok=True)

# Render html page
env = Environment(loader = FileSystemLoader('content'))
page = env.get_template('main.html')
with (dist / "index.html").open("w") as file:
    file.write(page.render())