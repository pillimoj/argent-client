<script lang="ts">
    import { onMount } from 'svelte';
    import { client } from './api';
    import { auth, user } from './stores.js';
    import GoogleLoginButton from './auth/GoogleLoginButton.svelte';
    import Logout from './auth/Logout.svelte';

    const checkAuthStatus = async () => {
        try {
            const loggedInUser = await client('api/v1/me');
            user.set(loggedInUser);
            auth.set('Authenticated');
        } catch {
            auth.set('NeedsLogin');
        }
    };
    onMount(checkAuthStatus);

    $: authState = $auth;
</script>

<div class="container">
    <a href="/">
        <div class="icon-container">
            <div>A</div>
        </div>
    </a>
    <h1>Argent</h1>
    <div class="signin-container">
        {#if authState === 'Authenticated'}
            <Logout />
        {:else if authState === 'NeedsLogin'}
            <GoogleLoginButton />
        {/if}
    </div>
</div>

<style>
    .container {
        background-color: #000;
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
        color: #fff;
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
        align-self: center;
    }

    @media (min-width: 40rem) {
        .container {
            max-width: 38rem;
        }
    }
</style>
