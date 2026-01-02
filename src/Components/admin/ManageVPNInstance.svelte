<script lang="ts">
    import { onMount } from 'svelte';
    import { client, apiUrl } from '../../api';
    import { mapComputeEngineStatus } from '../../ArgentTypes';
    import type { ComputeEngineStatus, ComputeEngineUIStatus } from '../../ArgentTypes';
    import Button from '../shared/Button.svelte';
    import SpacerV from '../shared/SpacerV.svelte';

    interface ConfigUrlResponse {
        url: string;
    }

    const FIVE_MINUTES_MS = 5 * 60 * 1000;
    const FIVE_SECONDS_MS = 5 * 1000;

    export let instanceName;
    let vmStatus: ComputeEngineUIStatus = 'Loading';

    const updateVmStatus = async () => {
        try {
            const data = await client<ComputeEngineStatus>(`api/v1/vm/${instanceName}`);
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
        await client(`api/v1/vm/${instanceName}/start`, {
            body: {},
        });
        vmStatus = 'Starting';
    };

    const stopVm = async () => {
        await client(`api/v1/vm/${instanceName}/stop`, {
            body: {},
        });
        vmStatus = 'Stopping';
    };
    onMount(() => updateVmStatus());

</script>

<div class="container">
    <div>
        <h2>{instanceName} is : {vmStatus}</h2>
    </div>
    <div class="button-grid">
        {#if vmStatus == 'Stopped'}
            <Button on:click={startVm}>Start</Button>
        {:else if vmStatus == 'Running'}
            <Button on:click={stopVm}>Stop</Button>
        {:else}
            <Button type="shadow">Wait</Button>
        {/if}
        <a
            href={`${apiUrl}api/v1/vm/${instanceName}/config`}
            download={`${instanceName}.ovpn`}
        >
            <Button type="shadow">Config</Button>
        </a>
    </div>
</div>

<style>
    .container {
        margin-top: 2rem;
    }
    .button-grid {
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 0.5rem;
    }

</style>
