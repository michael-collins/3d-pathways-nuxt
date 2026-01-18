<script setup lang="ts">
const props = defineProps<{
  title: string
  slug: string
  writing?: string
  images?: string
  code?: string
}>()

// Map AIUL codes to their explanations
const aiulExplanations: Record<string, string> = {
  'cd-wr': 'AI may be used for research; writing must be student-generated',
  'na-wr': 'No AI-generated writing permitted',
  'lc-wr': 'AI may be used with citation; writing must be primarily student-generated',
  'uc-wr': 'AI may be used without restriction for writing',
  
  'cd-im': 'AI may be used for research; images must be student-generated',
  'na-im': 'No AI-generated images permitted',
  'lc-im': 'AI may be used with citation; images must be primarily student-generated',
  'uc-im': 'AI may be used without restriction for images',
  
  'cd-cd': 'AI may be used for research; code must be student-generated',
  'na-cd': 'No AI-generated code permitted',
  'lc-cd': 'AI may be used with citation; code must be primarily student-generated',
  'uc-cd': 'AI may be used without restriction for code'
}

// Build constraint list
const constraints = computed(() => {
  const list = []
  if (props.writing && typeof props.writing === 'string') {
    list.push({
      code: props.writing.toUpperCase(),
      url: `https://dmd-program.github.io/aiul/combinations/${props.writing.toLowerCase()}.html`,
      explanation: aiulExplanations[props.writing.toLowerCase()] || 'See AIUL documentation',
      label: 'Writing'
    })
  }
  if (props.images && typeof props.images === 'string') {
    list.push({
      code: props.images.toUpperCase(),
      url: `https://dmd-program.github.io/aiul/combinations/${props.images.toLowerCase()}.html`,
      explanation: aiulExplanations[props.images.toLowerCase()] || 'See AIUL documentation',
      label: 'Images'
    })
  }
  if (props.code && typeof props.code === 'string') {
    list.push({
      code: props.code.toUpperCase(),
      url: `https://dmd-program.github.io/aiul/combinations/${props.code.toLowerCase()}.html`,
      explanation: aiulExplanations[props.code.toLowerCase()] || 'See AIUL documentation',
      label: 'Code'
    })
  }
  return list
})

const exerciseUrl = computed(() => `/exercises/${props.slug}`)
</script>

<template>
  <div 
    v-if="constraints.length > 0" 
    class="aiul-attribution border-2 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 my-6"
    xmlns:oer="http://oerschema.org/"
  >
    <div itemscope itemtype="http://oerschema.org/Task">
      <div class="flex items-start gap-3">
        <Icon name="heroicons:shield-exclamation" class="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
        <div class="flex-1">
          <p class="text-sm leading-relaxed">
            <strong class="text-purple-900 dark:text-purple-100">AI Usage Policy:</strong>
            <a 
              class="link font-semibold text-purple-700 dark:text-purple-300 hover:underline mx-1" 
              rel="oer:mainEntityOfPage" 
              itemprop="url" 
              :href="exerciseUrl"
            >
              {{ title }}
            </a>
            has the following AI tool restrictions:
          </p>

          <ul class="mt-3 space-y-2">
            <li 
              v-for="(constraint, index) in constraints" 
              :key="constraint.code"
              class="flex items-start gap-2"
            >
              <span class="text-purple-600 dark:text-purple-400 font-bold">•</span>
              <div>
                <span class="font-medium text-purple-900 dark:text-purple-100">{{ constraint.label }}:</span>
                <span itemprop="aiUsageConstraint" class="ml-1">
                  <a 
                    class="link font-semibold text-purple-700 dark:text-purple-300 hover:underline" 
                    :href="constraint.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    AIUL-{{ constraint.code }}
                  </a>
                  <span class="aiul-explanation text-sm text-purple-800 dark:text-purple-200 ml-1">
                    ({{ constraint.explanation }})
                  </span>
                </span>
              </div>
            </li>
          </ul>

          <p class="mt-4 text-sm text-purple-700 dark:text-purple-300">
            <Icon name="heroicons:information-circle" class="w-4 h-4 inline-block mr-1" />
            <a 
              href="https://dmd-program.github.io/aiul/" 
              target="_blank" 
              class="link font-medium hover:underline"
              rel="noopener noreferrer"
            >
              Learn more about AIUL (AI Usage License)
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aiul-attribution {
  font-size: 0.95rem;
}
</style>
