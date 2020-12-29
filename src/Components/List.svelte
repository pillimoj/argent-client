<script lang="ts">
    import type { ListItem as TListItem } from '../ArgentTypes';
    import { client } from '../api.js';
    import ListItem from './ListItem.svelte';
    import Button from './shared/Button.svelte';
    import AddItem from './shared/AddItem.svelte';
    import SpacerV from './shared/SpacerV.svelte';

    export let listId;
    let todoItems = [];
    let doneItems = [];
    let newItemTitle = '';

    const fetchListItems = async (id) => {
        const data = await client<TListItem[]>(`api/v1/checklists/${id}`);
        todoItems = data.filter((it) => !it.done);
        doneItems = data.filter((it) => it.done);
    };
    const onClickItem = (itemId, done) => async () => {
        if (done) {
            await client(`api/v1/checklistitems/${itemId}/done`, { method: 'post' });
            fetchListItems(listId);
        } else {
            await client(`api/v1/checklistitems/${itemId}/not-done`, { method: 'post' });
            fetchListItems(listId);
        }
    };
    const onClickClear = async () => {
        await client(`api/v1/checklists/${listId}/clear-done`, { method: 'post' });
        fetchListItems(listId);
    };
    const addListItem = async () => {
        await client('api/v1/checklistitems', {
            body: { title: newItemTitle, checklist: listId },
        });
        fetchListItems(listId);
        newItemTitle = '';
    };

    $: fetchListItems(listId);
</script>

<div class="list-container">
    {#each todoItems as item}
        <ListItem {...item} on:click={onClickItem(item.id, true)} />
    {/each}
    <SpacerV />
    <AddItem bind:value={newItemTitle} placeholder="Item Name" on:addItem={addListItem} />
    <SpacerV />
    {#each doneItems as item}
        <ListItem {...item} on:click={onClickItem(item.id, false)} />
    {/each}
    {#if doneItems.length > 0}
        <SpacerV />
        <Button on:click={onClickClear}>Clear Done</Button>
    {/if}
</div>

<style>
    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
