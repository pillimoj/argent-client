<script lang="ts">
    import { Game } from '../../marbles/Game';
    import { GameEvent } from '../../marbles/GameEvent';
    import type { RenderData } from '../../marbles/RenderData';
    import Pipe from './Pipe.svelte';

    // TODO: Fireworks
    // TODO: New game dialog
    // TODO: Remember player

    let game: Game | null = null;
    let renderData: RenderData | null = null;

    const newGame = () => {
        game = new Game(6);
        renderData = game.getRenderData();
    };

    const handleEvent = (event: GameEvent | null) => {
        switch (event) {
            case GameEvent.PipeFinished:
                console.log('small firework');
                break;
            case GameEvent.GameWon:
                console.log('large firework');
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
</div>

<style>
    div {
        display: flex;
    }
</style>
