# Airtable Schema Analysis & OER Migration Strategy

**Date:** January 16, 2026  
**Current Status:** Data cached from Airtable, ready for migration to Nuxt Content + OER Schema

---

## Executive Summary

Your Airtable database is a **comprehensive educational resource management system** for 3D design and digital arts curriculum. It contains 10 interconnected tables managing learning pathways, exercises, projects, assessments, and supporting materials. The migration to Nuxt Content with OER (Open Educational Resources) Schema integration will preserve all relationships while adding powerful semantic markup for educational content discovery and reuse.

---

## Current Airtable Schema

### Core Tables Overview

#### 1. **Exercises** (Learning Activities)
Primary educational activities for students to complete.

**Key Fields:**
- `name` - Exercise title
- `description` - Overview text
- `difficulty` - Array: ["beginner", "intermediate", "advanced"]
- `learningObjectives` - Structured learning outcomes
- `instructions` - Step-by-step markdown content
- `youtubePlaylistID` - Associated video tutorials
- `vimeoShowcaseID` - Alternative video hosting
- `image` - Header image with thumbnails
- `fileAttachments` - Reference files, templates
- `files` - Links to files table
- `Pathways` - Links to pathways table
- `lessons` - Links to lessons table
- `licenses` - Links to licenses table
- `criteria` - Assessment criteria links
- `rubric` - Links to rubrics table
- `author` - Content creator
- `authorURL` - Creator's website/portfolio
- `published` - Boolean visibility flag

**Relationships:**
- Many-to-Many with Pathways
- Many-to-Many with Lessons  
- Many-to-Many with Licenses
- Many-to-Many with Criteria/Rubrics
- One-to-Many with Files

---

#### 2. **Projects** (Capstone Activities)
Larger, synthesis-level assignments combining multiple skills.

**Key Fields:**
- `name` - Project title
- `slug` / `slug-static` - URL identifiers
- `description` - Project overview
- `difficulty` - Skill level required
- `learningObjectives` - Expected outcomes
- `instructions` - Detailed requirements
- `requirements` - Prerequisites and criteria
- `image` - Visual representation
- `youtubePlaylistID` / `vimeoPlaylistID` - Tutorial videos
- `youtubeVideoID` / `vimeoVideoID` - Single video demos
- `associatedMaterial` - Related resources
- `rubrics` - Assessment frameworks
- `licenses` - Usage rights
- `files` - Supporting materials
- `downloads` - Attachment links
- `author` / `authorURL` - Attribution
- `published` - Visibility control

**Relationships:**
- Many-to-Many with Rubrics
- Many-to-Many with Licenses
- Many-to-Many with Files

---

#### 3. **Pathways** (Learning Sequences)
Structured curricula that group exercises into coherent learning paths.

**Key Fields:**
- `name` - Pathway title (e.g., "Fundamentals")
- `slug` - URL identifier
- `description` - Pathway overview
- `learningObjectives` - Overall goals
- `examples` - Sample work/demonstrations
- `exercises` - Ordered list of exercise IDs
- `competencies` - Linked skill areas
- `published` - Visibility

**Relationships:**
- Many-to-Many with Exercises
- Many-to-Many with Competencies

---

#### 4. **Specializations** (Career Tracks)
Professional focus areas grouping related competencies and exercises.

**Key Fields:**
- `name` - Specialization title
- `slug` - URL identifier
- `description` - Overview
- `roles` - Career positions
- `learningObjectives` - Specialization goals
- `examples` - Professional exemplars
- `exercises` - Related activities
- `competencies` - Required skills
- `published` - Visibility

**Relationships:**
- Many-to-Many with Exercises
- Many-to-Many with Competencies

---

#### 5. **Lessons** (Instructional Units)
Individual teaching modules or lecture content.

**Key Fields:**
- (Schema empty in current cache - needs investigation)

**Note:** This table may be deprecated or unused in current implementation.

---

#### 6. **Lectures** (Presentation Materials)
Slide decks and presentation content.

**Key Fields:**
- `name` - Lecture title
- `slug` - URL identifier
- `topics` - Subject areas covered
- `googleSlidesID` - Embedded presentation link
- `lessons` - Associated lesson IDs
- `author` - Presenter/creator
- `published` - Visibility

**Relationships:**
- Many-to-Many with Lessons

