<script lang="ts">
    import { onMount } from 'svelte';
    import type { WishlistItem as TListItem, User } from '../../ArgentTypes';
    import { client } from '../../api.js';
    import { openWishlistEditItemModal } from '../modals/create';
    import WishListItem from './WishListItem.svelte';
    import Button from '../shared/Button.svelte';

    export let user: User;
    let items: TListItem[] = [];

    const mockData: TListItem[] = [
        {
            id: 'abc1',
            title: 'This item has a very long title',
            description: 'This is the very long description of the item',
            takenBy: null,
            user: 'abc',
        },
        {
            id: 'abc2',
            title: 'abc2',
            description: 'This is the very long description of the item',
            takenBy: user.id,
            user: 'abc',
        },
        {
            id: 'abc2',
            title: 'abc2',
            description: 'This is the very long description of the item',
            takenBy: 'abc2',
            user: 'abc',
        },
        {
            id: 'abc3',
            title: 'abc3',
            description: 'This is the description of the item',
            takenBy: null,
            user: 'abc',
        },
    ];

    const fetchListItems = async () => {
        items = await client<TListItem[]>(`api/v1/wishlists/me`);
    };

    const createItem = async (item: TListItem) => {
        await client('api/v1/wishlist-items', { body: item });
        fetchListItems();
    };

    const editItem = async (item: TListItem) => {
        await client(`api/v1/wishlist-items/${item.id}`, { body: item });
        fetchListItems();
    };
    const deleteItem = async (item: TListItem) => {
        await client(`api/v1/wishlist-items/${item.id}`, { method: 'delete' });
        fetchListItems();
    };

    const onItemClick = (item: TListItem | null = null) => () => {
        openWishlistEditItemModal({
            item,
            deleteItem,
            editItem,
            createItem,
        });
    };

    onMount(fetchListItems);
</script>

<div class="list-container">
    {#each items as item}
        <WishListItem {item} on:click={onItemClick(item)} />
    {/each}
    <div class="button-container">
        <Button on:click={onItemClick()}>Create</Button>
    </div>
</div>

<style>
    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
    }
    .button-container {
        display: flex;
        align-self: flex-start;
        margin-top: 1rem;
    }
</style>
