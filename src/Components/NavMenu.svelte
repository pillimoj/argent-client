<script lang="ts">
    import router from 'page';
    import authentication from '../auth';
    export let menuOpen: boolean;

    const navAndClose = (to: string) => {
        router.show(to);
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
        <div class="link" on:click={() => navAndClose('/marbles')}>Marble Game</div>
        <div class="spacer" />
        <div class="link" on:click={onLogoutClick}>Logout</div>
    </div>
{/if}

<style>
    .menu {
        position: relative;
        background-color: #fff;
        color: #112dba;
        position: fixed;
        top: 5rem;
        width: 100%;
        height: 100vh;
        z-index: 20;
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
        background-color: #1b40fb;
        color: #fff;
    }
    .spacer {
        height: 1px;
        margin: 1rem;
        background-color: #112dba;
    }
    .background-cover {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 20;
    }

</style>
