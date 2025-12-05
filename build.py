from jinja2 import Environment, FileSystemLoader

from pathlib import Path


def clone_folder(
    target: Path,
    destination: Path,
):
    destination.mkdir(exist_ok=True)

    for file in target.iterdir():
        new_file = destination / file.name
        content = file.read_bytes()
        new_file.write_bytes(content)


# Ensuring the dist folder is created
dist = Path.cwd() / "dist"
dist.mkdir(exist_ok=True)

# Render html page
env = Environment(loader = FileSystemLoader(Path.cwd() / "content"))
page = env.get_template('main.html')
with (dist / "index.html").open("w") as file:
    file.write(page.render())

# Moving styling
clone_folder(Path.cwd() / "styling", dist / "styling")

# Moving scripts
clone_folder(Path.cwd() / "scripts", dist / "scripts")