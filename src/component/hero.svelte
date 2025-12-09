<script lang="ts">
    import type { Snippet } from "svelte";
    import Typewritertext from "./typewritertext.svelte";

    const {
        children,
        flavor_text,
        return_btn = false,
        cycling_text = [],
        availability_notice = false
    } : {
        flavor_text: string,
        return_btn: boolean,
        cycling_text: Array<string>,
        availability_notice: boolean,
        children: Snippet
    } = $props()
</script>

<section class="hero">
    {#if return_btn}
        <a href="/" class="return">
            <img src="/icons/left-arrow.svg" alt="">
            <span>Return to homepage</span>
        </a>
    {:else}
        <div></div>
    {/if}

    <div class="content">
        <p class="flavor-text">$ {flavor_text}</p>

        <h1>
            <div>reece@raprograms:~$</div>
            <div>whoami</div>
        </h1>

        {#if cycling_text.length > 0}
            <div class="attributes">
                <Typewritertext lines={cycling_text}/>
            </div>
        {/if}

        <p class="description">
            {@render children()}
        </p>
    </div>
    
    {#if availability_notice}
        <div class="availability-tag">Available for projects</div>
    {/if}

    <a href="#main">
        <img src="/icons/circled-down-arrow.svg" alt="Continue to main content">
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
        background-size: 40px 40px;
        background-position: -1px -1px;
        background-image:
            linear-gradient(to right, var(--grid-colour) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-colour) 1px, transparent 1px);

        @media (width <= 570px) {
            & > div:first-of-type{
                display: none;
            }
        }

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
        }

        & > a.return{
            @include fainted-button-tag();

            margin: 0 0 0 max(calc((100vw - var(--max-content-width)) / 2), 0px);

            & > span{
                translate: 0 2px;
            }
        }

        & > .content{
            text-align: center;
            width: min-content;

            & > p.flavor-text{
                line-height: 1.5rem;
                margin-bottom: 20px;
                font-size: 1.2rem;
                color: #C76969;
            }

            & > h1{
                font-size: clamp(2rem,8vw,4rem);
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

            & > .description{
                margin-top: 30px;
                font-size: clamp(0.9rem,3vw,1.3rem);
                color: var(--secondary-text-colour);

                & > :global(span){
                    color: var(--primary-text-colour);
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
                animation-delay: 1s;
                animation-duration: 4.5s;
                translate: 45% 30px;
                right: 0;
                opacity: 0.3;

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