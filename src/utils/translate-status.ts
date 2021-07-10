export const translateStatus = (status: string) => {
    switch (status) {
        case 'done':
            return 'Готов';
        case 'pending':
            return 'Создан';
        default:
            return ''
    }
}