import he from 'he'
import { isString, trimStart } from 'lodash'

export const checkURL = (str: string) => {
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const regex = new RegExp(expression)
    return regex.test(str)
}

export const getImageUrl = (str: string): string | undefined => {
    const expression = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i
    const regex = new RegExp(expression)
    const urls = regex.exec(str)
    return urls?.[0]
}

export const getContentText = (htmlStr: string, inlineText = false, customBullet?: string): string | undefined => {
    if (!htmlStr || !isString(htmlStr)) return htmlStr

    const bullet = customBullet || (inlineText ? ' &#9900; ' : '&#10;&#8226; ')
    const newLine = inlineText ? ' ' : '&#10;'

    const formattedString = he.decode(
        htmlStr
            ?.replace(/<li><br><\/li>/g, '')
            ?.replace(/<li.*?>/g, `<li>${bullet}`)
            ?.replace(/><p.*?>/g, `>${newLine}<p>`)
            ?.replace(/><div.*?>/g, `>${newLine}<div>`)
            ?.replace(/<[^>]+>/g, '')
    )

    return trimStart(formattedString)
}
