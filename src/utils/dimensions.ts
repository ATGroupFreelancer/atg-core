import { Dimensions, Platform } from 'react-native'

const remarkableIOSVersion = 13.0
const CORE_RATIO = 667 / 375
const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height
const ScreenScale = CORE_RATIO / (ScreenHeight / ScreenWidth)
const guidelineBaseWidth = 375
const guidelineBaseHeight = 667
const width = (num: number) => ScreenWidth * (num / 100)
const height = (num: number) => ScreenHeight * (num / 100)
const scale = (size: number) => (ScreenWidth / guidelineBaseWidth) * size
const verticalScale = (size: number) => (ScreenHeight / guidelineBaseHeight) * size
const heightScale = (num: number) => ScreenHeight * ((num * ScreenScale) / 100)
const widthScale = (num: number) => ScreenWidth * ((num * ScreenScale) / 100)
const isIos = Platform.OS === 'ios'
const enabledFormSheet = isIos && parseFloat(Platform.Version as string) >= remarkableIOSVersion
export { enabledFormSheet, isIos, scale, width, height, heightScale, widthScale, verticalScale, ScreenWidth, ScreenHeight }
