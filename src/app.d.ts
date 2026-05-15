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

	interface Project{
		title: string
		description: string
		tags: Array<Stack>
		image_uri: string
		type: string | Array<string>

		repository_url?: string
		demo_url?: string
	}
}

export {};
