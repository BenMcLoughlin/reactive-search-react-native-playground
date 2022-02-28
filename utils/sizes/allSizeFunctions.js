import { Platform, Dimensions } from 'react-native';
import { scale as sizeMattersScale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (SCREEN_HEIGHT >= 812 || SCREEN_WIDTH >= 812 || SCREEN_HEIGHT >= 896 || SCREEN_WIDTH >= 896)
    );
}

export const getScreenHeight = () => SCREEN_HEIGHT;
export const getScreenWidth = () => SCREEN_WIDTH;

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }

    return regularStyle;
}

export const isIos = () => Platform.OS === 'ios';

export const getStatusBarHeight = () => {
    const INNER_STATUS_BAR_HEIGHT = isIphoneX() ? 44 : 20;
    return isIos() ? INNER_STATUS_BAR_HEIGHT : 40;
};

export const getHeaderHeight = () => {
    const INNER_HEADER_HEIGHT = isIphoneX() ? 98 : 74;
    return isIos() ? INNER_HEADER_HEIGHT : 96;
};

export const getNavBarHeight = () => getHeaderHeight() - getStatusBarHeight();

export const scale = (px) => {
    return SCREEN_WIDTH < 700 ? sizeMattersScale(px) : px * 1.5;
};

export const verticalScale = (px) => {
    return SCREEN_HEIGHT < 700
        ? px * 0.9
        : SCREEN_HEIGHT > 1000
        ? px
        : Platform.OS === 'android'
        ? sizeMattersScale(px * 0.92)
        : sizeMattersScale(px);
};
