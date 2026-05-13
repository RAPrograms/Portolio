<script lang="ts">
    import type { ProjectType, Stack } from "../lib/enums";
    import type { Snippet } from "svelte";

    import RightArrowIcon from "$icons/right-line-arrow.svg?raw"

    export type Themes = 
        "Deep Forest" | 
        "Midnight Nebula" |
        "Ocean Trench" |
        "Desert Dusk" |
        "Arctic Berry"

    const {
        title,
        children,                  // The description text (provided within the component tags)
        tags,        
        
        preview_size = "desktop",  // The device type the preview image is
        preview_img,               // A image string
        preview_theme,             // The theme used for the text colour and background gradient
        caption,                   // The text on the preview card
        
        demo_url,                  // The URL to the live demo
        repo_url,                  // The optional url to the git repo
    }:{
        title: string,
        children: Snippet,
        tags: Array<Stack | ProjectType>,
        preview_size: "desktop" | "mobile",
        preview_img: string,
        preview_theme: Themes,
        caption: string,
        demo_url?: string,
        repo_url?: string
    } = $props()

    function parseTag(tag: string): [string, string] {
        // Used to identify if any icon overrides are present
        // EG: Sveltekit [svelte] = Name: Sveltekit & Icon: svelte
        const regex = /\s\[.*\]/

        const matches = tag.match(regex)
        if(matches == null)
            return [tag, tag.toLowerCase().replace(" ", "_")]

        const name = tag.replace(regex, "")
        const icon = matches[0].slice(2, -1)

        return [name, icon]
    }
</script>

