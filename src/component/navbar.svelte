<svelte:head>
    <link rel="prefetch" href="/logos/primary.svg" />
</svelte:head>

<a class="accessibility-skip" href="#main">Skip to content</a>

<header>
    <nav>
        <a href="/">
            <img src="/logos/primary.svg" width="79" height="20" alt="RAPrograms Logo">
        </a>

        <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
        <label class="menu-btn" role="button" aria-label="Menu">
            <input type="checkbox">
        </label>

        <ul class="links">
            <li>
                <a href="#about">About</a>
            </li>
            <li>
                <a href="#technology">Technology</a>
            </li>
            <li>
                <a href="#projects">Projects</a>
            </li>
            <li>
                <a href="#contact">Contact</a>
            </li>
        </ul>
    </nav>
</header>


<style lang="scss">
    @use "$styling/_variables.scss" as *;

    $Mobile-Breakpoint: 460px;

    a.accessibility-skip{
        @include fainted-button-tag();

        position: absolute;
        backdrop-filter: blur(20px);
        translate: -50% 0;
        top: 3.5px;
        z-index: 6;
        left: 50%;


        &:not(:is(:focus, :active)){
            opacity: 0;
        }
    }

    header{
        border-bottom: 1px solid var(--secondary-border-colour);
        backdrop-filter: blur(24px);
        height: var(--nav-height);
        position: sticky;
        display: block;
        left: 0;
        z-index: 5;
        top: 0;

        & > nav{
            @include center_content();

            justify-content: space-between;
            align-items: center;
            display: flex;
            height: 100%;

            & *{
                @extend .no-select;
            }

            & > label.menu-btn{
                @media (width <= $Mobile-Breakpoint) {
                    display: block;
                    height: 90%;
                    aspect-ratio: 1/1;
                    background-repeat: no-repeat;
                    background-size: 70%;
                    padding-top: 10px;
                    background-position: center;
                    opacity: .5;
                    cursor: pointer;

                    &:has(input[type=checkbox]:checked){
                        background-image: url("/icons/cross.svg");
                    }

                    &:not(:has(input[type=checkbox]:checked)){
                        background-image: url("/icons/menu.svg");
                    }

                    & > input[type=checkbox]{
                        display: none;
                    }
                }

                @media (width > $Mobile-Breakpoint) {
                    display: none;
                    visibility: hidden;
                }
            }

            @media (width <= $Mobile-Breakpoint) {
                & > label.menu-btn:has(input[type=checkbox]:not(:checked)) ~ ul.links{
                    display: none;
                    visibility: none;
                }
            }

            & > ul.links{
                display: flex;
                gap: 10px;

                @media (width <= $Mobile-Breakpoint) {
                    height: calc(100vh - var(--nav-height));
                    backdrop-filter: blur(24px);
                    background-color: #0e1115e5;
                    flex-direction: column;
                    align-items: center;
                    position: fixed;
                    padding: 30px 0;
                    width: 100vw;
                    top: 100%;
                    gap: 30px;
                    right: 0;
                }

                a{
                    color: var(--secondary-text-colour);
                    transition: 300ms ease-in-out;
                    padding: 0 2.5px;
                    height: 100%;

                    &:last-child{
                        padding-right: 0;
                    }

                    &:hover{
                        color: var(--primary-text-colour);
                    }
                }
            }
        }
    }
</style>