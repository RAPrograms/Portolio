<script lang="ts">
    import type { Snippet } from "svelte";

    import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';

    const {
        title,
        flavorText,
        backURL,
        children,
        notice
    }:{
        title: string
        flavorText: string,
        backURL?: string,
        children?: Snippet,
        notice?: Snippet,
    } = $props()
</script>

<section class="hero">
    {#if backURL}
        <a href="{backURL}" class="return">
            <img src="/icons/left-arrow.svg" alt="">
            <span>Back</span>
        </a>
    {:else}
        <div></div>
    {/if}

    <div class="content">
        <section>
            <p class="flavor-text">$ {flavorText}</p>

            <h1>
                <div>reece@{PUBLIC_GITHUB_USERNAME.toLowerCase()}:~$</div>
                <div>{title}</div>
            </h1>
        </section>

        {#if children}
            {@render children()}
        {/if}
    </div>

    {#if notice}
        {@render notice()}
    {/if}

    <a href="#main">
        <img src="/icons/circled-down-arrow.svg" width="42" height="42" alt="Continue to main content">
    </a>

    <div class="pulses"></div>
</section>

<style lang="scss">
    @use "$styling/_variables.scss" as *;

    section.hero{
        --grid-colour: color-mix(in hsl shorter hue, var(--secondary-border-colour) 50%, transparent);
        --bottom-gap: 30px;

        height: calc(100vh - var(--nav-height));
        margin-bottom: var(--bottom-gap);
        justify-content: space-evenly;
        flex-direction: column;
        align-items: center;
        isolation: isolate;
        position: relative;
        overflow: hidden;
        display: flex;
        gap: 20px;

        // Adds background grid
        background-position: -1px -1px;
        background-size: 40px 40px;
        background-image:
            linear-gradient(to right, var(--grid-colour) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-colour) 1px, transparent 1px);

        &::after{
            background: linear-gradient(transparent, var(--background-colour));
            height: var(--bottom-gap);
            position: absolute;
            translate: 0 20%;
            content: "";
            width: 100%;
            bottom: 0;
        }

        & > *{
            @include center_content();
            @extend %no-select
        }

        & > a.return{
            @include fainted-button-tag();

            margin-left: max(calc((100vw - var(--max-content-width)) / 2), 10px);

            & > span{
                translate: 0 2px;
            }
        }

        & > .content{
            display: flex;
            flex-direction: column;
            gap: 20px;
            text-align: center;
            width: min-content;

            & p.flavor-text{
                font-size: clamp(.8rem,4vw,1.2rem);
                line-height: 1.5rem;
                margin-bottom: 20px;
                color: #C76969;
            }

            h1{
                font-size: clamp(.8rem,8vw,4rem);
                word-break: keep-all;
                margin-bottom: 10px;
                text-align: center;
                font-weight: 800;
                line-height: 1.1;

                & > :nth-child(2){
                    background-image: linear-gradient(90deg, #DF3A3A, #f57387);
                    background-clip: text;
                    color: transparent;
                    margin-top: .5rem;
                }
            }
        }

        & > .pulses{
            padding: 0 !important;
            margin: 0 !important;
            pointer-events: none;
            position: absolute;
            height: 24rem;
            width: 100vw;
            opacity: .8;
            z-index: -1;

            &::before, &::after{
                background-color: color-mix(in hsl shorter hue, var(--primary-colour) 10%, transparent);
                will-change: opacity, filter;
                border-radius: 100%;
                filter: blur(80px);
                position: absolute;
                aspect-ratio: 1/1;
                height: 100%;
                content: "";

                @media (prefers-reduced-motion: none) {
                    animation: pulse 3s ease-in-out infinite alternate;
                }
            }

            &::before{
                translate: -45% -30px;
                left: 0;
            }

            &::after{
                animation-duration: 4.5s;
                animation-delay: 1s;
                translate: 45% 30px;
                opacity: 0.3;
                right: 0;

                @media (width < 530px) {
                    display: none;
                }
            }
        }
    }

    @keyframes pulse{
        from {
            opacity: 0.3;
        }
        to{
            opacity: 1;
        }
    }
</style>