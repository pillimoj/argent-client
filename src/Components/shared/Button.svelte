<script lang="ts" context="module">
    export type ButtonType = 'default' | 'danger' | 'shadow' | 'confirm';
</script>

<script lang="ts">
    export let type: ButtonType = 'default';
</script>

<div class="button-container {type}" on:click>
    <slot />
</div>

<style>
    .button-container {
        height: 2rem;
        min-width: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .default {
        background-color: #fff;
        color: #000;
    }
    .danger {
        background-color: #f00;
        color: #fff;
    }
    .confirm {
        background-color: #0d0;
        color: #fff;
    }
    .shadow {
        border: 1px solid #ccc;
        color: #ccc;
    }
</style>
