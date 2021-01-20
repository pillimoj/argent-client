<script lang="ts">
    import { Router, Route } from 'svelte-routing';
    import { modal } from '../stores.js';
    import { authStatus, user } from '../auth/store';
    import LoginButton from './LoginButton.svelte';
    import Modal from './Modal.svelte';
    import Nav from './Nav.svelte';
    import Lists from './checklists/Lists.svelte';
    import List from './checklists/List.svelte';
    import ManageList from './checklists/ManageList.svelte';
    import WishList from './wishlists/WishList.svelte';
    import MyWishList from './wishlists/MyWishList.svelte';
    import Admin from './admin/Admin.svelte';
    import SpacerV from './shared/SpacerV.svelte';

    let menuOpen = false;
    const clickMenu = () => (menuOpen = !menuOpen);
</script>

<main>
    <Nav {menuOpen} {clickMenu} />
    <SpacerV height="5rem" />
    <Router>
        {#if $authStatus === 'Authenticated'}
            <Route path="admin" component={Admin} />
            <Route path="list/:id" let:params>
                <List listId={params.id} />
            </Route>
            <Route path="list/:id/manage" let:params>
                <ManageList listId={params.id} />
            </Route>
            <Route path="wishlist">
                <WishList user={$user} />
            </Route>
            <Route path="my-wishlist">
                <MyWishList user={$user} />
            </Route>
            <Route path="wishlist/:id" let:params>
                <WishList user={$user} listId={params.id} />
            </Route>
            <Route>
                <Lists />
            </Route>
        {:else}
            <LoginButton />
        {/if}
        {#if $modal.show}
            <Modal>
                <svelte:component this={$modal.component} {...$modal.props} />
            </Modal>
        {/if}
    </Router>
</main>

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

    :global(body) {
        background-color: #000;
        font-family: 'Jost', sans-serif;
        color: #fff;
        font-size: 1rem;
        margin: 0;
        padding: 0;
    }
</style>
