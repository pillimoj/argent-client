<div class="button-container" on:click>
    <slot />
</div>

<style>
    .button-container {
        height: 3.5rem;
        min-width: 5rem;
        background-color: white;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>