---

#### 7. **Criteria** (Assessment Dimensions)
Individual assessment measures used in rubrics.

**Key Fields:**
- `name` - Criterion title
- `description` - What is being assessed
- `rubric` - Parent rubric ID
- `exercises` - Linked exercises
- `published` - Visibility

**Relationships:**
- Many-to-One with Rubrics
- Many-to-Many with Exercises

---

#### 8. **Rubrics** (Assessment Frameworks)
Complete assessment tools grouping multiple criteria.

**Key Fields:**
- `name` - Rubric title
- `description` - Assessment purpose
- `criteria` - Array of criterion IDs
- `exercises` - Applicable exercises
- `published` - Visibility

**Relationships:**
- One-to-Many with Criteria
- Many-to-Many with Exercises
- Many-to-Many with Projects

---

#### 9. **Files** (Media Assets)
Reusable media files referenced across content.

**Key Fields:**
- `name` - File title
- `caption` - Description
- `alt` - Accessibility text
- `citation` - Source attribution
- `sourceUrl` - Original location
- `license` - Usage rights link
- `attachment` - File object with URL and thumbnails
- `exercises` - Linked exercises
- `published` - Visibility

**Relationships:**
- Many-to-Many with Exercises
- Many-to-One with Licenses

---

#### 10. **Licenses** (Rights Management)
Creative Commons and other licensing information.

**Key Fields:**
- `name` - License type (e.g., "CC BY-NC-SA 4.0")
- `url` - License deed URL
- `exercises` - Licensed exercises
- `projects` - Licensed projects
- `published` - Visibility

**Relationships:**
- Many-to-Many with Exercises
- Many-to-Many with Projects
- One-to-Many with Files

---

## Key Features Identified

### 1. **Hierarchical Learning Structure**
```
Specializations (Career Tracks)
  ├─> Pathways (Curricula)
  │     ├─> Exercises (Activities)
  │     │     ├─> Files (Media)
  │     │     ├─> Criteria (Assessment)
  │     │     └─> Licenses (Rights)
  │     └─> Lessons (Units)
  │           └─> Lectures (Presentations)
  └─> Competencies (Skills)

Projects (Capstone Work)
  ├─> Rubrics
  │     └─> Criteria
  ├─> Files
  └─> Licenses
```

### 2. **Rich Media Integration**
- YouTube and Vimeo video embedding
- Google Slides integration
- Image galleries with responsive thumbnails
- Downloadable file attachments (PDFs, .blend files, templates)

### 3. **Assessment System**
- Granular criteria-based rubrics
- Skill difficulty progression
- Learning objective tracking

### 4. **Content Reusability**
- Shared file libraries
- Reusable criteria across rubrics
- License management for OER compliance

### 5. **Attribution & Licensing**
- Author attribution fields
- Creative Commons integration
- Source URL tracking

---

## OER Schema Mapping Strategy

### Recommended OER Schema.org Types

#### For Exercises & Projects → `Course` or `LearningResource`
```json
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "learningResourceType": "Activity",
  "name": "Exercise Name",
  "description": "...",
  "educationalLevel": "beginner|intermediate|advanced",
  "teaches": ["Learning Objective 1", "Learning Objective 2"],
  "timeRequired": "PT2H",
  "inLanguage": "en-US",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "authorURL"
  },
  "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  "isPartOf": {
    "@type": "Course",
    "name": "Pathway Name"
  },
  "hasPart": [
    {
      "@type": "VideoObject",
      "embedUrl": "youtube URL"
    },
    {
      "@type": "MediaObject",
      "contentUrl": "file URL"
    }
  ]
}
```

#### For Pathways → `Course`
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Pathway Name",
  "description": "...",
  "educationalLevel": "...",
  "courseCode": "slug",
  "teaches": ["Competency 1", "Competency 2"],
  "hasPart": [
    {
      "@type": "LearningResource",
      "name": "Exercise 1"
    }
  ],
  "provider": {
    "@type": "Organization",
    "name": "Your Institution"
  }
}
```

#### For Specializations → `EducationalOccupationalProgram`
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "name": "Specialization Name",
  "description": "...",
  "occupationalCategory": "roles array",
  "educationalCredentialAwarded": "Certificate/Competency",
  "offers": {
    "@type": "Course",
    "name": "Pathway Name"
  }
}
```

