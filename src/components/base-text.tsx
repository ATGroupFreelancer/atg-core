import { Fonts } from '../constants';
import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';


const DEFAULT_TEXT_COLOR = '#111'

export interface BaseTextProps {
    bold?: boolean;
    semiBold?: boolean;
    regular?: boolean;
    medium?: boolean;
    extraBold?: boolean;
    children: any
    numberOfLines?: number;
    style?: TextStyle;
    suppressHighlighting?: boolean;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    onPress?: () => void;
    adjustsFontSizeToFit?: boolean
    textProps: TextProps
}

export const BaseText = ({
    children,
    bold,
    semiBold,
    regular,
    medium,
    extraBold,
    numberOfLines,
    style,
    suppressHighlighting,
    ellipsizeMode,
    onPress,
    adjustsFontSizeToFit = false,
    textProps
}: BaseTextProps): JSX.Element => {
    const customStyle: TextStyle = { color: DEFAULT_TEXT_COLOR, fontFamily: Fonts.Regular };
    if (regular) {
        customStyle.fontFamily = Fonts.Regular
        customStyle.fontWeight = '400'
    } else if (medium) {
        customStyle.fontFamily = Fonts.Medium
        customStyle.fontWeight = '500';
    } else if (bold) {
        customStyle.fontFamily = Fonts.Bold
        customStyle.fontWeight = '700';
    } else if (semiBold) {
        customStyle.fontFamily = Fonts.SemiBold
        customStyle.fontWeight = '600';
    } else if (extraBold) {
        customStyle.fontFamily = Fonts.ExtraBold
        customStyle.fontWeight = '900';
    }
    return (
        <Text
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            onPress={onPress}
            style={[customStyle, style]}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            suppressHighlighting={suppressHighlighting}
            {...textProps}>
            {children}
        </Text>
    );
};