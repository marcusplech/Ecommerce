const colors = {
    blue: "#1F1B24",
    white: "#E9EAEB",
    whiteLight: "#FFF",
    gray: "#1F1F1F",
    black: "#121212",
    black1: "#222",
    purple: "#BB86FC",
    descWhite: "#757575",
    descDark: "#313131",
};

export const LIGHT_MODE = {
    background: colors.whiteLight,
    nav: colors.whiteLight,
    primary: colors.whiteLight,
    secondary: colors.whiteLight,
    text: "inherit",
    icon: colors.black,
    description: colors.descWhite,
};

export const DARK_MODE = {
    background: colors.black,
    nav: colors.gray,
    primary: colors.purple,
    secondary: colors.policeBlue,
    text: colors.white,
    icon: colors.purple,
    description: colors.descDark,
};

export default colors;
