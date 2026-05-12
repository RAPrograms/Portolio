<script lang="ts">
    import RightArrowIcon from "$icons/right-line-arrow.svg?raw"

    import FormField from "$components/form/form-field.svelte";
    import Form from "$components/form/form.svelte";

    import {
        PUBLIC_CONTACT_EMAIL,
        PUBLIC_GITHUB_USERNAME,
        PUBLIC_LINKEDIN_USERNAME,

        PUBLIC_LOCATION_TEXT,
        PUBLIC_LOCATION_URL
    } from '$env/static/public';
</script>

{#snippet details_card(
    icon: string,
    link: string,
    title: string,
    value: string,
    accessibility_label: string
)}
	<li>
        <a href={link} aria-label={accessibility_label} target="_blank">
            <img src="/icons/{icon}.svg" alt="">
            <b>{title}</b>
            <div>{value}</div>
            {@html RightArrowIcon}
        </a>
    </li>
{/snippet}

<section id="contact">
    <header>
        <h2>Contact Me</h2>
        <p>Let us create magic!</p>
    </header>

    <div>
        <Form url="https://submit-form.com/c5LGk94Ui">
            <FormField title="Name" name="name"/>
            <FormField title="Email" name="email_address" type="email"/>
            <FormField title="Subject" name="subject"/>
            <FormField title="What's on your mind?" name="message" kind="textarea"/>
        </Form>

        <aside>
            <ul>
                {@render details_card("email", `mailto:${PUBLIC_CONTACT_EMAIL}`, "Email", PUBLIC_CONTACT_EMAIL, "Email Link")}
                {@render details_card("github", `https://github.com/${PUBLIC_GITHUB_USERNAME}`, "Github", PUBLIC_GITHUB_USERNAME, "Github Link")}
                
                {#if PUBLIC_LINKEDIN_USERNAME != "" && PUBLIC_LINKEDIN_USERNAME != undefined}
                    {@render details_card("linkedin", `https://www.linkedin.com/in/${PUBLIC_LINKEDIN_USERNAME}`, "Linked In", PUBLIC_LINKEDIN_USERNAME, "Linkedin Link")}
                {/if}
                
                {#if PUBLIC_LOCATION_TEXT != "" && PUBLIC_LOCATION_URL != ""}
                    {@render details_card("based-location", PUBLIC_LOCATION_URL, "Located", PUBLIC_LOCATION_TEXT, `Located in ${PUBLIC_LOCATION_TEXT}`)}
                {/if}
            </ul>
        </aside>
    </div>
</section>

<style lang="scss">
    @use "$styling/_variables.scss" as variables;

    section#contact > div{
        justify-content: center;
        max-width: 98vw;
        display: flex;
        width: 80%;
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
            width: 100%;
            flex: 1;

            & > ul{
                flex-direction: column;
                display: flex;
                gap: 20px;

                & > li > a{
                    @include variables.glass-card(15px);

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

                    & > :global(svg):last-child{
                        grid-area: Arrow;
                    }
                }
            }
        }
    }
</style>