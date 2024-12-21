export const useCookies = () => {
    function setCookie(name: string, value: string, seconds: number = 86400): void {
        const date = new Date()
        date.setTime(date.getTime() + seconds * 1000)
        const expires = 'expires=' + date.toUTCString()
        document.cookie = `${name}=${value}; ${expires}; path=/`
    }

    function getCookie(name: string): string | null {
        const nameEQ = `${name}=`
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            cookie = cookie.trim()
            if (cookie.startsWith(nameEQ)) {
                return cookie.substring(nameEQ.length)
            }
        }
        return null
    }

    function deleteCookie(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    }

    function getCookieExpirationInSeconds(name: string): number | null {
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            cookie = cookie.trim()
            if (cookie.startsWith(`${name}=`)) {
                console.log(cookie)
                const cookieParts = cookie.split(';')
                for (let part of cookieParts) {
                    if (part.trim().startsWith('expires=')) {
                        const expireDateStr = part.split('=')[1].trim()
                        const expireDate = new Date(expireDateStr)
                        const now = new Date()
                        if (!isNaN(expireDate.getTime())) {
                            const secondsLeft = Math.max(
                                Math.floor((expireDate.getTime() - now.getTime()) / 1000),
                                0,
                            )
                            return secondsLeft
                        }
                    }
                }
            }
        }
        return null
    }

    return {
        setCookie,
        getCookie,
        deleteCookie,
        getCookieExpirationInSeconds,
    }
}
