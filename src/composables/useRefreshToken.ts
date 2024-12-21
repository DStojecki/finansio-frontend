import { useCookies } from './useCookies'
import axios from '@/lib/axios/index'

const MILISECONDS_BEFORE_TOKEN_EXPIRES = 55000

export const useRefreshToken = () => {
    const { getCookie, setCookie } = useCookies()

    const updateAccessToken = async () => {
        const body = {
            refreshToken: getCookie('refreshToken'),
        }

        axios
            .post('authentication/refresh-tokens', body)
            .then(function (response) {
                const authExpiration = dateInXseconds(response.data.accessToken.ttl)

                setCookie('authExpiration', authExpiration, response.data.accessToken.ttl)
                setCookie(
                    'accessToken',
                    response.data.accessToken.token,
                    response.data.accessToken.ttl,
                )
                setCookie(
                    'refreshToken',
                    response.data.refreshToken.token,
                    response.data.refreshToken.ttl,
                )

                keepTokenUpdated()
            })
            .catch(function (error) {
                console.log(error)
            })
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
