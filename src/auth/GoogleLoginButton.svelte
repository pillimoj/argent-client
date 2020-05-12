<script>
    import { user } from '../stores.js';
    window.onSignIn = (googleUser) => {
        const isLoggedIn = true;
        const profile = googleUser.getBasicProfile();
        const idToken = googleUser.getAuthResponse().id_token;
        user.set({
            isLoggedIn,
            profile,
            idToken,
        });
    };
</script>

<svelte:head>
    <script src="https://apis.google.com/js/platform.js?onload" async defer>

    </script>
</svelte:head>

<div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn" />
