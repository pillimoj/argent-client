<script lang="ts">
    import type { User, WishlistItem } from '../../ArgentTypes';
    import { user } from '../../stores';
    import { closeModal } from '../modals';

    import Button from '../shared/Button.svelte';

    export let item: WishlistItem;
    export let reserveItem: (item: WishlistItem, user: User) => Promise<void>;
    export let releaseItem: (item: WishlistItem) => Promise<void>;

    const taken = item.takenBy !== null;
    const takenByUser = item.takenBy === $user.id;

    const onClickReserve = async () => {
        await reserveItem(item, $user);
        closeModal();
    };

    const onClickRelease = async () => {
        await releaseItem(item);
        closeModal();
    };
</script>

<div class="container">
    <h2>{item.title}</h2>
    <p>{item.description}</p>
    <div class="actions">
        <Button on:click={closeModal} type="shadow">Back</Button>
        {#if !taken}
            <Button on:click={onClickReserve} type="confirm">Reserve</Button>
        {/if}
        {#if takenByUser}
            <Button on:click={onClickRelease} type={'danger'}>Release</Button>
        {/if}
    </div>
</div>

<style>
    h2 {
        margin-top: 0;
    }
    .container {
        padding: 1rem;
    }
    .actions {
        display: flex;
        justify-content: space-between;
    }
</style>