#### For Rubrics → `EducationalAssessment`
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalAssessment",
  "name": "Rubric Name",
  "description": "...",
  "assessmentType": "Rubric",
  "educationalUse": "assessment",
  "assesses": ["Criterion 1", "Criterion 2"]
}
```

---

## Migration Strategy

### Phase 1: Content Structure (Week 1-2)

#### 1.1 Create Nuxt Content Collections
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  content: {
    sources: {
      exercises: {
        driver: 'fs',
        prefix: '/exercises',
        base: 'content/exercises'
      },
      projects: {
        driver: 'fs',
        prefix: '/projects',
        base: 'content/projects'
      },
      pathways: {
        driver: 'fs',
        prefix: '/pathways',
        base: 'content/pathways'
      },
      specializations: {
        driver: 'fs',
        prefix: '/specializations',
        base: 'content/specializations'
      },
      lectures: {
        driver: 'fs',
        prefix: '/lectures',
        base: 'content/lectures'
      },
      rubrics: {
        driver: 'fs',
        prefix: '/rubrics',
        base: 'content/rubrics'
      },
      licenses: {
        driver: 'fs',
        prefix: '/licenses',
        base: 'content/licenses'
      }
    }
  }
})
```

#### 1.2 Define Markdown Frontmatter Schema
Each content type gets a standardized frontmatter structure combining Airtable fields + OER Schema.

**Example: Exercise Template**
```yaml
---
# Airtable Fields
id: recksNEMV7vl5SFG4
name: "Modeling the Airline Chair"
slug: modeling-airline-chair
difficulty: beginner
published: true
author: "Instructor Name"
authorURL: "https://example.com"

# Media
image: /assets/exercises/airline-chair-header.jpg
imageAlt: "1930s Kem Weber Airline Chair"
youtubePlaylistID: "PL-V2nChTadrXnIBdsAhYlYODx8f45Jk9f"

# Learning Design
learningObjectives:
  - "Practice using 3D software interface and terminology"
  - "Use modeling workflows to create high quality topology"
  - "Demonstrate fundamental polygonal modeling operations"

# Relationships
pathways:
  - fundamentals
licenses:
  - cc-by-nc-sa-4.0
files:
  - airline-chair-ref-1
  - airline-chair-ref-2
rubrics:
  - modeling-fundamentals

# OER Schema.org
oer:
  type: LearningResource
  learningResourceType: Activity
  educationalLevel: beginner
  timeRequired: PT4H
  inLanguage: en-US
  teaches:
    - "Polygonal modeling"
    - "Edge flow optimization"
    - "Mirror modeling technique"
  isAccessibleForFree: true
  license: https://creativecommons.org/licenses/by-nc-sa/4.0/
---

# Modeling the Airline Chair

In this exercise, you will practice polygonal modeling fundamentals...

## Instructions

1. Create a folder on your computer...
2. Follow the six-part video demonstration...

## Learning Objectives

1. Practice using 3D software interface and terminology.
2. Use modeling workflows to create high quality topology and edge flow.
3. Demonstrate understanding of fundamental polygonal modeling operations.
```

### Phase 2: Data Migration Script (Week 2-3)

#### 2.1 Create Conversion Utility
```javascript
// scripts/migrateAirtableToContent.js

import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'
import slugify from 'slugify'

const CACHE_DIR = './public/cache'
const CONTENT_DIR = './content'

async function migrateExercises() {
  const data = await fs.readJSON(path.join(CACHE_DIR, 'exercises.json'))
  
  for (const record of data.exercises) {
    const slug = record.fields.slug || slugify(record.fields.name, { lower: true })
    const markdown = generateExerciseMarkdown(record)
    
    await fs.outputFile(
      path.join(CONTENT_DIR, 'exercises', `${slug}.md`),
      markdown
    )
  }
}

function generateExerciseMarkdown(record) {
  const { fields } = record
  
  const frontmatter = {
    id: record.id,
    name: fields.name,
    slug: fields.slug || slugify(fields.name, { lower: true }),
    difficulty: fields.difficulty?.[0] || 'beginner',
    published: fields.published || false,
    author: fields.author,
    authorURL: fields.authorURL,
    image: fields.image?.[0]?.url,
    imageAlt: fields.imageAlt,
    youtubePlaylistID: fields.youtubePlaylistID,
    vimeoShowcaseID: fields.vimeoShowcaseID,
    learningObjectives: parseObjectives(fields.learningObjectives),
    pathways: extractRelationIds(fields.Pathways),
    licenses: extractRelationIds(fields.licenses),
    files: extractRelationIds(fields.files),
    rubrics: extractRelationIds(fields.rubric),
    oer: generateOERSchema(fields)
  }
  
  const content = `
