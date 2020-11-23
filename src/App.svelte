<script lang="ts">
    import { auth, modal } from './stores.js';
    import Modal from './Modal.svelte';
    import Nav from './Nav.svelte';
    import Lists from './Lists.svelte';
    import SpacerV from './shared/SpacerV.svelte';

    $: modalState = $modal;
    $: authState = $auth;
</script>

<main>
    {#if modalState.show}
        <Modal>
            <svelte:component this={modalState.component} {...modalState.props} />
        </Modal>
    {/if}
    <Nav />
    <SpacerV height="5rem" />
    <div class="app-content">
        {#if authState.isLoggedIn}
            <Lists />
        {/if}
    </div>
</main>

<style>
    main {
        margin: 0 auto;
        max-width: 50rem;
    }

    .app-content {
        margin: 0 1rem;
    }

    @media (min-width: 40rem) {
        main {
            max-width: 38rem;
        }
    }

    :global(body) {
        background-color: black;
        font-family: 'Jost', sans-serif;
        color: white;
        font-size: 1rem;
        margin: 0;
        padding: 0;
    }
</style>
