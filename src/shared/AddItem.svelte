<script>
    import { createEventDispatcher } from 'svelte';
    import FormButton from './FormButton.svelte';
    import Input from './Input.svelte';

    export let value = '';
    export let ctaText = 'Add';
    export let placeholder;

    const dispatch = createEventDispatcher();
    const addItem = () => dispatch('addItem');
</script>

<form on:submit={addItem}>
    <Input {placeholder} bind:value />
    <FormButton>{ctaText}</FormButton>
</form>

<style>
    form {
        display: flex;
    }
</style>
