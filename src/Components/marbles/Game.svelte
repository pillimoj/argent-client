<script lang="ts">
    import { Game } from '../../marbles/Game';
    import { GameEvent } from '../../marbles/GameEvent';
    import type { RenderData } from '../../marbles/RenderData';
    import Fireworks from './Fireworks.svelte';
    import Pipe from './Pipe.svelte';

    // TODO: Fireworks
    // TODO: New game dialog
    // TODO: Remember player

    let game: Game | null = null;
    let renderData: RenderData | null = null;
    let renderFireWorks: boolean = false;
    let renderFireWorksTimer: number | null = null;

    const newGame = () => {
        game = new Game(6);
        renderData = game.getRenderData();
    };

    const showFireWorks = () => {
        renderFireWorks = true;
        if (renderFireWorksTimer !== null) {
            clearTimeout(renderFireWorksTimer);
        }
    };

    const hideFireWorks = () => {
        renderFireWorks = false;
        if (renderFireWorksTimer !== null) {
            clearTimeout(renderFireWorksTimer);
        }
    };

    const flashFireWorks = (durationMs: number) => {
        renderFireWorks = true;
        renderFireWorksTimer = setTimeout(hideFireWorks, durationMs);
    };

    const handleEvent = (event: GameEvent | null) => {
        switch (event) {
            case GameEvent.PipeFinished:
                console.log('small firework');
                flashFireWorks(1000);
                break;
            case GameEvent.GameWon:
                console.log('large firework');
                showFireWorks();
                break;
            default:
                break;
        }
    };

    const handlePipeClick = (pipeId: string) => {
        const event = game.handlePipeClick(pipeId);
        renderData = game.getRenderData();
        handleEvent(event);
    };
    newGame();
</script>

<div>
    {#each renderData?.pipes as pipe}
        <Pipe
            activatePipe={handlePipeClick}
            {pipe}
            activePipeId={renderData.activePipe}
        />
    {/each}
    {#if renderFireWorks}
        <Fireworks />
    {/if}
</div>

<style>
    div {
        display: flex;
    }
</style>
