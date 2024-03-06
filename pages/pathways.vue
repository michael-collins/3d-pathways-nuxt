<template>
    <div class="bg-base-200">
      <div class=" p-3">
        <NavBar />  
       
  
  
      </div>  
      <!-- <card-component card-component :records="records"></card-component> -->
      <LinkedCardComponent :records="records" destination="PathwayDetail" />
    </div>
  </template>
  
  <script>
  // import CardComponent from '@/components/CardComponent.vue';
  import LinkedCardComponent from '@/components/LinkedCardComponent.vue';
  import AirtableService from '@/services/AirtableService';
  import NavBar from '@/components/NavBar';
  
  export default {
   
    components: {
      // 'card-component': CardComponent,
      'LinkedCardComponent': LinkedCardComponent,
      'NavBar': NavBar
    },
    data() {
      return {
        records: [],
        activeId: null,
      };
    },
    mounted() {
      // Temporary test record
      const testRecord = {
        id: 'testRecord',
        fields: {
          name: 'Test Record Name',
          'learning objectives': 'Test learning objectives',
          description: 'This is an example description!',
          exercises: 'Test exercises',
          roles: 'A roles, a second role',
          examples: 'Test examples',
          competencies: 'Test competencies',
        },
      };
  
      AirtableService.getPathwayRecords().then(data => {
        this.records = data.records;
      }).catch(error => console.error(error));
      // Prepend the test record to the records array
      this.records.push(testRecord);
    },
  };
  </script>
    
  