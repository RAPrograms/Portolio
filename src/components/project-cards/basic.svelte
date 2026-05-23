<script lang="ts">
    import { get_project_image_uri } from "$lib";
    
    import Tag from "../tag.svelte";

    const {
        data,
        ghosted = false
    }:{
        data: Project,
        ghosted: boolean
    } = $props()
</script>

<article class:ghosted={ghosted}>
    <div class="image-containor">
        <img src={get_project_image_uri(data)} alt="Project Preview" loading="lazy">
    </div>

    <h3>{data.title}</h3>

    <p>{data.description}</p>

    <div class="tags">
        {#each data.tags as tag}
            <Tag size="small" isProjectsLink={false} value={tag}/>
        {/each}
    </div>

    <div class="links">
        <a href={data.repository_url} target="_blank" tabindex={ghosted? -1:undefined}>
            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#github-icon"/></svg>
            Code
        </a>

        <div class="seperator"></div>

        <a href={data.demo_url} target="_blank" tabindex={ghosted? -1:undefined}>
            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#eye-icon"/></svg>
            Demo
        </a>
    </div>
</article>

<style lang="scss">
    article{
        outline: 1px solid rgba(117, 117, 117, .45);
        background-color: rgba(242, 242, 242, .0471);
        flex-direction: column;
        border-radius: 20px;
        max-width: 460px;
        display: flex;
        padding: 10px;
        gap: 20px;

        &.ghosted{
            filter: grayscale(100%);
            opacity: .5;
        }

        .image-containor{
            background-color: #292929;
            justify-content: center;
            border-radius: 10px;
            position: relative;
            aspect-ratio: 16/9;
            overflow: hidden;
            display: flex;
            width: 100%;

            img{
                object-fit: contain;
                max-height: 100%;
                max-width: 100%;
            }
        }

        & > :not(:first-child){
            padding: 0 10px;
        }


        & > .tags{
            flex-wrap: wrap;
            display: flex;
            flex-grow: 1;
            gap: 10px;

            & > :global(.tag) > :global(img){
                height: 10px;
            }

            & > :global(.tag){
                font-size: small;
            }
        }

        & > .links{
            justify-content: space-evenly;
            align-items: center;
            display: flex;

            .seperator{
                background-color: var(--primary-border-colour);
                border-radius: 10px;
                align-self: stretch;
                opacity: .7;
                width: 1px;
            }

            a{
                align-items: center;
                color: white;
                display: flex;
                gap: 10px;

                &[href=""], &:not([href]){
                    pointer-events: none;
                    cursor: unset;
                    color: grey;
                    opacity: .6;
                }
            }
        }
    }
</style>