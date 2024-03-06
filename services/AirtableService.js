export const getAirtableRecords = async (tableName, apiKey) => {
    const baseURL = `https://api.airtable.com/v0/appErImxpeRDom8je/${tableName}`;
  
    try {
        const response = await $fetch(baseURL, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        return response.records;
    } catch (error) {
        console.error(error);
        throw error;
    }
};