export const useComparision = (): ((initialValue: number, finalValue: number) => number) => {
    function calculatePercentageChange(initialValue: number, finalValue: number): number {
        if (initialValue === 0) {
            throw new Error('Initial value cannot be zero.')
        }
        return +(((finalValue - initialValue) / initialValue) * 100).toFixed(2)
    }

    return calculatePercentageChange
}
