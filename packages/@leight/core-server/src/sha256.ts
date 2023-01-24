export const sha256 = async (input: string) =>
    (await import("node:crypto"))
        .createHash("sha256")
        .update(input)
        .digest("hex");
