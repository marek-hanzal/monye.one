"use client";

import {createEmotionCache} from "@mantine/core";

export const withEmotionCache = () => {
    const cache = createEmotionCache({
        key:           "emotion-cache",
        prepend:       true,
        stylisPlugins: [],
    });
    cache.compat = true;
    return cache;
};
