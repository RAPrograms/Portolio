import type { LayoutServerLoad } from "./$types";

export const prerender = true;
export const trailingSlash = 'always';

// Loading all tags which have images 
export const load: LayoutServerLoad = async () => {
    const validIcons = new Set(
        Object.keys(import.meta.glob('/static/tag-icons/*.svg', { eager: true }))
        .map(path => path.replace("/static/tag-icons/", "")
            .replace(".svg", "")
            .toLowerCase()
        )
    )
    
	return { validIcons };
};