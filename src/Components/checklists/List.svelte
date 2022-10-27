<script lang="ts">
    import type { ListItem as TListItem, List } from '../../ArgentTypes';
    import api from '../../api.js';
    import ListItem from './ListItem.svelte';
    import Button from '../shared/Button.svelte';
    import AddItem from '../shared/AddItem.svelte';
    import SpacerV from '../shared/SpacerV.svelte';
    import { onMount } from 'svelte';
    import { pageTitle } from '../../stores';
    import Fireworks from '../shared/Fireworks.svelte';

    export let listId;
    let todoItems: TListItem[] = [];
    let doneItems: TListItem[] = [];
    let newItemTitle = '';
    let renderFireworks: boolean = false;

    const getList = async () => {
        const data = await api.get<List>(`api/v1/checklists/${listId}`);
        pageTitle.set(data.name);
    };

    const fetchListItems = async () => {
        const data = await api.get<TListItem[]>(`api/v1/checklists/${listId}/items`);
        todoItems = data.filter((it) => !it.done);
        doneItems = data.filter((it) => it.done);
    };
    const onClickItem = (itemId, done) => async () => {
        if (done) {
            await api.post(`api/v1/checklistitems/${itemId}/done`);
            if (todoItems.length === 1) {
                renderFireworks = true;
            }
            fetchListItems();
        } else {
            await api.post(`api/v1/checklistitems/${itemId}/not-done`);
            fetchListItems();
            renderFireworks = false;
        }
    };
    const onClickClear = async () => {
        await api.post(`api/v1/checklists/${listId}/clear-done`);
        fetchListItems();
        renderFireworks = false;
    };
    const addListItem = async () => {
        await api.post(`api/v1/checklistitems`, {
            title: newItemTitle,
            checklist: listId,
        });
        fetchListItems();
        newItemTitle = '';
        renderFireworks = false;
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
    {#if renderFireworks}
        <Fireworks />
    {/if}
</div>

<style>
    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
