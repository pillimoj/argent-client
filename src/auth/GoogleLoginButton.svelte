<script lang="ts">
    import { client } from '../api.js';
    import { auth, user } from '../stores.js';
    window.onSignIn = (googleUser) => {
        const isLoggedIn = true;
        const idToken = googleUser.getAuthResponse().id_token;
        auth.set({
            isLoggedIn,
            idToken,
        });
        client('api/v1/me').then((data) => user.set(data));
    };
</script>

<svelte:head>
    <script src="https://apis.google.com/js/platform.js" async defer>

    </script>
</svelte:head>

<div class="g-signin2" data-width="36" data-onsuccess="onSignIn" />
