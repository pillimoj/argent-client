<script lang="ts">
    import type { UserOption as WishListUser } from '../../ArgentTypes';
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { client } from '../../api.js';

    let lists: WishListUser[] = [];

    const updateLists = async () => {
        const data = await client<WishListUser[]>('api/v1/wishlists');
        lists = data;
    };

    onMount(updateLists);
</script>

<div class="container">
    <div>
        {#each lists as list}
            <div class="list-item">
                <div class="link" on:click={() => navigate(`/wishlists/${list.id}`)}>
                    {list.name}
                </div>
            </div>
        {/each}
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
        cursor: pointer;
    }
    .link {
        display: flex;
        align-items: center;
        height: 2rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .link:hover {
        background-color: #333;
    }
</style>
