<button type="submit" on:click>
    <slot />
</button>

<style>
    button[type='submit'] {
        font-family: inherit;
        font-size: inherit;
        height: 3.5rem;
        width: 5rem;
        box-sizing: border-box;
        background: white;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
    }
</style>
