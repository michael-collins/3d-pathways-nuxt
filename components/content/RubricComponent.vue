<script setup lang="ts">
const props = defineProps<{
  id?: string,        // For MDC usage: ::rubric-component{id="exercise"}
  rubric?: string,    // For template usage: <RubricComponent :rubric="exercise.rubric" />
  title?: string      // Optional title for context
}>()

// Embedded rubric database - no runtime fetch needed
const rubrics = {
  'exercise': {
    id: 'recviCCqLwU1SAn2Z',
    name: 'Exercise',
    description: 'An exercise assessment type is formative and tends to focus on evaluating mastery of a narrow set of competencies and capabilities, defined in the learning objectives.',
    criteria: [
      {
        id: 'recDvB7XFqiTA9AX6',
        name: 'Steps completed',
        description: 'This criteria assess whether you completed all parts of a given set of instructions.'
      },
      {
        id: 'recCfnMbyUIiHI3PT',
        name: 'Attention to detail',
        description: 'This criteria measures ability to use proper naming conventions and formats, meet submission deadlines, check to see that others are able to access submitted materials, and fulfills other specified requirements.'
      },
      {
        id: 'recgzIu9wDNGWpJhv',
        name: 'On time',
        description: 'This criterion checks to see if the assigned task was submitted on time. This indirectly assesses time management.'
      }
    ]
  },
  'exercise-low-poly': {
    id: 'recf5JXy6nxQxtm2o',
    name: 'Exercise Low Poly',
    description: 'Demonstration: Low Poly Animal\nThis week I want you to make a low poly animal. Ideally, you will have more than one reference image.',
    criteria: [
      {
        id: 'recDvB7XFqiTA9AX6',
        name: 'Steps completed',
        description: 'This criteria assess whether you completed all parts of a given set of instructions.'
      },
      {
        id: 'recCfnMbyUIiHI3PT',
        name: 'Attention to detail',
        description: 'This criteria measures ability to use proper naming conventions and formats, meet submission deadlines, check to see that others are able to access submitted materials, and fulfills other specified requirements.'
      },
      {
        id: 'recgzIu9wDNGWpJhv',
        name: 'On time',
        description: 'This criterion checks to see if the assigned task was submitted on time. This indirectly assesses time management.'
      }
    ]
  },
  'project': {
    id: 'rec4HpIJX13Q0Oar9',
    name: 'Project',
    description: 'A project assessment type is summative and tends to focus on evaluating mastery of a large scope of competencies and capabilities, defined in the learning objectives.',
    criteria: [
      {
        id: 'recEjg2iqFDPEmD00',
        name: 'Concept development',
        description: 'This criterion attempts to measure your ability to respond to project themes and learning objectives through creative thinking processes, account for technical and causal relationships through systems thinking, and show awareness of cultural contexts and philosophical or ideological mappings through critical thinking.'
      },
      {
        id: 'recWVHiInoUGO31VR',
        name: 'Technical mastery',
        description: 'This grading criterion measures your ability to quickly gain and apply necessary technical understanding. Working with new digital formats, following technical instructions, using digital and analog tools, and applying formal elements and principles of design can all be considered aspects of technical mastery.'
      },
      {
        id: 'recDvB7XFqiTA9AX6',
        name: 'Steps completed',
        description: 'This criteria assess whether you completed all parts of a given set of instructions.'
      }
    ]
  },
  'task': {
    id: 'rec13BE3J4oMAdD3S',
    name: 'Task',
    description: 'This formative assessment measures completeness of a given task. It is typically in the context of a larger assessment goal.',
    criteria: [
      {
        id: 'recgzIu9wDNGWpJhv',
        name: 'On time',
        description: 'This criterion checks to see if the assigned task was submitted on time. This indirectly assesses time management.'
      },
      {
        id: 'recDvB7XFqiTA9AX6',
        name: 'Steps completed',
        description: 'This criteria assess whether you completed all parts of a given set of instructions.'
      }
    ]
  },
  'written-statement': {
    id: 'recILtsGHw8Qheuf8',
    name: 'Written statement',
    description: 'This assessment measures your ability to communicate your ideas and scope of work fully and professionally.',
    criteria: [
      {
        id: 'reci1lnjIVyGiwSU9',
        name: 'Writing quality',
        description: 'This criterion measures your ability to write clearly, professionally, and with appropriate grammar and style.'
      },
      {
        id: 'rec8RBn3GbilCke2Q',
        name: 'Completeness',
        description: 'This criterion measures whether you have addressed all required elements of the written statement.'
      },
      {
        id: 'rectebGWNwSLoMwny',
        name: 'Originality',
        description: 'This criterion measures the originality and depth of your ideas and concepts.'
      },
      {
        id: 'recgzIu9wDNGWpJhv',
        name: 'On time',
        description: 'This criterion checks to see if the assigned task was submitted on time. This indirectly assesses time management.'
      }
    ]
  }
}

// Use rubric or id prop for compatibility
const rubricSlug = computed(() => props.rubric || props.id)
const rubricData = computed(() => rubricSlug.value ? rubrics[rubricSlug.value as keyof typeof rubrics] : null)
</script>

<template>
  <div v-if="rubricData" class="border border-base-300 rounded-lg m-8 p-4">
    <h3 class="prose pt-8 uppercase text-left text-lg pl-4">{{ rubricData.name }} Rubric</h3>
    <p class="prose pt-2 pb-8 px-6 text-left">{{ rubricData.description }}</p>
    <div class="overflow-x-auto">
      <table class="table table-sm">
        <thead>
          <tr>
            <th class="text-base-content">Criterion</th>
            <th class="text-base-content">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="criterion in rubricData.criteria" :key="criterion.id">
            <td>{{ criterion.name }}</td>
            <td>{{ criterion.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="rubricSlug" class="text-red-600">
    ⚠️ Rubric "{{ rubricSlug }}" not found
  </div>
</template>
