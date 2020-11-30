<script lang="ts">
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { get } from 'svelte/store';
    import { client } from './api.js';
    import { modal, user } from './stores.js';
    import AddList from './modals/AddList.svelte';
    import Button from './shared/Button.svelte';
    let lists = [];
    let newListName = '';

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

    onMount(updateLists);
</script>

<div class="container">
    <div>
        {#each lists as list}
            <div class="list-item">
                <div class="link" on:click={() => navigate(`/list/${list.id}`)}>
                    {list.name}
                </div>
                <div
                    class="link manage"
                    on:click={() => navigate(`/list/${list.id}/manage`)}
                >
                    Manage
                </div>
            </div>
        {/each}
        <div class="list-item" on:click={openAddListModal}>
            <div class="link">+new list</div>
        </div>
    </div>
</div>

<style>
    :global(a) {
        color: unset;
        text-decoration: unset;
    }
    .container {
        margin-top: 2rem;
    }
    .list-item {
        height: 2rem;
        display: grid;
        grid-template-columns: 1fr 5rem;
        align-items: center;
        padding-left: 0.5rem;
        cursor: pointer;
    }
    .link {
        display: flex;
        align-items: center;
        height: 2rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .link.manage {
        justify-content: center;
    }
    .link:hover {
        background-color: white;
        color: black;
    }
</style>