<article>
    <div class="preview-containor">
        <svelte:element
            data-theme={preview_theme}
            class="preview"
            target="_blank"
            this={(demo_url)? "a" : "article"}
            href={demo_url}>

            <span>{caption}</span>
            
            {#if demo_url}
                <div class="icon">{@html RightArrowIcon}</div>
            {/if}
            
            <img data-preview-type="{preview_size}" src="{preview_img}" aria-hidden="true" alt="">
        </svelte:element>
    </div>

    <div class="details">
        <h3>
            <span>{title}</span>
            {#if repo_url}
                <a href="{repo_url}" target="_blank">
                    <img src="/icons/github.svg" alt="Visit Github Repository">
                </a>
            {/if}
        </h3>
        <p>{@render children()}</p>
        <div class="tags">
            {#each tags as tag}
                {@const [name, icon] = parseTag(tag)}
                
                <a href="/projects?TODO">
                    {#if icon != ""}
                        <img src="/tag-icons/{icon}.svg" height="15" aria-hidden="true" alt="">
                    {/if}
                    {name}
                </a>
            {/each}
        </div>
    </div>

</article>



<style lang="scss">
    $breakpoint: 850px;

    article {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        margin: 20px 0;

        @media (width <= $breakpoint) {
            flex-direction: column-reverse;
            align-items: center;
        }

        .preview-containor{
            flex-grow: 3;

            @media (width <= $breakpoint) {
                width: 90%;
            }

            .preview{
                // Defining preview themes
                &[data-theme="Deep Forest"]{
                    --colour: #00D492; 
                    --gradient: linear-gradient(188deg,rgba(8, 57, 38, 1) 30%, rgba(5, 150, 105, 1) 68%, rgba(52, 211, 153, 1) 90%, rgba(249, 215, 147, 1) 100%);
                }

                &[data-theme="Midnight Nebula"]{
                    --colour: rgba(139, 92, 246, 1); 
                    --gradient: linear-gradient(188deg, rgba(15, 23, 42, 1) 30%, rgba(88, 28, 135, 1) 68%, rgba(139, 92, 246, 1) 90%, rgba(244, 114, 182, 1) 100%);
                }

                &[data-theme="Ocean Trench"]{
                    --colour: rgba(56, 189, 248, 1); 
                    --gradient: linear-gradient(188deg, rgba(8, 47, 73, 1) 30%, rgba(3, 105, 161, 1) 68%, rgba(56, 189, 248, 1) 90%, rgba(186, 230, 253, 1) 100%);
                }

                &[data-theme="Desert Dusk"]{
                    --colour: rgba(249, 115, 22, 1); 
                    --gradient: linear-gradient(188deg, rgba(67, 20, 7, 1) 30%, rgba(154, 52, 18, 1) 68%, rgba(249, 115, 22, 1) 90%, rgba(253, 186, 116, 1) 100%);
                }

                &[data-theme="Arctic Berry"]{
                    --colour: rgba(45, 212, 191, 1); 
                    --gradient: linear-gradient(188deg, rgba(31, 41, 55, 1) 30%, rgba(13, 148, 136, 1) 68%, rgba(45, 212, 191, 1) 90%, rgba(251, 207, 232, 1) 100%);
                }

                // Main preview styling
                --padding: 20px;

                background: var(--gradient);
                grid-template-columns: 1fr min-content; 
                grid-template-rows: max-content 1fr; 
                container-type: inline-size;
                box-sizing: border-box;
                grid-auto-columns: 1fr; 
                aspect-ratio: 16 / 10;
                border-radius: 25px;
                overflow: hidden;
                padding: var(--padding);
                display: grid; 
                gap: 20px 5px; 
                grid-template-areas: 
                    "Caption Icon"
                    "Preview Preview"; 

                // Allows preview to stay on screen when scrolling on long descriptions
                top: calc(var(--nav-height) + 20px);
                position: sticky;
                left: 0;

                // Glass like boarder
                border: 10px solid rgba(242, 242, 242, .0471);
                outline: 1px solid rgba(117, 117, 117, .45);
                background-clip: padding-box;

                //Caption
                & > span{
                    color: var(--colour);
                    padding-left: 1.8cqw;
                    grid-area: Caption;
                    text-align: left;
                    font-size: 4cqw;

                    // Forces 2 line captions
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                
                & > .icon{
                    place-items: center;
                    margin-right: 4cqw;
                    color: var(--colour);
                    display: grid;

                    & > :global(svg){
                        height: 4cqw;
                    }
                }
                
                // Preview styling
                & > img{
                    bottom: calc(var(--padding) * -1);
                    transition: 200ms ease-in all;
                    border-radius: 10px;
                    position: absolute;
                    grid-area: Preview;
                    translate: -50% 0;
                    margin: auto;
                    left: 50%;

                    &[data-preview-type=desktop]{ width: 95%; }
                    &[data-preview-type=mobile]{ width: 23%; }
                }

                // Preview image positioning
                &:not(:is(:focus, :focus-within, :hover)) > img{
                    translate: -50% 20%;
                    rotate: -5.9deg;
                    opacity: .8;
                }
            }

        }

        // Infomation
        & > .details{
            flex-direction: column;
            text-align: left;
            display: flex;
            flex-grow: 2;
            gap: 20px;

            @media (width > $breakpoint) {
                max-width: 30%;
            }

            @media (width <= $breakpoint) {
                align-items: center;
                text-align: center;
                width: 90%;
            }


            & > h3{
                align-items: center;
                display: flex;
                gap: 20px;
            }

            p {
                color: #7B899D;
            }

            .tags{
                flex-wrap: wrap;
                display: flex;
                gap: 10px;

                @media (width <= $breakpoint) {
                    justify-content: center;
                }

                & > a{
                    outline: 1px solid rgba(117, 117, 117, .45);
                    background: rgba(242, 242, 242, .0471);
                    transition: background-color 200ms ease;
                    align-items: center;
                    border-radius: 25px;
                    color: white;
                    padding: 10px;
                    display: flex;
                    gap: 10px;

                    &:is(:active, :focus, :hover){
                        background-color: rgba(255, 255, 255, 0.345);
                    }
                }
            }
        }
    }
</style>