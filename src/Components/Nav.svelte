<script lang="ts">
    import AuthButtons from './AuthButtons.svelte';
</script>

<div class="container">
    <a href="/">
        <div class="icon-container">
            <div>A</div>
        </div>
    </a>
    <h1>Argent</h1>
    <AuthButtons />
</div>

<style>
    .container {
        background-color: #000;
        margin: 0 auto;
        max-width: 50rem;
        display: grid;
        grid-template-columns: 5rem 1fr 12rem;
        align-items: baseline;
        width: 100%;
        height: 5rem;
        position: fixed;
        top: 0rem;
    }
    a {
        color: #fff;
        text-decoration: none;
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

    @media (min-width: 40rem) {
        .container {
            max-width: 38rem;
        }
    }
</style>
