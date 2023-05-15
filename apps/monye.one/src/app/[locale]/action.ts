"use server";

export const action = async (input: string): Promise<string> => {
    return new Promise(resolve => setTimeout(() => resolve(`input: ${input}`), 2500));
};
