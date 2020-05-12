<script>
    import { onMount } from 'svelte';
    import { client } from './api.js';
    let lists = [];

    onMount(async () => {
        const data = await client('api/v1/checklists');
        lists = data;
    });
</script>

{#each lists as list}
    <div>{list.name}</div>
{/each}
