<script lang="ts">
    export let disabled: boolean = false;
</script>

<button type="submit" {disabled} on:click>
    <slot />
</button>

<style>
    button[type='submit'] {
        font-family: inherit;
        font-size: inherit;
        height: 3.5rem;
        width: 5rem;
        box-sizing: border-box;
        background: #fff;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
    }
</style>
