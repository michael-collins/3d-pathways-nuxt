// Retrieves records from Airtable for a given table name and API key.
// @param {string} tableName - The name of the table in Airtable.
//  @param {string} apiKey - The API key for accessing Airtable.
//  @returns {Promise<Array>} - A promise that resolves to an array of records.
// @throws {Error} - If an error occurs during the API request.

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