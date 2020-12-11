<div class="button-container" on:click>
    <slot />
</div>

<style>
    .button-container {
        height: 2rem;
        min-width: 5rem;
        background-color: #fff;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>
