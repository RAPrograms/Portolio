<header>
    <nav>
        <a href="/">
            <img src="/logos/primary.svg" alt="RAPrograms Logo">
        </a>

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


            & > ul.links{
                list-style-type: none;
                display: flex;
                gap: 10px;

                a{
                    color: var(--secondary-text-colour);
                    text-decoration: none;
                }
            }
        }
    }
</style>