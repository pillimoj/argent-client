<script lang="ts">
    import { onMount } from 'svelte';
    import router from 'page';

    import { modal, pageTitle } from '../stores.js';
    import { authStatus } from '../auth/store';
    import authentication from '../auth';

    import Admin from './admin/Admin.svelte';
    import Chat from './chat/Chat.svelte';
    import Game from './marbles/Game.svelte';
    import List from './checklists/List.svelte';
    import Lists from './checklists/Lists.svelte';
    import LoginButton from './LoginButton.svelte';
    import ManageList from './checklists/ManageList.svelte';
    import Modal from './Modal.svelte';
    import MyWishList from './wishlists/MyWishList.svelte';
    import Nav from './Nav.svelte';
    import SpacerV from './shared/SpacerV.svelte';
    import Spinner from './shared/Spinner.svelte';
    import WishList from './wishlists/WishList.svelte';
    import WishLists from './wishlists/WishLists.svelte';

    let page;
    let params = {};

    const setParams = (ctx, next) => {
        params = ctx.params;
        next();
    };

    const addRoute = (route: string, component: any) => {
        router(route, setParams, () => (page = component));
    };

    router.exit((_, next) => {
        pageTitle.set('');
        next();
    });
    router.redirect('/', '/lists');
    addRoute('/marbles', Game);
    addRoute('/admin', Admin);
    addRoute('/lists', Lists);
    addRoute('/list/:listId', List);
    addRoute('/list/:listId/manage', ManageList);
    addRoute('/wishlists', WishLists);
    addRoute('/my-wishlist', MyWishList);
    addRoute('/wishlists/:listId', WishList);
    addRoute('/chat', Chat);
    router.start();

    onMount(authentication.checkAuthStatus);
</script>

<main>
    <Nav />
    <SpacerV height="5rem" />
    <div class="content">
        {#if $authStatus === 'Authenticated'}
            <svelte:component this={page} {...params} />
        {:else if $authStatus === 'NeedsLogin'}
            <LoginButton />
        {:else}
            <div class="spinner">
                <Spinner />
            </div>
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
        }
    }
    .content {
        margin: 0 1rem;
    }
    .spinner {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
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
