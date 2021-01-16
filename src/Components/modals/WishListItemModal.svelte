<script lang="ts">
    import type { User, WishlistItem } from '../../ArgentTypes';

    import Button from '../shared/Button.svelte';

    export let item: WishlistItem;
    export let user: User;
    export let reserveItemClick: (item: WishlistItem, user: User) => Promise<void>;
    export let releaseItemClick: (item: WishlistItem) => Promise<void>;

    const taken = item.takenBy !== null;
    const takenByUser = item.takenBy === user.id;
</script>

<div class="container">
    <h2>{item.title}</h2>
    <p>{item.description}</p>
    <div class="actions">
        <Button on:click={closeModal}>Back</Button>
        {#if !taken}
            <Button on:click={() => reserveItemClick(item, user)}>Reserve</Button>
        {/if}
        {#if takenByUser}
            <Button on:click={() => releaseItemClick(item)}>Reserve</Button>
        {/if}
    </div>
</div>

<style>
    .actions {
        display: flex;
        flex-direction: column;
    }
</style>
