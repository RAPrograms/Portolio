// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
       	turnstile?: {
			render: (
				target: string,
				options: {
					sitekey: string,
					callback?: (token: string) => void
				}
			) => string
			reset: (id: string) => void
		}
    }

	interface Project{
		title: string
		description: string
		tags: Array<Stack>
		type: string | Array<string>
		languages: Array<string>
		preview_uri?: string
		code_url?: string
		demo_url?: string
	}

	interface FeaturedProject extends Project {
		project: Project
		caption: string
		theme: string
	}

	type ProjectThemes = 
        "Deep Forest" | 
        "Midnight Nebula" |
        "Ocean Trench" |
        "Desert Dusk" |
        "Arctic Berry"
}

export {};
