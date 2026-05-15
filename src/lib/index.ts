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

export function get_project_image_uri(data: Project | FeaturedProject){
    if(data.image_uri)
    https://opengraph.githubassets.com/1/<GithubUsername>/<RepoName>
}