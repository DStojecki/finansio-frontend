import { useCookies } from './useCookies'

const MILISECONDS_BEFORE_TOKEN_EXPIRES = 55000

export const useRefreshToken = () => {
    const { getCookie, setCookie } = useCookies()

    const updateAccessToken = async () => {
        const url = 'http://localhost:3000/authentication/refresh-tokens'

        try {
            const body = {
                refreshToken: getCookie('refreshToken'),
            }
            const request = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            const response = await request.json()
            const authExpiration = dateInXseconds(response.accessToken.ttl)

            setCookie('authExpiration', authExpiration, response.accessToken.ttl)
            setCookie('accessToken', response.accessToken.token, response.accessToken.ttl)
            setCookie('refreshToken', response.refreshToken.token, response.refreshToken.ttl)

            keepTokenUpdated()
        } catch (error) {
            console.log(error)
        }
    }

    const getMillisecondsUntil = (isoString: string | null): number | null => {
        if (!isoString) return null

        const futureDate = new Date(isoString)
        const now = new Date()

        if (isNaN(futureDate.getTime())) {
            return null
        }

        const millisecondsLeft = futureDate.getTime() - now.getTime()

        return millisecondsLeft >= 0 ? millisecondsLeft : 0
    }

    const keepTokenUpdated = async (): Promise<void> => {
        const authExpiration = getCookie('authExpiration')
        const timeToExpire = getMillisecondsUntil(authExpiration)

        if (timeToExpire === null) return

        setTimeout(updateAccessToken, timeToExpire - MILISECONDS_BEFORE_TOKEN_EXPIRES)
    }

    const dateInXseconds = (seconds: number): string => {
        const date = new Date()
        date.setTime(date.getTime() + seconds * 1000)

        return date.toISOString()
    }

    return {
        keepTokenUpdated,
        dateInXseconds,
    }
}
