<script lang="ts">
    import { get_project_image_uri } from "$lib";

    import RightArrowIcon from "$icons/right-line-arrow.svg?raw"
    import GithubIcon from "$icons/github.svg?raw"
    import Tag from "../tag.svelte";

    const {
        data,
        theme,
        caption
    }:{
        data: Project,
        theme: ProjectThemes
        caption: string,
    } = $props()
</script>

<article>
    <div class="preview-containor">
        <svelte:element
            data-theme={theme}
            class="preview"
            target="_blank"
            this={(data.demo_url)? "a" : "article"}
            href={data.demo_url}>

            <div class="containor">
                <span class="caption">{caption}</span>
                
                {#if data.demo_url}
                    <div class="icon">{@html RightArrowIcon}</div>
                {/if}
            </div>
            
            <img src={get_project_image_uri(data)} aria-hidden="true" alt="">
        </svelte:element>
    </div>

    <div class="details">
        <h3>
            <span>{data.title}</span>
            {#if data.repository_url}
                <a href="{data.repository_url}" target="_blank">
                    {@html GithubIcon}
                </a>
            {/if}
        </h3>
        <p>{data.description}</p>
        <div class="tags">
            {#each data.tags as tag}
                <Tag value={tag} size="normal" isProjectsLink={true}/>
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
                container-type: inline-size;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                aspect-ratio: 16 / 10;
                border-radius: 25px;
                overflow: hidden;
                padding: var(--padding);
                 

                // Allows preview to stay on screen when scrolling on long descriptions
                top: calc(var(--nav-height) + 20px);
                position: sticky;
                left: 0;

                // Glass like boarder
                border: 10px solid rgba(242, 242, 242, .0471);
                outline: 1px solid rgba(117, 117, 117, .45);
                background-clip: padding-box;

                & > .containor{
                    display: flex;
                    gap: 5px;
                    justify-content: space-between;
                }
                
                .caption{
                    color: var(--colour);
                    padding-left: 1.8cqw;
                    text-align: left;
                    font-size: 4cqw;
                    flex-grow: 1;

                    word-break: break-all;

                    // Forces 2 line captions
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                
                .icon{
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
                    max-height: 76%;
                    margin: auto;
                    left: 50%;
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

                :global(svg){
                    color: white;
                }
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