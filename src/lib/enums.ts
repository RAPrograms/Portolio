export const ProjectTypes = Object.freeze({
    fullstack: "Full-Stack",
    frontend: "Front-End",
    backend: "Back-End",
    web: "Websites",
    mobile: "Mobile Apps",
    devops: "Cloud & DevOps",
    tools: "CLI & Tooling"
} as const)


export const Langauages = Object.freeze({
    html: "HTML",
    css: "CSS",
    scss: "SCSS",
    javascript: "JavaScript",
    typescript: "TypeScript",
    python: "Python",
    java: "Java",
    rust: "Rust",
    go: "Go"
} as const)


export const Technologies = Object.freeze({
    // Libraries
    htmx: "HTMX",
    svelte: "Svelte",
    jinja2: "Jinja2",
    sqlalcamy: "SQLAlcamy",
    stripe: "Stripe",

    // Databases
    sqlite: "SQLite",
    mongodb: "MongoDB",

    // Cloudflare services
    cloudflare_workers: "Cloudflare Workers",
    cloudflare_dos: "Durable Objects [cloudflare]",

    // Miscellaneous
    nginx: "Nginx",
    docker: "Docker",
    pwa: "PWA"
})

export const Frameworks = Object.freeze({
    fastapi: "FastAPI",
    sveltekit: "SvelteKit [svelte]"
})

export const Tools = Object.freeze({
    figma: "Figma",
    vscode: "VSCode",
    gemini: "Gemini AI",
    claude: "Claude AI"
})

export type Stack = typeof Langauages | typeof Technologies | typeof Frameworks | typeof Tools