<script lang="ts">
    import type { ListItem as TListItem, List } from '../../ArgentTypes';
    import { client } from '../../api.js';
    import ListItem from './ListItem.svelte';
    import Button from '../shared/Button.svelte';
    import AddItem from '../shared/AddItem.svelte';
    import SpacerV from '../shared/SpacerV.svelte';
    import { onMount } from 'svelte';
    import { pageTitle } from '../../stores';

    export let listId;
    let todoItems: TListItem[] = [];
    let doneItems: TListItem[] = [];
    let newItemTitle = '';

    const getList = async () => {
        const data = await client<List>(`api/v1/checklists/${listId}`);
        pageTitle.set(data.name);
    };

    const fetchListItems = async () => {
        const data = await client<TListItem[]>(`api/v1/checklists/${listId}/items`);
        todoItems = data.filter((it) => !it.done);
        doneItems = data.filter((it) => it.done);
    };
    const onClickItem = (itemId, done) => async () => {
        if (done) {
            await client(`api/v1/checklistitems/${itemId}/done`, {
                method: 'post',
            });
            fetchListItems();
        } else {
            await client(`api/v1/checklistitems/${itemId}/not-done`, {
                method: 'post',
            });
            fetchListItems();
        }
    };
    const onClickClear = async () => {
        await client(`api/v1/checklists/${listId}/clear-done`, { method: 'post' });
        fetchListItems();
    };
    const addListItem = async () => {
        await client(`api/v1/checklistitems`, {
            body: { title: newItemTitle, checklist: listId },
        });
        fetchListItems();
        newItemTitle = '';
    };

    onMount(fetchListItems);
    onMount(getList);
</script>

<svelte:options accessors={true} />
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
