<script>
    import Button from '../shared/Button.svelte';
    const signOut = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            window.location.replace('/');
        });
    };
</script>

<Button on:click={signOut}>Sign Out</Button>
