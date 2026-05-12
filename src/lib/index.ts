import { PUBLIC_AVAILABILITY } from '$env/static/public';

export function get_project_avalibility(){
    return [
        "true",
        "yes",
        "y"
    ].includes(
        PUBLIC_AVAILABILITY.toLowerCase()
    )
}