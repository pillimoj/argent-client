<script lang="ts">
    import router from 'page';
    import { modal, pageTitle } from '../stores.js';
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

    let page;
    let params = {};

    const addRoute = (route: string, component: any) => {
        router(route, setParams, resetPageTitle, () => (page = component));
    };

    const resetPageTitle = (_, next) => {
        pageTitle.set('');
        next();
    };
    const setParams = (ctx, next) => {
        params = ctx.params;
        next();
    };

    addRoute('/admin', Admin);
    addRoute('/lists', Lists);
    addRoute('/list/:listId', List);
    addRoute('/list/:listId/manage', ManageList);
    addRoute('/wishlists', WishLists);
    addRoute('/my-wishlist', MyWishList);
    addRoute('/wishlists/:listId', WishList);
    router.start();
</script>

<main>
    <Nav />
    <SpacerV height="5rem" />
    <div class="content">
        {#if $authStatus === 'Authenticated'}
            <svelte:component this={page} {...params} />
        {:else}
            <LoginButton />
        {/if}
        {#if $modal.show}
            <Modal>
                <svelte:component this={$modal.component} {...$modal.props} />
            </Modal>
        {/if}
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
