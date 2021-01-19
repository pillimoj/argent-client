<script lang="ts">
    import type { WishlistItem as TListItem, User } from '../../ArgentTypes';
    import { client } from '../../api.js';
    import { openWishlistItemModal } from '../modals/create';
    import WishListItem from './WishListItem.svelte';

    export let listId: String;
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

    const fetchListItems = async (id) => {
        items = mockData; //await client<TListItem[]>(`api/v1/checklists/${id}`);
    };
    const reserveItem = async (item: TListItem, user: User) => {
        await client(`api/v1/wishlist-items/${item.id}/take`, { method: 'post' });
        fetchListItems(listId);
    };
    const releaseItem = async (item: TListItem) => {
        await client(`api/v1/wishlist-items/${item.id}/release`, { method: 'post' });
        fetchListItems(listId);
    };

    const onItemClick = (item: TListItem) => () => {
        openWishlistItemModal({
            item,
            releaseItem,
            reserveItem,
        });
    };

    $: fetchListItems(listId);
</script>

<div class="list-container">
    {#each items as item}
        <WishListItem {item} on:click={onItemClick(item)} />
    {/each}
</div>

<style>
    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
    }
</style>
