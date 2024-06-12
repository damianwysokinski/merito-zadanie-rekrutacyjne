export const useApiFetch = <T>(
    path: string,
) => {
    const runtimeConfig = useRuntimeConfig();
    return useFetch<T>(
        `${runtimeConfig.public.apiBase}/api/${path}`
    );
};
export const useFetchCharacters = () =>
    useApiFetch("character");