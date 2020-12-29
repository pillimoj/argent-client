<script lang="ts">
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';

    import type { User } from '../ArgentTypes';
    import GoogleAuth from '../GoogleAuth';
    import { client } from '../api';
    import { auth, user } from '../stores';

    import Button from './shared/Button.svelte';
    import GoogleLoginButton from './google/GoogleLoginButton.svelte';

    const tokenLogin = async (token) => {
        const userResponse = await client<User>('api/v1/login', {
            headers: { Authorization: `Bearer ${token}` },
        });
        user.set(userResponse);
        auth.set('Authenticated');
    };

    const logout = async () => {
        await Promise.all([GoogleAuth.logout(), client('api/v1/logout')]);
        user.set(null);
        auth.set('NeedsLogin');
        navigate('/');
    };

    const login = async () => {
        await GoogleAuth.login();
        const token = await GoogleAuth.getToken();
        tokenLogin(token);
    };

    const checkAuthStatus = async () => {
        let sucessfullyAuthenticated = false;
        try {
            const userResponse = await client<User>('api/v1/me');
            user.set(userResponse);
            auth.set('Authenticated');
            sucessfullyAuthenticated = true;
        } catch {}
        if (!sucessfullyAuthenticated) {
            try {
                if (await GoogleAuth.isLoggedIn()) {
                    const token = await GoogleAuth.getToken();
                    await tokenLogin(token);
                    sucessfullyAuthenticated = true;
                }
            } catch {}
        }
        if (!sucessfullyAuthenticated) {
            auth.set('NeedsLogin');
        }
    };
    onMount(checkAuthStatus);
</script>

<div class="signin-container">
    {#if $auth === 'Authenticated'}
        <Button on:click={logout}>Sign Out</Button>
    {:else if $auth === 'NeedsLogin'}
        <GoogleLoginButton on:click={login} />
    {/if}
</div>

<style>
    .signin-container {
        display: flex;
        justify-content: flex-end;
        margin-right: 1rem;
        align-self: center;
    }
</style>
