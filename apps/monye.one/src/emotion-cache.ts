import { createEmotionCache } from "@mantine/core";

export const emotionCache = createEmotionCache({
    key: "emotion-cache",
    prepend: true,
    stylisPlugins: [],
});
