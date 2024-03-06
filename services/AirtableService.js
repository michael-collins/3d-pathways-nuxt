import { useRuntimeConfig } from '#imports';

    export const getAirtableRecords = async (tableName) => {
    const config = useRuntimeConfig();
    // console.log("API Key:", config.airtableApiKey); // Debugging: Check if API key is fetched correctly

    const baseURL = `https://api.airtable.com/v0/appErImxpeRDom8je/${tableName}`;
    const apiKey = config.airtableApiKey;
    
    try {
        const response = await $fetch(baseURL, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        return response.records; // Adjusting to return just the records array
    } catch (error) {
        console.error(error);
        throw error; // It's useful to re-throw the error for further handling upstream
    }
};
