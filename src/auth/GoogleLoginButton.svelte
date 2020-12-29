<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { Button } from 'carbon-components-svelte';
    import GoogleLogo from './GoogleLogo.svelte';

    const loadScript = (url, test, callback) => {
        if (test()) {
            return callback();
        }
        const tag = document.createElement('script');
        tag.src = url;
        tag.async = true;
        tag.defer = true;
        tag.onload = callback;
        document.body.appendChild(tag);
    };
    const dispatch = createEventDispatcher();
    let signinCta;
    export let clientId;
    export let text = 'Sign in with Google';
    let disabled = true;
    onMount(() => {
        loadScript(
            '//apis.google.com/js/api:client.js',
            () => window['gapi'],
            () => initialise(),
        );
    });
    let GoogleAuth;
    function initialise() {
        gapi.load('auth2', async () => {
            GoogleAuth = gapi.auth2.init({ client_id: clientId });
            GoogleAuth.then(onAuthInitialized, handleInitialisationError);
        });
    }
    function onAuthInitialized() {
        if (GoogleAuth.isSignedIn.get()) {
            dispatch('auth-success', { user: GoogleAuth.currentUser.get() });
        }
        attachHandler();
    }
    function attachHandler() {
        GoogleAuth.attachClickHandler(
            signinCta,
            {},
            () => dispatch('auth-success', { user: GoogleAuth.currentUser.get() }),
            (e) => dispatch('auth-failure', { error: e }),
        );
        disabled = false;
    }
    function handleInitialisationError(e) {
        console.error('gauth initialisation error', e);
        dispatch('init-error', { error: e });
    }
</script>

<Button bind:ref={signinCta} {disabled} class="google-auth">
    <GoogleLogo />
    <span class="login-text">Log in</span>
</Button>

<style>
    .login-text {
        margin-left: 1rem;
    }
</style>
