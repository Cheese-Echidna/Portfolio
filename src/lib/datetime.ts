export function formatDateTime(t: number) {
    return new Date(t).toLocaleString('en-GB', {
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour12: true
    })
}