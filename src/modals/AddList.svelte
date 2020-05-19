<script>
    import AddItem from '../shared/AddItem';
    import { client } from '../api.js';

    let newListName = '';
    export let updateCallback;

    const addList = async () => {
        await client('api/v1/checklists', { body: { name: newListName } });
        updateCallback();
    };
</script>

<div class="container">
    <h2>Add List</h2>
    <AddItem bind:value={newListName} placeholder="List Name" on:addItem={addList} />
</div>

<style>
    h2 {
        margin: 0;
    }
    .container {
        padding: 2rem;
    }
</style>
