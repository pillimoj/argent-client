<script lang="ts">
    import type { UserOption } from '../../ArgentTypes';
    import { closeModal } from './';

    export let updateCallback: () => void;
    export let shareFunction: (userId: string, accessType: string) => Promise<void>;
    export let userOptions: Array<UserOption> = [];

    const Editor = 'Editor';
    const Owner = 'Owner';

    let selectedUser: UserOption | null = null;
    let setOwner = false;

    const onShareSubmit = async () => {
        await shareFunction(selectedUser.id, setOwner ? Owner : Editor);
        updateCallback();
    };
    $: disabled = selectedUser === null;

</script>

<div class="container">
    <h2>Share List</h2>
    <form on:submit|preventDefault={onShareSubmit}>
        <div>
            <select bind:value={selectedUser}>
                <option hidden disabled selected value>Select user...</option>
                {#each userOptions as userOption}
                    <option value={userOption}>{userOption.name}</option>
                {/each}
            </select>
            <label> <input type="checkbox" bind:checked={setOwner} /> Owner </label>
        </div>
        <div class="button-section">
            <button type="submit" {disabled} class:disabled>Share</button>
            <button on:click={closeModal}>Cancel</button>
        </div>
    </form>
</div>

<style>
    h2 {
        margin: 0;
    }
    button {
        font-family: inherit;
        font-size: inherit;
        height: 2rem;
        width: 5rem;
        box-sizing: border-box;
        background: #fff;
        color: #112dba;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
        margin-right: 1rem;
    }
    select {
        width: 10rem;
        height: 2rem;
        margin-bottom: 0.5rem;
    }
    .container {
        padding: 2rem;
    }
    button.disabled {
        background: #92520a;
    }
    .button-section {
        display: flex;
        justify-content: space-between;
    }

</style>
