<template>
    <NavBar />
    <div class="hero bg-base-200 py-10">
        <div class="hero-content text-left">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">Pathways</h1>
                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                    exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
        </div>
    </div>

    <LinkedCardComponent :records="records" destination="PathwayDetail" />
    {{ records }}
</template>

<script setup>
import { onMounted } from 'vue';
import { useAirtableStore } from '@/stores/airtableStore';
import { getAirtableRecords } from '@/services/airtableService'; // Ensure this import
import LinkedCardComponent from '@/components/LinkedCardComponent.vue';
import NavBar from '@/components/NavBar';

const airtableStore = useAirtableStore();

onMounted(async () => {
    if (!airtableStore.records.length) {
        const rawData = await getAirtableRecords('pathways');
        console.log("Raw Data:", rawData); // Debugging
        airtableStore.setRecords(rawData.map(record => ({
            id: record.id,
            name: record.fields.name,
            description: record.fields.description
        })));
    }
});

const records = airtableStore.records;
</script>

