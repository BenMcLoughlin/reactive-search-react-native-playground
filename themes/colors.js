export const colors = {
    primary: '#F5B755',
    primaryAlt: '#eD9E6E',
    primaryBg: '#FCEACE',
    secondary: '#2A234E',
    tertiary: '#EF8777',
    green: '#4FCE82',
    white: '#FFFFFF',
    transparant: 'transparent',
    blue: '#0073D8',
    blueAlt: '#ECF6FF',
    grey5: '#F2f2f2',
    grey10: '#E6E6E6',
    grey25: '#BFBFBF',
    grey50: '#808080',
    grey75: '#404040',
    grey100: '#191919',
    brand: {
        primary: '#F5B755',
        primaryAlt: '#eD9E6E',
        primaryBg: '#FCEACE',
        secondary: '#2A234E',
        tertiary: '#EF8777'
    },
    ui: {
        green: '#4FCE82',
        white: '#FFFFFF',
        red: '#EF8777',
        transparant: 'transparent',
        blue: '#0073D8',
        blueAlt: '#ECF6FF'
    },
    grey: {
        lightest: '#F2f2f2',
        light: '#E6E6E6',
        medium: '#BFBFBF',
        dark: '#808080',
        darker: '#404040',
        darkest: '#191919'
    },
    bg: {
        primary: '#FFFFFF',
        secondary: '#FCFCFC'
    },
    text: {
        primary: '#262626',
        secondary: '#757575',
        disabled: '#9C9C9C',
        inverse: '#FFFFFF',
        error: '#D0421B',
        success: '#138000'
    }
};

export default colors;

export const colorProps = Object.keys(colors).map((color) => color);
