<!-- Game.svelte -->
<script lang="ts">
    import {run} from './oxo';
    const chooseMove = run;

    // --- state
    let board = $state(Array(9).fill(null)); // 'X' | 'O' | null
    let xTurn = $state(true);
    let you = $state('X');                    // 'X' or 'O'
    let scored = $state(false);               // score recorded for this round?

    let youWins = $state(0), aiWins = $state(0), draws = $state(0);

    // --- derived
    let player = $derived(xTurn ? 'X' : 'O');        // whose turn symbol
    let ai = $derived(you === 'X' ? 'O' : 'X');

    const LINES = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    let winner: 'X' | 'O' | 'Draw' | null = $derived.by(() => {
        for (const [a,b,c] of LINES) {
            if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a]; // 'X'|'O'
        }
        return board.every(Boolean) ? 'Draw' : null;
    });

    // --- helpers
    function play(i: number) {
        if (board[i] || winner) return;
        board[i] = player;
        xTurn = !xTurn;
    }

    function newRound() {
        board = Array(9).fill(null);
        xTurn = true;
        scored = false;
    }

    function chooseSide(c : 'X' | 'O') {
        if (you !== c) {
            you = c;
            newRound(); // swap side between rounds
        }
    }

    // export: 9-char string, X/O/_ (underscore for empty)
    export function exportBoardString() {
        return board.map(v => v ?? '_').join('');
    }

    export function importBoardString(str: string) {
        const s = str.trim().toUpperCase();
        if (s.length !== 9) throw new Error('Board string must be exactly 9 characters');

        const next = Array(9);
        let x = 0, o = 0;

        for (let i = 0; i < 9; i++) {
            const c = s[i];
            if (c === 'X') { next[i] = 'X'; x++; }
            else if (c === 'O') { next[i] = 'O'; o++; }
            else if (c === '_') { next[i] = null; }
            else throw new Error(`Invalid char '${c}' at index ${i} (use X, O, or _)`);
        }

        // sanity check: X goes first, so counts must be x===o or x===o+1
        if (!(x === o || x === o + 1)) {
            throw new Error(`Invalid piece counts: X=${x}, O=${o}`);
        }

        board = next;
        // infer next player: if counts equal, it's X to move; otherwise O
        xTurn = (x === o);
        // board
    }

    // --- scoring (runs once when round finishes)
    $effect(() => {
        if (winner && !scored) {
            scored = true;
            if (winner === 'Draw') draws++;
            else if (winner === you) youWins++;
            else aiWins++;
        }
    });

    // --- AI turn
    function aiTurn() { return !winner && player !== you; }
    function aiPlay() {
        let new_board = chooseMove(exportBoardString());
        if (!new_board) {
            console.log("AI failed to choose a move.")
            return
        };
        importBoardString(new_board);
    }

    $effect(() => {
        if (aiTurn()) aiPlay();
    });
</script>

<div class="row">
    <button class:selected={you==='X'} onclick={() => chooseSide('X')}>You: X</button>
    <button class:selected={you==='O'} onclick={() => chooseSide('O')}>You: O</button>
</div>

<div class="board">
    {#each { length: 9 } as _, i}
        <button class="cell" onclick={() => play(i)} disabled={!!winner || !!board[i]}>
            {board[i] ?? ''}
        </button>
    {/each}
</div>

<p class="status">
    {#if winner === 'Draw'}
        Draw
    {:else if winner}
        {winner} wins
    {:else}
        {player}'s turn ({player === you ? 'You' : 'AI'})
    {/if}
</p>

<div class="row">
    <button onclick={newRound}>next round</button>
    <code>{exportBoardString()}</code>
</div>

<div class="scores">
    <strong>Score</strong>
    <span>You: {youWins}</span>
    <span>AI: {aiWins}</span>
    <span>Draws: {draws}</span>
</div>

<style>
    .board {
        display: grid;
        grid-template-columns: repeat(3, 64px);
        gap: 6px;
        margin: 10px 0;
    }
    .cell {
        width: 64px; height: 64px;
        font: 700 28px/1.1 system-ui, sans-serif;
        border: 1px solid #ccc; border-radius: 8px;
        background: #fff; cursor: pointer;
    }
    .cell:disabled { cursor: default; background: #f6f6f6; color: #333; }
    .status, .scores { margin-top: 6px; font: 500 14px system-ui, sans-serif; }
    .row { display: flex; align-items: center; gap: 8px; margin: 4px 0; }
    button { padding: 6px 10px; font: 12px system-ui, sans-serif; border-radius: 6px; }
    button.selected { background: #111; color: #fff; }
    code { user-select: all; font-size: 12px; padding: 2px 4px; background: #f0f0f0; border-radius: 4px; }
    .scores { display: flex; gap: 12px; align-items: baseline; }
    .scores strong { margin-right: 4px; }
</style>
