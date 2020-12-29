<script lang="ts">
    import GoogleLogo from './GoogleLogo.svelte';

    export let disabled: boolean;
</script>

<div class="login-button" on:click>
    <GoogleLogo />
    <span class="login-text" class:disabled>Log in</span>
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
    .login-button.disabled {
        cursor: not-allowed;
        background-color: #999;
    }
    .login-text {
        margin: 0 1rem;
    }
</style>
