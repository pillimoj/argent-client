<script lang="ts">
    import Hamburger from './shared/Hamburger.svelte';
    import NavMenu from './NavMenu.svelte';

    let menuOpen: boolean = false;
    const clickMenu = () => (menuOpen = !menuOpen);
</script>

<div class="container">
    <div class="left">
        <Hamburger bind:open={menuOpen} on:click={clickMenu} />
        <h1>Argent</h1>
    </div>
    <a href="/">
        <div class="icon-container">
            <div>A</div>
        </div>
    </a>
</div>
<NavMenu bind:menuOpen />

<style>
    .container {
        background-color: #000;
        margin: 0 auto;
        max-width: 50rem;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        width: 100%;
        height: 5rem;
        position: fixed;
        top: 0rem;
        width: calc(100% - 2rem);
        padding: 0 1rem;
    }
    a {
        color: #fff;
        text-decoration: none;
    }

    h1 {
        margin-left: 1rem;
    }
    .icon-container {
        transform: rotate(180deg);
        height: 5rem;
        font-size: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .left {
        display: flex;
        align-items: center;
    }

    @media (min-width: 40rem) {
        .container {
            max-width: 38rem;
        }
    }
</style>
