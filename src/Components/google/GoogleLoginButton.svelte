<script lang="ts">
    import GoogleLogo from './GoogleLogo.svelte';
</script>

<div class="login-button" on:click>
    <GoogleLogo />
    <span class="login-text">Log in</span>
</div>

<style>
    .login-button {
        min-width: 5rem;
        background-color: #1a73e8;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .login-text {
        margin: 0 1rem;
    }
</style>