# ${fields.name}

${fields.description}

## Instructions

${fields.instructions}

## Learning Objectives

${formatObjectives(fields.learningObjectives)}
`
  
  return matter.stringify(content, frontmatter)
}

function generateOERSchema(fields) {
  return {
    type: 'LearningResource',
    learningResourceType: 'Activity',
    educationalLevel: fields.difficulty?.[0] || 'beginner',
    timeRequired: estimateTimeRequired(fields),
    inLanguage: 'en-US',
    teaches: parseObjectives(fields.learningObjectives),
    isAccessibleForFree: true,
    license: getLicenseURL(fields.licenses)
  }
}
```

#### 2.2 Handle Relationships
```javascript
// Use Nuxt Content's query system for relationships
// Instead of IDs, use slugs for cross-references

// In component:
const { data: exercise } = await useAsyncData(
  'exercise',
  () => queryContent('exercises').where({ slug: route.params.slug }).findOne()
)

// Fetch related pathway
const { data: pathway } = await useAsyncData(
  'pathway',
  () => queryContent('pathways').where({ slug: exercise.value.pathways[0] }).findOne()
)

// Fetch related files
const { data: files } = await useAsyncData(
  'files',
  () => queryContent('files').where({ slug: { $in: exercise.value.files } }).find()
)
```

### Phase 3: Component Migration (Week 3-4)

#### 3.1 Create OER-Enhanced Components
```vue
<!-- components/ExerciseCard.vue -->
<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface ExerciseContent extends ParsedContent {
  name: string
  difficulty: string
  image: string
  oer: {
    type: string
    learningResourceType: string
    educationalLevel: string
  }
}

const props = defineProps<{
  exercise: ExerciseContent
}>()

// Generate JSON-LD structured data for SEO
const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': props.exercise.oer.type,
  'name': props.exercise.name,
  'educationalLevel': props.exercise.oer.educationalLevel,
  'learningResourceType': props.exercise.oer.learningResourceType,
  'image': props.exercise.image,
  'url': `/exercises/${props.exercise.slug}`
}))
</script>

<template>
  <article>
    <!-- Structured data for search engines -->
    <script type="application/ld+json" v-html="JSON.stringify(jsonLd)" />
    
    <NuxtLink :to="`/exercises/${exercise.slug}`">
      <img :src="exercise.image" :alt="exercise.imageAlt" />
      <h3>{{ exercise.name }}</h3>
      <span class="badge">{{ exercise.difficulty }}</span>
    </NuxtLink>
  </article>
</template>
```

#### 3.2 Update Page Templates
```vue
<!-- pages/exercises/[slug].vue -->
<script setup lang="ts">
const route = useRoute()

const { data: exercise } = await useAsyncData(
  `exercise-${route.params.slug}`,
  () => queryContent('exercises')
    .where({ slug: route.params.slug })
    .findOne()
)

// Fetch related content
const { data: pathway } = await useAsyncData(
  'pathway',
  () => queryContent('pathways')
    .where({ slug: exercise.value.pathways[0] })
    .findOne(),
  { watch: [exercise] }
)

// SEO with OER metadata
useHead({
  title: exercise.value.name,
  meta: [
    { name: 'description', content: exercise.value.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: exercise.value.name }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        ...exercise.value.oer,
        name: exercise.value.name,
        description: exercise.value.description
      })
    }
  ]
})
</script>

<template>
  <div>
    <ContentDoc :path="`/exercises/${route.params.slug}`" />
    
    <!-- Show related pathway -->
    <aside v-if="pathway">
      <h3>Part of: {{ pathway.name }}</h3>
    </aside>
  </div>
</template>
```

### Phase 4: Search & Discovery (Week 4-5)

