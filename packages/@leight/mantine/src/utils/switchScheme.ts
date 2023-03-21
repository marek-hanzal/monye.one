import {type MantineTheme} from "@mantine/core";

export const switchScheme = <T>(
    theme: MantineTheme,
    onDark: T,
    onLight: T
): T => (theme.colorScheme === "dark" ? onDark : onLight);
