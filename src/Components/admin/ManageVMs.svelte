<script lang="ts">
    import { onMount } from 'svelte';
    import { client } from '../../api';
    import { pageTitle } from '../../stores';
    import ManageVMInstance from './ManageVMInstance.svelte';

    let instances: string[] = [];
    const updateInstances = async () => {
        const data = await client<string[]>('api/v1/vms');
        instances = data;
    };

    onMount(updateInstances);
    onMount(() => pageTitle.set('VMs'));

</script>

<div>
    {#each instances as instance}
        <ManageVMInstance instanceName={instance} />
    {/each}
</div>

<style>
</style>
