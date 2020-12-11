<script lang="ts">
    import { client } from '../api.js';
    import { auth, user } from '../stores.js';
    const tokenLogin = async (token) => {
        const userResponse = await client('api/v1/login', {
            headers: { Authorization: `Bearer ${token}` },
        });
        user.set(userResponse);
        auth.set('Authenticated');
    };
    window.onSignIn = (googleUser) => {
        const idToken = googleUser.getAuthResponse().id_token;
        tokenLogin(idToken);
    };
</script>

<svelte:head>
    <script src="https://apis.google.com/js/platform.js" async defer>
    </script>
</svelte:head>

<div class="g-signin2" data-width="36" data-onsuccess="onSignIn" />
