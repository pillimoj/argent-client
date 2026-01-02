<script lang="ts">
    import { onMount } from 'svelte';
    import { client } from '../../api';
    import { pageTitle } from '../../stores';
    import ManageVPNInstance from './ManageVPNInstance.svelte';
    import SpacerV from '../shared/SpacerV.svelte';
    import Button from '../shared/Button.svelte';

    interface MessageResponse {
        message: string;
    }

    let passwordShowing = false;
    let password = '';
    const showPassword = async () => {
        passwordShowing = true;
        const data = await client<MessageResponse>('api/v1/vms/password');
        password = data.message;
    };

    let instances: string[] = [];
    const updateInstances = async () => {
        const data = await client<string[]>('api/v1/vms');
        instances = data;
    };

    onMount(updateInstances);
    onMount(() => pageTitle.set('VPN'));

</script>

<div>
    {#each instances as instance}
        <ManageVPNInstance instanceName={instance} />
    {/each}
    <SpacerV />
    {#if !passwordShowing}
        <Button on:click={showPassword}>Show Password</Button>
    {:else if password != ''}
        <p>Password: <code>{password}</code></p>
    {/if}
</div>

<style>
</style>
