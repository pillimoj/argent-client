<script lang="ts">
    import { onMount } from 'svelte';

    import authentication from '../auth';
    import { authStatus } from '../auth/store';

    import GoogleLoginButton from './google/GoogleLoginButton.svelte';

    onMount(authentication.checkAuthStatus);
</script>

{#if $authStatus === 'NeedsLogin'}
    <div>
        <GoogleLoginButton on:click={authentication.login} />
    </div>
{/if}

<style>
    div {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }
</style>
