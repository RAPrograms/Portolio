<script lang="ts">
    import RightArrowIcon from "$icons/right-line-arrow.svg?raw"
    import LocationIcon from "$icons/based-location.svg?raw"
    import LinkedInIcon from "$icons/linkedin.svg?raw"
    import GithubIcon from "$icons/github.svg?raw"
    import EmailIcon from "$icons/email.svg?raw"

    import {
        PUBLIC_CONTACT_EMAIL,
        PUBLIC_GITHUB_USERNAME,
        PUBLIC_LINKEDIN_USERNAME,

        PUBLIC_LOCATION_TEXT,
        PUBLIC_LOCATION_URL
    } from '$env/static/public';
    import { onMount } from "svelte";

    let jsEnabled = $state(false)

    onMount(() => jsEnabled = true)
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
            {@html icon}
            <b>{title}</b>
            <div>{value}</div>
            {@html RightArrowIcon}
        </a>
    </li>
{/snippet}


<div class="contact-methods">
    <!--<Form url="https://submit-form.com/c5LGk94Ui">
        <FormField title="Name" name="name"/>
        <FormField title="Email" name="email_address" type="email"/>
        <FormField title="Subject" name="subject"/>
        <FormField title="What's on your mind?" name="message" kind="textarea"/>
    </Form>-->
    <form action="mailto:your-email@example.com?subject=Inquiry" method="post" enctype="text/plain">
        
        <noscript>Without JavaScript enabled, this form will attempt to open your email client on submit</noscript>

        <label>
            <div>Name</div>
            <input type="text" name="name" required>
        </label>

        {#if jsEnabled}
            <label>
                <div>Email</div>
                <input type="email" name="email" required>
            </label>
        {/if}
    
        <label>
            <div>What's on your mind?</div>
            <textarea id="message" name="message" required></textarea>
        </label>

        <button type="submit">Open email client</button>
    </form>

    <aside>
        <ul>
            {@render details_card(EmailIcon, `mailto:${PUBLIC_CONTACT_EMAIL}`, "Email", PUBLIC_CONTACT_EMAIL, "Email Link")}
            {@render details_card(GithubIcon, `https://github.com/${PUBLIC_GITHUB_USERNAME}`, "Github", PUBLIC_GITHUB_USERNAME, "Github Link")}
            
            {#if PUBLIC_LINKEDIN_USERNAME != "" && PUBLIC_LINKEDIN_USERNAME != undefined}
                {@render details_card(LinkedInIcon, `https://www.linkedin.com/in/${PUBLIC_LINKEDIN_USERNAME}`, "Linked In", PUBLIC_LINKEDIN_USERNAME, "Linkedin Link")}
            {/if}
            
            {#if PUBLIC_LOCATION_TEXT != "" && PUBLIC_LOCATION_URL != ""}
                {@render details_card(LocationIcon, PUBLIC_LOCATION_URL, "Located", PUBLIC_LOCATION_TEXT, `Located in ${PUBLIC_LOCATION_TEXT}`)}
            {/if}
        </ul>
    </aside>
</div>

<style lang="scss">
    @use "$styling/_variables.scss" as variables;

    div.contact-methods{
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

        form{
            @include variables.glass-card(15px);

            display: flex;
            flex-direction: column;
            gap: 20px;

            & > label{
                overflow: hidden;
           
                @include variables.glass-card(
                    10px,
                    0px,
                    var(--glow-colour, rgba(255, 255, 255, 0.961)),
                    var(--glow-size, 10%),
                );

                &:has(:is(input, textarea):is(:focus, :focus-within, :active)){
                    --glow-colour:  var(--primary-colour);
                    --glow-size: 200%;
                }
            
                flex-direction: column;
                text-align: left;
                display: flex;

                & > :first-child{
                    padding: 10px 0 0 15px;
                    font-size: .9rem;
                    opacity: .75;
                }

                & > input, & > textarea{
                    padding: 5px 15px 10px 15px;
                    outline: transparent;
                    font-size: 1.2rem;
                    background: none;
                    border: none;
                }
                
                & > textarea{
                    min-height: 150px;
                    resize: vertical;
                }
            }

            & > button[type=submit]{
                @include variables.coloured-tag(var(--colour));

                --colour: rgb(0, 200, 0);

                transition: all ease-out 450ms;
                margin-top: 10px;

                &:hover{
                    --colour: rgb(0, 116, 0);

                    transition: all ease-in 250ms;
                }
            }

            noscript{
                @include variables.coloured-tag(rgb(255, 70, 70));
            }
        }

        & > aside {
            width: 100%;
            flex: 1;

            & > ul{
                flex-direction: column;
                display: flex;
                position: sticky;
                top: calc(var(--nav-height) + 10px);
                left: 0;
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

                    & > :global(svg):first-child{
                        aspect-ratio: 1/1;
                        width: 100%;
                        grid-area: Icon;
                    }

                    & > b{
                        grid-area: Name;
                    }

                    & > div{
                        grid-area: Value;
                    }

                    & > :global(svg):last-child{
                        aspect-ratio: 1/1;
                        grid-area: Arrow;
                        width: 24px;
                    }
                }
            }
        }
    }
</style>