#### 4.1 Implement OER-Aware Search
```typescript
// composables/useOERSearch.ts
export const useOERSearch = () => {
  const search = async (query: string, filters: {
    difficulty?: string[]
    type?: string[]
    pathway?: string
  } = {}) => {
    let queryBuilder = queryContent()
      .where({ published: true })
    
    if (query) {
      queryBuilder = queryBuilder.where({
        $or: [
          { name: { $contains: query } },
          { description: { $contains: query } },
          { 'oer.teaches': { $contains: query } }
        ]
      })
    }
    
    if (filters.difficulty) {
      queryBuilder = queryBuilder.where({
        difficulty: { $in: filters.difficulty }
      })
    }
    
    if (filters.type) {
      queryBuilder = queryBuilder.where({
        'oer.learningResourceType': { $in: filters.type }
      })
    }
    
    return await queryBuilder.find()
  }
  
  return { search }
}
```

#### 4.2 Create OER API Endpoints
```typescript
// server/api/oer/search.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  const results = await queryContent()
    .where({ published: true })
    .where({
      $or: [
        { 'oer.teaches': { $contains: query.q } },
        { name: { $contains: query.q } }
      ]
    })
    .find()
  
  // Return OER-compliant JSON
  return results.map(item => ({
    '@context': 'https://schema.org',
    '@type': item.oer.type,
    '@id': `${event.node.req.headers.host}${item._path}`,
    ...item
  }))
})
```

### Phase 5: Testing & Validation (Week 5-6)

#### 5.1 Validate OER Schema
- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Verify with [Schema.org Validator](https://validator.schema.org/)
- Test with [Open Badge Validator](https://openbadges.org/validator/)

#### 5.2 Data Integrity Checks
```javascript
// scripts/validateMigration.js
// - Verify all relationships resolve
// - Check for broken file links
// - Ensure all required OER fields present
// - Validate markdown formatting
```

---

## Benefits of OER Schema Integration

### 1. **Enhanced Discoverability**
- Content appears in Google's Education Search
- Compatible with OER repositories (MERLOT, OER Commons)
- Better indexing by academic search engines

### 2. **Standardized Metadata**
- Interoperable with LMS platforms (Canvas, Moodle)
- Enables automated content aggregation
- Facilitates content sharing between institutions

### 3. **Accessibility**
- Structured data supports assistive technologies
- Clear learning objectives for all learners
- Transparent licensing for reuse

### 4. **Analytics & Insights**
- Track learning resource usage
- Identify popular pathways and difficulty progressions
- Measure educational impact

### 5. **Future-Proofing**
- Vendor-neutral format (markdown + JSON)
- Git-based version control
- Easy backup and migration
- API-ready for future integrations

---

## Recommended File Structure

```
content/
├── exercises/
│   ├── modeling-airline-chair.md
│   ├── chess-piece-modeling.md
│   └── ...
├── projects/
│   ├── static-image-project.md
│   └── ...
├── pathways/
│   ├── fundamentals.md
│   ├── intermediate-modeling.md
│   └── ...
├── specializations/
│   ├── 3d-generalist.md
│   └── ...
├── lectures/
│   ├── introduction-to-3d.md
│   └── ...
├── rubrics/
│   ├── modeling-fundamentals.md
│   └── ...
└── licenses/
    ├── cc-by-nc-sa-4.md
    └── ...

public/
└── assets/
    ├── exercises/
    ├── projects/
    ├── files/
    └── ...
```

---

## Next Steps

1. **Review this analysis** - Confirm the schema interpretation is accurate
2. **Prioritize content types** - Which tables to migrate first?
3. **Create sample migrations** - Test with 2-3 exercises
4. **Build migration script** - Automate the full conversion
5. **Update components** - Adapt existing Vue components to use Nuxt Content
6. **SEO testing** - Validate OER schema with Google's tools
7. **Gradual rollout** - Migrate table by table
8. **Deprecate Airtable** - Once fully migrated and tested

---

## Questions for Discussion

1. **Lessons table** - Is this active or can it be deprecated?
2. **Competencies** - Not in cache but referenced - separate table?
3. **Time estimates** - Should we add duration fields to exercises/projects?
4. **Prerequisites** - Track skill dependencies between exercises?
5. **Versioning** - How to handle content updates over time?
6. **User progress** - Need database for tracking student completion?

---

**Author:** GitHub Copilot  
**Generated:** January 16, 2026  
**Version:** 1.0
