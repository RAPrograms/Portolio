<script lang="ts">
    import type { ProjectType, Stack } from "../lib/enums";
    import type { Snippet } from "svelte";

    import RightArrowIcon from "$icons/right-line-arrow.svg?raw"

    const {
        title,
        children,                 // The description text (provided within the component tags)
        tags,        
        
        preview_size = "desktop", // The device type the preview image is
        preview_img,              // A image string
        caption,                  // The text on the preview card
        
        demo_url,                 // The URL to the live demo
        repo_url,                 // The optional url to the git repo
    }:{
        title: string,
        children: Snippet,
        tags: Array<Stack | ProjectType>,
        preview_size: "desktop" | "mobile",
        preview_img: string,
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
                background: linear-gradient(188deg,rgba(8, 57, 38, 1) 30%, rgba(5, 150, 105, 1) 68%, rgba(52, 211, 153, 1) 90%, rgba(249, 215, 147, 1) 100%);
                grid-template-columns: 1fr min-content; 
                grid-template-rows: max-content 1fr; 
                container-type: inline-size;
                box-sizing: border-box;
                grid-auto-columns: 1fr; 
                aspect-ratio: 16 / 10;
                border-radius: 25px;
                overflow: hidden;
                padding: 20px;
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
                    padding-left: 1.8cqw;
                    grid-area: Caption;
                    color: #00D492;
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
                    color: #00D492;
                    display: grid;

                    & > :global(svg){
                        height: 4cqw;
                    }
                }
                
                // Preview styling
                & > img{
                    transition: 200ms ease-in all;
                    border-radius: 10px;
                    grid-area: Preview;
                    margin: auto;

                    &[data-preview-type=desktop]{ width: 95%; }
                    &[data-preview-type=mobile]{ width: 23%; }
                }

                // Preview image positioning
                &:not(:is(:focus, :focus-within, :hover)) > img{
                    rotate: -5.9deg;
                    translate: 0 20%;
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
                width: 90%;
                text-align: center;
                align-items: center;
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