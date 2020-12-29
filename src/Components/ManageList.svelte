<script lang="ts">
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';

    import type { UserOption } from '../ArgentTypes';
    import { client } from '../api';

    import { closeModal } from './modals';
    import { openShareListModal } from './modals/create';

    export let listId: string;

    let listUsers = [];
    let allUsers = [];
    let userOptions: Array<UserOption> = [];

    const fetchListUsers = async () => {
        listUsers = await client(`api/v1/checklists/${listId}/users`);
    };
    const getAllUsers = async () => {
        allUsers = await client('api/v1/users');
    };

    const shareList = async (userId: string, accessType: string) => {
        await client(`api/v1/checklists/${listId}/share`, {
            body: { userId, accessType },
        });
    };
    const onUnShare = (userId: string) => async () => {
        await client(`api/v1/checklists/${listId}/unshare/${userId}`, { method: 'post' });
        fetchListUsers();
    };

    $: userOptions = allUsers.filter(({ id }) => !listUsers.some((lu) => lu.id === id));
    $: onlyOneOwner =
        listUsers.filter((lu) => lu.checklistAccessType == 'Owner').length == 1;

    const onShareClick = () => {
        openShareListModal({
            userOptions,
            updateCallback: () => {
                closeModal();
                fetchListUsers();
            },
            shareFunction: shareList,
        });
    };
    const onDeleteClick = async () => {
        await client(`api/v1/checklists/${listId}`, { method: 'delete' });
        navigate('/');
    };
    onMount(getAllUsers);
    onMount(fetchListUsers);
</script>

<div class="container">
    <div class="row header">
        <div class="gray">User</div>
        <div />
        <div class="gray">Remove</div>
    </div>
    {#each listUsers as user}
        <div class="row">
            <div>{user.name}</div>
            <div class="gray">
                {#if user.checklistAccessType === 'Owner'}Is Owner{/if}
            </div>
            {#if !(onlyOneOwner && user.checklistAccessType === 'Owner')}
                <div class="share-link">
                    <div class="link" on:click={onUnShare(user.id)}>X</div>
                </div>
            {/if}
        </div>
    {/each}
    {#if userOptions.length > 0}
        <div class="share-link" on:click={onShareClick}>
            <div class="link">+share</div>
        </div>
    {/if}
    <div class="delete-button-container">
        <button on:click={onDeleteClick} class="delete-button">Delete</button>
    </div>
</div>

<style>
    .container {
        margin-top: 2rem;
    }
    .row {
        padding-left: 1rem;
        padding-right: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr 3rem;
        height: 2rem;
    }
    .header {
        margin-bottom: 1rem;
    }
    .gray {
        color: #888;
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
    .delete-button-container {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }
    button.delete-button {
        font-family: inherit;
        font-size: inherit;
        height: 2rem;
        width: 8rem;
        box-sizing: border-box;
        background: #f00;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
        margin-right: 1rem;
    }
</style>
