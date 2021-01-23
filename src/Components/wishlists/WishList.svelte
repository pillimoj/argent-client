<script lang="ts">
    import type { WishlistItem as TListItem, User, UserOption } from '../../ArgentTypes';
    import { client } from '../../api.js';
    import { openWishlistItemModal } from '../modals/create';
    import WishListItem from './WishListItem.svelte';

    export let listId: string;
    let items: TListItem[] = [];
    let listUser: UserOption | null = null;

    const fetchListItems = async (id: string) => {
        items = await client<TListItem[]>(`api/v1/wishlists/${id}`);
    };
    const fetchUser = async (id: string) => {
        const user = await client<UserOption>(`api/v1/users/${id}`);
        listUser = user;
    };
    const reserveItem = async (item: TListItem, user: User) => {
        await client(`api/v1/wishlist-items/${item.id}/take`, { method: 'post' });
        fetchListItems(listId);
    };
    const releaseItem = async (item: TListItem) => {
        await client(`api/v1/wishlist-items/${item.id}/release`, { method: 'post' });
        fetchListItems(listId);
    };

    const activateItem = (item: TListItem) => {
        openWishlistItemModal({
            item,
            releaseItem,
            reserveItem,
        });
    };

    const onItemClick = (item: TListItem) => () => activateItem(item);

    const onItemKeyDown = (item: TListItem) => (event: KeyboardEvent) => {
        if (!['Enter', 'Space'].includes(event.code)) return;
        activateItem(item);
    };

    $: fetchListItems(listId);
    $: fetchUser(listId);
</script>

<div class="list-container">
    {#if listUser !== null}
        <h2>Wishlist for {listUser.name}</h2>
    {/if}
    {#each items as item}
        <WishListItem
            {item}
            on:click={onItemClick(item)}
            on:keydown={onItemKeyDown(item)}
        />
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
