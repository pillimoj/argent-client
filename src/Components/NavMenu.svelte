<script lang="ts">
    import { navigate } from 'svelte-routing';
    import authentication from '../auth';
    export let menuOpen: boolean;

    const navAndClose = (to: string) => {
        navigate(to);
        menuOpen = false;
    };
    const onLogoutClick = () => {
        menuOpen = false;
        authentication.logout();
    };
</script>

{#if menuOpen}
    <div class="background-cover" on:click={() => (menuOpen = false)} />

    <div class="menu">
        <div class="link" on:click={() => navAndClose('/lists')}>Todo Lists</div>
        <div class="link" on:click={() => navAndClose('/wishlists')}>Wishlists</div>
        <div class="link" on:click={() => navAndClose('/my-wishlist')}>My Wishlist</div>
        <div class="spacer" />
        <div class="link" on:click={onLogoutClick}>Logout</div>
    </div>
{/if}

<style>
    .menu {
        position: relative;
        background-color: #fff;
        color: #000;
        position: fixed;
        top: 5rem;
        width: 100%;
        height: 100vh;
    }
    @media (min-width: 40rem) {
        .menu {
            max-width: 19rem;
            height: auto;
        }
    }
    .link {
        display: flex;
        align-items: center;
        padding-left: 1rem;
        margin: 0.5rem 1rem;
        height: 2rem;
        cursor: pointer;
    }
    .link:hover {
        background-color: #000;
        color: #fff;
    }
    .spacer {
        height: 1px;
        margin: 1rem;
        background-color: #000;
    }
    .background-cover {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
    }
</style>
