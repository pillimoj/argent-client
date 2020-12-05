<script lang="ts">
    export let value;
    export let placeholder = null;
    export let errorBorder = false;
    export let hasPlaceholder = false;
    export let noBorder = false;
    export let error = null;
    export let additional;
    export let type = 'text';

    // Can only be set when creating component
    const allowedTypes = ['text', 'email', 'password'];
    const typeIsAllowed = allowedTypes.includes(type);
    if (!typeIsAllowed) {
        console.error(`Type must be one of: ${allowedTypes}`);
    }
    const staticType = typeIsAllowed ? type : 'text';
</script>

<div class="textInputContainer">
    {#if placeholder}
        <label class="textInputLabel" class:hasValue={value}>{placeholder}</label>
    {/if}
    <input
        bind:value
        class="textInput"
        class:errorBorder
        class:hasValue={value}
        class:hasPlaceholder
        class:noBorder
        {staticType}
    />
    {#if error}
        <div class="textInputErrorLabel">{error}</div>
    {:else if additional}
        <div class="textInputAdditionalLabel">{additional}</div>
    {/if}
</div>

<style>
    .textInputContainer {
        position: relative;
        font-size: 16px;
    }

    input.textInput {
        background-clip: padding-box;
        background-color: #000;
        border: 1px solid #fff;
        /* border-radius: 4px; */
        box-sizing: border-box;
        box-shadow: none;
        color: #fff;
        display: block;
        font-weight: normal;
        font-size: 1em;
        height: 3.5em;
        margin-bottom: 0;
        outline: none;
        padding: 0 1em;
        transform: translate3d(0, 0, 0);
        transition: 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        width: 100%;
    }

    .textInput.hasPlaceholder.hasValue {
        padding: 1.5em 1em 0.625em;
    }

    input.textInput.hasValue,
    input.textInput:focus {
        color: #000;
        background-color: #fff;
        outline: none;
        box-shadow: none;
    }

    input.noBorder.textInput,
    input.noBorder.textInput.hasValue,
    input.noBorder.textInput:focus,
    input.noBorder.textInput:hover {
        border: none;
        outline: none;
    }

    .textInput.hasValue:not(:focus) {
        color: #fff;
        background-color: #000;
        border: 1px solid #fff;
    }

    .textInput.errorBorder,
    .textInput.hasValue.errorBorder,
    .textInput:hover.errorBorder {
        border: 1px solid red;
    }

    .textInputErrorLabel,
    .textInputAdditionalLabel {
        color: #888;
        display: block;
        font-weight: normal;
        font-size: 12px;
        height: 20px;
        line-height: 1.67;
        margin-bottom: 8px;
        text-align: right;
        width: 100%;
    }

    .textInputErrorLabel {
        color: red;
    }

    .textInputLabel {
        color: #888;
        display: block;
        font-weight: normal;
        font-size: 1em;
        left: calc(1em + 1px);
        pointer-events: none;
        position: absolute;
        top: 1.25em;
        z-index: 1;
    }

    .textInputLabel.hasValue {
        font-size: 10px;
        left: 1.6em;
        top: 1.5em;
        transform-origin: 0 0;
        transform: translateY(-10px);
        transition: 0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
</style>
