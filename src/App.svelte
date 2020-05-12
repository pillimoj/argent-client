<style>
    main {
        margin: 0 auto;
        max-width: 50rem;
    }

    @media (min-width: 40rem) {
        main {
            max-width: 38rem;
        }
    }
</style>

<script>
    import { user } from './stores.js';
    import Nav from './Nav.svelte';
    import Lists from './Lists.svelte';

    $: currentUser = $user;
</script>

<main>
    <Nav />
    {#if currentUser.isLoggedIn}
        <Lists />
    {/if}
</main>
