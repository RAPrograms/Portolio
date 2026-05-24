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
    if(data.preview_uri)
        return data.preview_uri

    if(data.code_url && data.code_url.startsWith("https://github.com/")){
       const repository_name = data.code_url.replace("https://github.com/", "")
       return "https://opengraph.githubassets.com/1/" + repository_name
    }

    console.error(`Unable to load an image for "${data.title}"`)
    return 'https://placeimg.dev/1600x900?text=Unable+to+Load&textColor=ffffff&gradient=DF3A3A,f57387'
}