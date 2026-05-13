export enum Langauages {
    html = "HTML",
    css = "CSS",
    scss = "SCSS",
    javascript = "JavaScript",
    typescript = "TypeScript",
    python = "Python",
    java = "Java",
    rust = "Rust",
    go = "Go"
}

export enum Technologies {
    // Libraries
    htmx = "HTMX",
    svelte = "Svelte",
    jinja2 = "Jinja2",
    sqlalcamy = "SQLAlcamy",
    stripe = "Stripe",

    // Databases
    sqlite = "SQLite",
    mongodb = "MongoDB",

    // Cloudflare services
    cloudflare_workers = "Cloudflare Workers",
    cloudflare_dos = "Durable Objects [cloudflare]",


    // Miscellaneous
    nginx = "Nginx",
    docker = "Docker",
    pwa = "PWA"
}

export enum Frameworks {
    fastapi = "FastAPI",
    sveltekit = "SvelteKit [svelte]"
}

export enum Tools {
    figma = "Figma",
    vscode = "VSCode",
    gemini = "Gemini AI",
    claude = "Claude AI"
}

export type Stack = Langauages | Technologies | Frameworks | Tools


export enum ProjectType {
    cli = "CLI",
    web = "Web App [website]",
    app = "App"
}