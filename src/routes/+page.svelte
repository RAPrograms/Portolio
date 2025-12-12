<script>
    import HighlightCard from "../component/highlight-card.svelte";
    import FormField from "../component/form/form-field.svelte";
    import Form from "../component/form/form.svelte";
    import Hero from "../component/hero.svelte";
    import { onMount } from "svelte";
</script>

<Hero flavor_text="Sleep && Eat && Game && Code" cycling_text={[
    "Software Developer",
    "Programmer",
    "Gamer",
    "Coder"
]}>
    Passionate about creating digital software with expertise in <span>web development</span>, <span>back-end systems</span>, and <span>application development</span>.
</Hero>

<main id="main">

    <section id="about">
        <h2>About Me</h2>
        <p>
            Hi there, my name is Reece.
            I am a software developer with a deep passion to create and use all forms of technology,
            from hardware, back-end, front-end, mechanics, cybersecurity and so much more.
        </p>

        <div class="highlights">
            <HighlightCard icon="users" title="Collaboration Award">
                College Values Award for Collaboration & Innovation 2024.
            </HighlightCard>
            <HighlightCard icon="code" title="19,000+ Lines of code">
                Contributed across Python, JavaScript, Java, HTML & CSS projects.
            </HighlightCard>
            <HighlightCard icon="code" title="Student of the Year">
                Recognised as Student of the Year 2024 for excellence.
            </HighlightCard>
        </div>
    </section>

    <div class="section-shape-wrapper">
        <section id="contact">
            <header>
                <h2>Contact Me</h2>
                <p>Let us create magic!</p>
            </header>

            <div>
                <Form>
                    <FormField title="Name" name="name"/>
                    <FormField title="Email" name="email_address" type="email"/>
                    <FormField title="Subject" name="subject"/>
                    <FormField title="What's on your mind?" name="message" kind="textarea"/>
                </Form>

                <aside>
                    <ul>
                        <li>
                            <a href="reece@example.com" aria-label="Email Link">
                                <img src="/icons/email.svg" alt="">
                                <b>Email</b>
                                <div>reece@example.com</div>
                                <img src="/icons/right-line-arrow.svg" alt="">
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com" aria-label="Email Link">
                                <img src="/icons/github.svg" alt="">
                                <b>Github</b>
                                <div>RAPrograms</div>
                                <img src="/icons/right-line-arrow.svg" alt="">
                            </a>
                        </li>
                        <li>
                            <a href="reece@example.com" aria-label="Email Link">
                                <img src="/icons/linkedin.svg" alt="">
                                <b>Linked In</b>
                                <div>RAPrograms</div>
                                <img src="/icons/right-line-arrow.svg" alt="">
                            </a>
                        </li>
                        <hr>
                        <li>
                            <a href="reece@example.com" aria-label="Email Link">
                                <img src="/icons/based-location.svg" alt="">
                                <b>Located</b>
                                <div>Area</div>
                                <img src="/icons/based-location.svg" alt="">
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>
        </section>
    </div>

</main>

<style lang="scss">
    @use "$styling/_variables.scss" as *;

    main{
        flex-direction: column;
        text-align: center;
        display: flex;
        gap: 50px;

        & > div.section-shape-wrapper{
            $background-colour: #1B1B1B;

            background-color: $background-colour;
            position: relative;
            padding: 20px 0;
            margin: 70px 0;


            &::before, &::after{
                background-color: $background-colour;
                position: absolute;
                height: 50px;
                width: 100%;
                content: "";
                left: 0;
            }

            &::before{
                clip-path: polygon(0 0, 100% 100%, 0 100%);
                bottom: 100%;
            }

            &::after{
                clip-path: polygon(0 0, 100% 0, 100% 100%);
                top: 100%;
            }
        }

        & > section, & > div.section-shape-wrapper > section{
            @include center_content();

            scroll-margin-top: calc(var(--nav-height) + 20px);
            gap: 20px;

            &, & > header{
                flex-direction: column;
                align-items: center;
                display: flex;
            }

            & > header{
                gap: 15px;
            }

            & p{
                font-size: 1.3rem;
            }
        }
    }

    section#about{
        & > p{
            width: 80%;
        }

        & > .highlights{
            justify-content: center;
            align-items: center;
            margin-top: 40px;
            flex-wrap: wrap;
            display: flex;
            gap: 2rem;

            & > :global(article){
                max-width: 350px;
                height: 100%;
                flex-grow: 1;
            }
        }
    }

    section#contact > div{
        display: flex;
        width: 80%;
        max-width: 98vw;
        justify-content: center;
        gap: 30px;
        
        @media (width >= 840px) {
            flex-direction: row-reverse;
        }

        @media (width < 840px) {
            flex-direction: column;
        }

        & > :global(form){
            flex: 2;
        }

        & > aside {
            flex: 1;
            width: 100%;

            & > ul{
                flex-direction: column;
                display: flex;
                gap: 20px;

                & > li > a{
                    @include glass-card(15px);

                    grid-template-columns: max-content 1fr max-content; 
                    color: var(--primary-text-colour);
                    grid-template-rows: 1fr 1fr; 
                    align-items: center;
                    text-align: left;
                    display: grid;
                    gap: 3px 10px;
                    grid-template-areas: 
                        "Icon Name Arrow"
                        "Icon Value Arrow";

                    & > img{
                        aspect-ratio: 1/1;
                        width: 100%;
                    }

                    & > img:first-child{
                        grid-area: Icon;
                    }

                    & > b{
                        grid-area: Name;
                    }

                    & > div{
                        grid-area: Value;
                    }

                    & > img:last-child{
                        grid-area: Arrow;
                    }
                }
            }
        }
    }
</style>