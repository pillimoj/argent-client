<script>
    import { onMount } from 'svelte';
    import { client } from './api.js';
    import { modal } from './stores.js';
    import List from './List.svelte';
    import AddList from './modals/AddList.svelte';
    let lists = [];
    let activeList = null;
    let newListName = '';

    const listClickHandler = (listId) => () => (activeList = listId);

    const updateLists = async () => {
        const data = await client('api/v1/checklists');
        lists = data;
    };
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
    onMount(updateLists);
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
            </div>
        {/each}
        <div class="list-name add-list" on:click={openAddListModal}>+new list</div>
    </div>
    <div>
        {#if activeList !== null}
            <List listId={activeList} />
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
        display: flex;
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
</style>
