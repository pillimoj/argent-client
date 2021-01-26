<script lang="ts">
    import type { User, WishlistItem } from '../../ArgentTypes';
    import { user } from '../../auth/store';
    import { closeModal } from '../modals';

    import Button from '../shared/Button.svelte';
    import Input from '../shared/Input.svelte';
    import WishListItem from './WishListItem.svelte';

    export let item: WishlistItem | null;
    export let deleteItem: (item: WishlistItem) => Promise<void>;
    export let editItem: (item: WishlistItem) => Promise<void>;
    export let createItem: (item: WishlistItem) => Promise<void>;

    let newItem: WishlistItem = item ?? {
        id: null,
        user: $user.id,
        title: '',
        description: '',
        takenBy: null,
    };

    const onClickDelete = async () => {
        await deleteItem(newItem);
        closeModal();
    };

    const onClickEdit = async () => {
        await editItem(newItem);
        closeModal();
    };

    const onClickCreate = async () => {
        await createItem(newItem);
        closeModal();
    };
</script>

<form class="container">
    <Input bind:value={newItem.title} placeholder="Title" />
    <div class="v-space" />
    <Input bind:value={newItem.description} placeholder="Description" multiline />
    <div class="v-space" />
    <div class="buttons">
        <Button on:click={closeModal} type="shadow">Back</Button>
        {#if newItem.id !== null}
            <div class="action-buttons">
                <Button on:click={onClickDelete} type="danger">Delete</Button>
                <div class="h-space" />
                <Button on:click={onClickEdit} type={'confirm'}>Save</Button>
            </div>
        {:else}
            <Button on:click={onClickCreate} type={'confirm'}>Create</Button>
        {/if}
    </div>
</form>

<style>
    .container {
        padding: 1rem;
    }
    .buttons {
        display: flex;
        justify-content: space-between;
    }
    .action-buttons {
        display: flex;
    }
    .h-space {
        width: 1rem;
    }
    .v-space {
        height: 1rem;
    }
</style>
