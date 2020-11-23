<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { client } from './api.js';
    import { modal, user } from './stores.js';
    import List from './List.svelte';
    import AddList from './modals/AddList.svelte';
    let lists = [];
    let activeList = null;
    let newListName = '';

    const listClickHandler = (listId) => () => (activeList = listId);
    const openAddListModal = () => {
        modal.set({
            component: AddList,
            show: true,
            props: {
                updateCallback: () => {
                    modal.set({ show: false });
                    updateLists();
                },
            },
            header: 'Add List',
        });
    };
    const updateLists = async () => {
        const data = await client('api/v1/checklists');
        lists = data;
    };
    const listDeleteHandler = (listId) => async () => {
        activeList = null;
        await client(`api/v1/checklists/${listId}`, { method: 'delete' });
        updateLists();
    };

    onMount(updateLists);

    $: currentUser = $user;
</script>

<div class="container">
    <div>
        {#each lists as list}
            <div
                class="list-name"
                class:active={list.id == activeList}
                on:click={listClickHandler(list.id)}
            >
                {list.name}
                {#if list.id == activeList}
                    <div
                        class="delete-list-button"
                        on:click|stopPropagation={listDeleteHandler(list.id)}
                    >
                        x
                    </div>
                {/if}
            </div>
        {/each}
        <div class="list-name add-list" on:click={openAddListModal}>+new list</div>
    </div>
    <div>
        {#if activeList !== null}
            <List listId={activeList} />
        {:else}
            <h2>Hello {currentUser.given_name}</h2>
        {/if}
    </div>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 8rem 1fr;
        margin-top: 2rem;
    }

    .list-name {
        height: 2rem;
        display: grid;
        grid-template-columns: 1fr 1rem;
        align-items: center;
        padding-left: 0.5rem;
        cursor: pointer;
    }
    .add-list {
        color: gray;
    }

    .active {
        background-color: white;
        color: black;
    }

    .delete-list-button {
        justify-content: center;
    }
</style>
