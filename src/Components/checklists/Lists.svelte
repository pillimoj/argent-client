<script lang="ts">
    import type { List as TList } from '../../ArgentTypes';
    import { onMount } from 'svelte';
    import router from 'page';
    import api from '../../api.js';
    import { modal, pageTitle } from '../../stores.js';
    import AddList from '../modals/AddList.svelte';

    let lists: TList[] = [];

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
        });
    };

    const updateLists = async () => {
        const data = await api.get<TList[]>('api/v1/checklists');
        lists = data;
    };

    onMount(updateLists);
    onMount(() => pageTitle.set('Checklists'));
</script>

<div class="container">
    <div>
        {#each lists as list}
            <div class="list-item">
                <div class="link" on:click={() => router.show(`/list/${list.id}`)}>
                    {list.name}
                </div>
                <div
                    class="link manage"
                    on:click={() => router.show(`/list/${list.id}/manage`)}
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
        color: #92520a;
    }
    .link:hover {
        background-color: #1b40fb;
    }
</style>
