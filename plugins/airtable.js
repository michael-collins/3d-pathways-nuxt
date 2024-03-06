// plugins/airtable.js
import { defineNuxtPlugin } from '#app';
import { useAirtableStore } from '@/stores/airtableStore';

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) { // Ensure this code runs only on the client-side
        const airtableStore = useAirtableStore();
        const storedData = localStorage.getItem('airtableRecords');
        if (storedData) {
            const data = JSON.parse(storedData);
            airtableStore.setRecords(data);
        } else {
            // Fetch and store logic if localStorage doesn't have the data
        }
    }
});
