<script>
    import GithubIcon from "$icons/github.svg?raw"
    import EyeIcon from "$icons/eye.svg?raw"

    import Tag from "../tag.svelte";

</script>

<article>
    <img src="https://placeimg.dev/1600x900/4F46E5" alt="">

    <h3>Project Title</h3>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor quisquam adipiscing dolores voluptatem totam duis consectetur unde. Cons</p>

    <div class="tags">
        {#each ["Svelte", "Svelte", "Svelte", "Svelte"] as tag}
            <Tag size="small" isProjectsLink={false} value={tag}/>
        {/each}
    </div>

    <div class="links">
        <a href="" target="_blank">
            {@html GithubIcon}
            Code
        </a>

        <div class="seperator"></div>

        <a href="" target="_blank">
            {@html EyeIcon}
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
        max-width: 300px;
        display: flex;
        padding: 10px;
        gap: 20px;

        & > :not(img){
            padding: 0 10px;
        }

        & > img{
            border-radius: 10px;
        }

        & > .tags{
            display: flex;
            gap: 10px;
            flex-wrap: wrap;

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
                display: flex;
                align-items: center;
                gap: 10px;
                color: white;
            }
        }
    }
</style>