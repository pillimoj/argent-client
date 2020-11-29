<script lang="ts">
    import { Router, Route } from 'svelte-routing';
    import { auth, modal } from './stores.js';
    import Modal from './Modal.svelte';
    import Nav from './Nav.svelte';
    import Lists from './Lists.svelte';
    import Admin from './admin/Admin.svelte';
    import SpacerV from './shared/SpacerV.svelte';

    $: modalState = $modal;
    $: authState = $auth;
</script>

<main>
    <Nav />
    <SpacerV height="5rem" />
    <Router>
        {#if authState.isLoggedIn}
            <Route path="admin" component={Admin} />
            <Route>
                <div class="app-content">
                    <Lists />
                </div>
                {#if modalState.show}
                    <Modal>
                        <svelte:component
                            this={modalState.component}
                            {...modalState.props}
                        />
                    </Modal>
                {/if}
            </Route>
        {/if}
    </Router>
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
