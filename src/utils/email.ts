import { Linking } from 'react-native'
export const sendEmail = async (props: any) => {
    const { to, subject, body, options = {} } = props
    const { cc, bcc } = options
    let url = `mailto:${to}`
    // Create email link query
    const query = JSON.stringify({
        subject,
        body,
        cc,
        bcc,
    })

    if (query.length) {
        url += `?${query}`
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url)

    if (!canOpen) {
        console.log('Provided URL can not be handled')
    }

    return Linking.openURL(url)
}
