<script lang="ts">
    import { client } from '../../api';

    import Button from '../shared/Button.svelte';

    export let updateCallback: () => void;
    export let completedGameLevel: number;

    const handleClick = async () => {
        updateCallback();
    };
</script>

<div class="container">
    <h2>Congratulations</h2>
    You completed level
    {completedGameLevel}
    <Button on:click={handleClick}>Next Game</Button>
</div>

<style>
    h2 {
        margin: 0;
    }
    .container {
        padding: 2rem;
    }
</style>
