<script lang="ts">
    import { Router, Route } from 'svelte-routing';
    import { modal } from '../stores.js';
    import { authStatus } from '../auth/store';
    import LoginButton from './LoginButton.svelte';
    import Modal from './Modal.svelte';
    import Nav from './Nav.svelte';
    import Lists from './checklists/Lists.svelte';
    import WishLists from './wishlists/WishLists.svelte';
    import List from './checklists/List.svelte';
    import ManageList from './checklists/ManageList.svelte';
    import WishList from './wishlists/WishList.svelte';
    import MyWishList from './wishlists/MyWishList.svelte';
    import Admin from './admin/Admin.svelte';
    import SpacerV from './shared/SpacerV.svelte';
</script>

<main>
    <Nav />
    <SpacerV height="5rem" />
    <div class="content">
        <Router>
            {#if $authStatus === 'Authenticated'}
                <Route path="admin" component={Admin} />
                <Route path="lists" component={Lists} />
                <Route path="list/:listId" component={List} />
                <Route path="list/:listId/manage" component={ManageList} />
                <Route path="wishlists" component={WishLists} />
                <Route path="my-wishlist" component={MyWishList} />
                <Route path="wishlists/:listId" component={WishList} />
                <Route component={Lists} />
            {:else}
                <LoginButton />
            {/if}
            {#if $modal.show}
                <Modal>
                    <svelte:component this={$modal.component} {...$modal.props} />
                </Modal>
            {/if}
        </Router>
    </div>
</main>

<style>
    main {
        margin: 0 auto;
        max-width: 50rem;
    }

    @media (min-width: 40rem) {
        main {
            max-width: 38rem;
            padding: 0 1rem;
        }
    }
    .content {
        margin: 0 1rem;
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
