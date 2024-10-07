<script lang="ts">
    import { onMount } from 'svelte';
    import { client } from '../../api';
    import { pageTitle } from '../../stores';
    import { mapComputeEngineStatus } from '../../ArgentTypes';
    import type { ComputeEngineStatus, ComputeEngineUIStatus } from '../../ArgentTypes';
    import Button from '../shared/Button.svelte';

    let vmStatus: ComputeEngineUIStatus = 'Loading';

    const updateVmStatus = async () => {
        try {
            const data = await client<ComputeEngineStatus>(`api/v1/gce-vm`);
            vmStatus = mapComputeEngineStatus(data);
        } catch (error) {
            vmStatus = 'Loading';
        }
    };

    const startVm = async () => {
        await client(`api/v1/gce-vm/start`, {
            body: {},
        });
        updateVmStatus();
    };

    const stopVm = async () => {
        await client(`api/v1/gce-vm/stop`, {
            body: {},
        });
        updateVmStatus();
    };

    let clear;
    $: {
        clearInterval(clear);
        clear = setInterval(updateVmStatus, 5000);
    }

    onMount(() => pageTitle.set('Manage VM'));
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
