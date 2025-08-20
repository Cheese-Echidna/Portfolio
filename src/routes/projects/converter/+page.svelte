<script lang="ts">
    interface Row {
        Year: number;
        GBP: number;
        USD: number;
        AUD: number;
        GOLD: number;
    }

    const currencySymbol = new Map([
        ["GBP", "£"],
        ["USD", "US$"],
        ["AUD", "AU$"],
    ])

    const currencyConversion = new Map([
        ["GBP", 0.5345],
        ["USD", 0.6644],
        ["AUD", 1.0]
    ])

    const currencyList = currencySymbol.keys().toArray();

    import {onMount} from 'svelte';
    import Papa from "papaparse";

    let data: Row[] = $state([]);
    let dataMap = $derived(new Map(data.map((row) => [row.Year, row])));
    let yearsAvailable = $derived.by(() => new Map(currencyList.map((c) => {
        let years = data.filter((r) => !!r[c as keyof Row]).map((x) => x.Year);
        return [c, {
            start: Math.min(...years),
            end: Math.max(...years),
            years: years
        }];
    })));

    $inspect(yearsAvailable);

    onMount(() => {
        Papa.parse('/econ_data/main.csv', {
            download: true,     // fetches the file for you
            header: true,       // treat first row as keys
            complete: result => {
                // console.log(result.data);
                data = result.data as Row[];
            },
            error: err => {
                console.error('CSV parse error:', err);
            }
        });
    });

    let amount = $state<number | undefined>();
    let fromCurrency = $state<string | undefined>();
    let fromYear = $state<number | undefined>();
    let toCurrency = $state<string | undefined>();
    let toYear = $state<number | undefined>();

    let fromCurrentSymbol = $derived(currencySymbol.get(fromCurrency || "") || "");
    let toCurrentSymbol = $derived(currencySymbol.get(toCurrency || "") || "");

    let value = $derived.by(() => {
        if (!amount || !fromCurrency || !toCurrency || !fromYear || !toYear) {
            return undefined;
        }

        const row_source = dataMap.get(fromYear);
        const row_target = dataMap.get(toYear);

        if (!row_source || !row_target) {
            return undefined;
        }

        const cpi_source_year = row_source[fromCurrency as keyof Row];
        const cpi_target_year = row_target[toCurrency as keyof Row];

        const ratio = cpi_target_year / cpi_source_year;

        const quantity = amount * ratio;

        const toAud = currencyConversion.get(fromCurrency);
        const fromAud = currencyConversion.get(toCurrency);

        if (!fromAud || !toAud) {
            return undefined;
        }

        return quantity * fromAud / toAud;
    });

</script>

<br>
<form class="row">
    <label class="sr-only" for="amount">Amount</label>
    <span>How much is</span>

    <input
            bind:value={amount}
            id="amount"
            inputmode="decimal"
            min="0"
            placeholder="e.g. 100"
            step="any"
            type="number"
    />

    <label class="sr-only" for="fromCurr">From currency</label>
    <select aria-label="from currency" bind:value={fromCurrency} id="fromCurr">
        {#each currencyList as c}
            <option value={c}>{c}</option>
        {/each}
    </select>

    <span>in</span>

    <label class="sr-only" for="fromYear">From year</label>
    <select aria-label="from year" bind:value={fromYear} id="fromYear">
        {#each (yearsAvailable.get(fromCurrency || "")?.years || []) as y}
            <option value={y}>{y}</option>
        {/each}
    </select>

    <span>equivalent to in</span>

    <label class="sr-only" for="toCurr">To currency</label>
    <select aria-label="to currency" bind:value={toCurrency} id="toCurr">
        {#each currencyList as c}
            <option value={c}>{c}</option>
        {/each}
    </select>

    <span>in</span>

    <label class="sr-only" for="toYear">To year</label>
    <select aria-label="to year" bind:value={toYear} id="toYear">
        {#each (yearsAvailable.get(toCurrency || "")?.years || []) as y}
            <option value={y}>{y}</option>
        {/each}
    </select>

    <span>?</span>
</form>

<br>
<p class="preview">
    How much is {fromCurrentSymbol}{amount ?? '?'} in {fromYear} equivalent to in {toCurrency} in {toYear}?
</p>

{#if value}
    <h1>
        {toCurrentSymbol}{value.toFixed(2)}
    </h1>
{/if}

<style>
    .row {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        align-items: center;
    }

    input, select {
        padding: .5rem .6rem;
        border: 1px solid #d0d7de;
        border-radius: .5rem;
        font: inherit;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
        white-space: nowrap;
    }
</style>