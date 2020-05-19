<script>
    import { user } from './stores.js';
    import GoogleLoginButton from './auth/GoogleLoginButton.svelte';
    import Logout from './auth/Logout.svelte';

    $: currentUser = $user;
</script>

<div class="container">
    <a href="/">
        <div class="icon-container">
            <div>A</div>
        </div>
    </a>
    <h1>Argent</h1>
    <div class="signin-container">
        {#if currentUser.isLoggedIn}
            <Logout />
        {:else}
            <GoogleLoginButton />
        {/if}
    </div>
</div>

<style>
    .container {
        margin: 0 auto;
        max-width: 50rem;
        display: grid;
        grid-template-columns: 5rem 1fr 12rem;
        align-items: baseline;
        width: 100%;
        height: 5rem;
        position: fixed;
        top: 0rem;
    }
    a {
        color: white;
        text-decoration: none;
    }

    .icon-container {
        transform: rotate(180deg);
        height: 5rem;
        font-size: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .signin-container {
        display: flex;
        justify-content: flex-end;
        margin-right: 1rem;
    }

    @media (min-width: 40rem) {
        .container {
            max-width: 38rem;
        }
    }
</style>
