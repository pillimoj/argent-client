<script lang="ts">
    import google from '../../auth/google';
    import { onMount } from 'svelte';

    let loginElement: HTMLElement;

    onMount(async () => {
        const api = google.api;
        (await api).renderButton(loginElement, {
            type: 'standard',
            theme: 'outline',
            size: 'medium',
            text: 'signin',
            shape: 'rectangular',
        });
    });
</script>

<div class="login-container">
    <div bind:this={loginElement} class="login-button" />
    <div id={google.ONE_TAP_CONTAINER_ID} />
</div>

<style>
    .login-button {
        margin: 0 auto;
        width: fit-content;
    }
</style>
