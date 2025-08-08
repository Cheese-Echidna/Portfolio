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

export function dateFilename(): string {
    const now = new Date();
    return now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + '.' +
        String(now.getMinutes()).padStart(2, '0') + '.' +
        String(now.getSeconds()).padStart(2, '0');
}