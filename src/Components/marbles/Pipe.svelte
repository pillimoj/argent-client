<script lang="ts">
    import type { Pipe } from '../../marbles/Pipe';
    export let pipe: Pipe;
    export let activePipeId: string;
    export let activatePipe: (string) => void;
</script>

<div
    class="pipe"
    class:active={pipe.id === activePipeId}
    on:click={() => activatePipe(pipe.id)}
>
    {#each pipe.marbles as marble}
        <div style="background-color: {marble}" class="marble" />
    {/each}
</div>

<style>
    .pipe {
        display: grid;
        grid-template-columns: 2rem;
        grid-template-rows: 2rem 2rem 2rem 2rem;
        column-gap: 0.5rem;
        row-gap: 0.5rem;
        margin: 0 0.5rem;
        transform: rotate(180deg);
        border: 1px solid whitesmoke;
        border-bottom: 0;
        box-sizing: content-box;
        padding: 1px;
    }
    .pipe.active {
        border: 2px solid whitesmoke;
        border-bottom: 0;
        padding: 0;
    }
    .marble {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
    }
</style>
