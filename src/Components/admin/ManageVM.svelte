<script lang="ts">
    import { onMount } from 'svelte';
    import { client } from '../../api';
    import { pageTitle } from '../../stores';
    import { mapComputeEngineStatus } from '../../ArgentTypes';
    import type { ComputeEngineStatus, ComputeEngineUIStatus } from '../../ArgentTypes';
    import Button from '../shared/Button.svelte';

    const FIVE_MINUTES_MS = 5 * 60 * 1000;
    const FIVE_SECONDS_MS = 5 * 1000;

    let vmStatus: ComputeEngineUIStatus = 'Loading';

    const updateVmStatus = async () => {
        try {
            const data = await client<ComputeEngineStatus>(`api/v1/gce-vm`);
            vmStatus = mapComputeEngineStatus(data);
        } catch (error) {
            vmStatus = 'Loading';
        }
    };

    let clear;
    $: {
        clearInterval(clear);
        if (['Stopped', 'Running'].includes(vmStatus)) {
            clear = setInterval(updateVmStatus, FIVE_MINUTES_MS);
        } else {
            clear = setInterval(updateVmStatus, FIVE_SECONDS_MS);
        }
    }

    const startVm = async () => {
        await client(`api/v1/gce-vm/start`, {
            body: {},
        });
        vmStatus = 'Starting';
    };

    const stopVm = async () => {
        await client(`api/v1/gce-vm/stop`, {
            body: {},
        });
        vmStatus = 'Stopping';
    };

    onMount(() => pageTitle.set('Manage VM'));
    onMount(() => updateVmStatus());
</script>

<div class="container">
    <div>
        <h2>VM is : {vmStatus}</h2>
    </div>
    <div>
        {#if vmStatus == 'Stopped'}
            <Button on:click={startVm}>Start</Button>
        {/if}
        {#if vmStatus == 'Running'}
            <Button on:click={stopVm}>Stop</Button>
        {/if}
    </div>
</div>

<style>
    .container {
        margin-top: 2rem;
    }
</style>
