export function formatDateTime(t: number) {
    return new Date(t).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: true
    })
}