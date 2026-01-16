# OER Schema Architecture for 3D Pathways

**Based on:** [OERSchema.org](https://oerschema.org/)  
**Date:** January 16, 2026  
**Status:** Design Phase

---

## Content Hierarchy with OER Schema Mapping

```
Pathways (oer:Course)
  └─> Specializations (oer:LearningComponent)
        └─> Lessons (oer:LearningComponent)
              ├─> Lectures (oer:SupportingMaterial)
              ├─> Topics (oer:ReferencedMaterial) [Future]
              ├─> Exercises (oer:Practice + oer:Assessment)
              ├─> Quizzes (oer:Assessment) [Future]
              └─> Projects (oer:Assessment)
```

---

## OER Schema Type Definitions

### 1. **Pathway** → `oer:Course`
A complete learning program leading to a specific outcome (e.g., "Short Film Production")

```yaml
# content/pathways/short-film.md
---
title: "Short Film Production"
slug: short-film
type: oer:Course

oer:
  "@context": "https://oerschema.org/"
  "@type": "Course"
  courseCode: "short-film"
  name: "Short Film Production Pathway"
  description: "Complete pathway for creating short animated films"
  
  # Learning outcomes
  teaches:
    - "Pre-production planning and storyboarding"
    - "3D animation production pipeline"
    - "Post-production and compositing"
    - "Audio integration and final delivery"
  
  # Specializations (as course components)
  hasPart:
    - slug: cgi-foundations
      type: oer:LearningComponent
    - slug: introductory-animation
      type: oer:LearningComponent
    - slug: compositing
      type: oer:LearningComponent
    - slug: animation-for-film-production
      type: oer:LearningComponent
  
  # Metadata
  duration: "PT6M"  # 6 months
  inLanguage: "en-US"
  isAccessibleForFree: true
  license: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  
  # Provider
  provider:
    type: "Organization"
    name: "Your Institution"
---

# Short Film Production Pathway

Complete learning pathway for creating professional short animated films...
```

---

### 2. **Specialization** → `oer:LearningComponent`
A focused unit on a specific skill area or job role

```yaml
# content/specializations/cgi-foundations.md
---
title: "CGI Foundations"
slug: cgi-foundations
type: oer:LearningComponent

# Metadata
whoItsFor: "For those interested in gaining foundational knowledge of 3D tools and techniques."
targetRole: "3D Generalist"
prerequisite: null

oer:
  "@context": "https://oerschema.org/"
  "@type": "LearningComponent"
  name: "CGI Foundations"
  componentType: "Unit"
  
  # Learning objectives
  teaches:
    - "Understand the fundamental principles of CGI and its applications"
    - "Develop proficiency in using basic 3D modeling tools and techniques"
    - "Gain knowledge of essential 3D rendering elements"
    - "Learn to create and manipulate 3D assets"
    - "Explore the CGI project pipeline from concept to output"
    - "Analyze the history and evolution of CGI across industries"
  
  # Contains lessons
  hasPart:
    - slug: history-of-cgi
      type: oer:LearningComponent
    - slug: modeling-fundamentals
      type: oer:LearningComponent
    - slug: texturing-and-uv-mapping
      type: oer:LearningComponent
    - slug: lighting-basics
      type: oer:LearningComponent
    - slug: camera-fundamentals
      type: oer:LearningComponent
    - slug: rendering-techniques
      type: oer:LearningComponent
  
  # Assessments
  hasAssessment:
    - slug: modeling-a-chair
      type: oer:Assessment
    - slug: modeling-a-room
      type: oer:Assessment
  
  # Competency requirements
  competencyRequired:
    - "Polygonal models have good edge flow"
    - "Models have appropriate polygon density"
    - "Textures have minimal stretching"
    - "UVs are clearly laid out and well packed"
    - "PBR materials are properly configured"
    - "Good file and asset organization"
    - "Scene is well lit using scene lights or emissive materials"
    - "Renders are high quality"
    - "Take and get a B+ or better on all lecture quizzes"
  
  # Metadata
  duration: "PT8W"  # 8 weeks
  educationalLevel: "Beginner"
  inLanguage: "en-US"
  license: "https://creativecommons.org/licenses/by-nc-sa/4.0/"

# Part of pathway
isPartOf:
  - slug: short-film
    type: oer:Course
  - slug: 3d-generalist
    type: oer:Course
---

# CGI Foundations

## Who It's For
For those interested in gaining foundational knowledge of 3D tools and techniques.

## Learning Objectives
1. Understand the fundamental principles of computer-generated imagery (CGI)...
```

---

### 3. **Lesson** → `oer:LearningComponent`
An instructional unit that organizes related materials

```yaml
# content/lessons/modeling-fundamentals.md
---
title: "Modeling Fundamentals"
slug: modeling-fundamentals
type: oer:LearningComponent

oer:
  "@context": "https://oerschema.org/"
  "@type": "LearningComponent"
  name: "Modeling Fundamentals"
  componentType: "Lesson"
  
  # What this lesson teaches
  teaches:
    - "Polygonal modeling terminology and concepts"
    - "Edge flow and topology principles"
    - "Basic modeling operations: extrude, loop cut, subdivide"
    - "Mirror modeling techniques"
  
  # Supporting materials (lectures)
  hasSupportingMaterial:
    - slug: intro-to-3d-modeling
      type: oer:SupportingMaterial
      materialType: "Lecture"
    - slug: topology-and-edge-flow
      type: oer:SupportingMaterial
      materialType: "Lecture"
  
  # Practice activities (exercises)
  hasPractice:
    - slug: basic-shapes-exercise
      type: oer:Practice
    - slug: mirror-modeling-exercise
      type: oer:Practice
  
  # Assessment (projects)
  hasAssessment:
    - slug: modeling-airline-chair
      type: oer:Assessment
  
  # Metadata
  duration: "PT2W"  # 2 weeks
  educationalLevel: "Beginner"
  
# Part of specialization
isPartOf:
  - slug: cgi-foundations
    type: oer:LearningComponent
---

# Modeling Fundamentals

Learn the core concepts and techniques of 3D polygonal modeling...
```

---

### 4. **Lecture** → `oer:SupportingMaterial`
Presentation/instructional content

```yaml
# content/lectures/intro-to-3d-modeling.md
---
title: "Introduction to 3D Modeling"
slug: intro-to-3d-modeling
type: oer:SupportingMaterial

# Lecture-specific fields
googleSlidesID: "1abc123xyz"
topics:
  - "3D coordinate systems"
  - "Vertices, edges, faces"
  - "Object vs Edit mode"
author: "Instructor Name"

oer:
  "@context": "https://oerschema.org/"
  "@type": "SupportingMaterial"
  name: "Introduction to 3D Modeling"
  materialType: "Slide Deck"
  
  # What concepts this covers
  about:
    - "3D modeling fundamentals"
    - "Blender interface"
    - "Basic modeling operations"
  
  # Format
  encodingFormat: "application/vnd.google-apps.presentation"
  
  # Metadata
  duration: "PT45M"  # 45 minutes
  inLanguage: "en-US"
  license: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  
# Part of lesson
isPartOf:
  - slug: modeling-fundamentals
    type: oer:LearningComponent
---

# Introduction to 3D Modeling

[Embedded Google Slides]
```

---

### 5. **Exercise** → `oer:Practice` + `oer:Assessment`
Guided practice activity

```yaml
# content/exercises/modeling-airline-chair.md
---
title: "Modeling the Airline Chair"
slug: modeling-airline-chair
type: oer:Practice

# Exercise-specific fields
difficulty: beginner
youtubePlaylistID: "PL-V2nChTadrXnIBdsAhYlYODx8f45Jk9f"
image: /assets/exercises/airline-chair-header.jpg
imageAlt: "1930s Kem Weber Airline Chair"

oer:
  "@context": "https://oerschema.org/"
  "@type": 
    - "Practice"
    - "Assessment"  # It's both practice AND assessment
  name: "Modeling the Airline Chair"
  
  # What skills this develops
  educationalUse: 
    - "practice"
    - "assessment"
  
  # Learning objectives
  teaches:
    - "Polygonal edge flow"
    - "Face extrusion techniques"
    - "Edge loop insertion"
    - "Mirror modeling"
    - "Vertex, edge, and face manipulation"
  
  # Assessment criteria
  assesses:
    - "Edge flow quality"
    - "Polygon density appropriateness"
    - "Model accuracy to reference"
  
  # Supporting videos
  hasSupportingMaterial:
    - type: "VideoObject"
      name: "Airline Chair Tutorial"
      embedUrl: "https://youtube.com/playlist?list=PL-V2nChTadrXnIBdsAhYlYODx8f45Jk9f"
  
  # Files provided
  hasReferenceMaterial:
    - type: "MediaObject"
      name: "Reference Images"
      contentUrl: "/assets/exercises/chair-reference.jpg"
  
  # Metadata
  duration: "PT4H"  # 4 hours
  educationalLevel: "Beginner"
  inLanguage: "en-US"
  
  # Rubric
  evaluationCriteria:
    - "Clean topology with good edge flow"
    - "Accurate proportions matching reference"
    - "Proper use of mirror modifier"
    - "Well-organized scene file"

# Part of lesson
isPartOf:
  - slug: modeling-fundamentals
    type: oer:LearningComponent

# License and attribution
author: "Instructor Name"
license: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
---

# Modeling the Airline Chair

Practice polygonal modeling by recreating the iconic 1930s Kem Weber Airline Chair...

## Instructions
1. Create a folder on your computer...
2. Follow the six-part video demonstration...

## Learning Objectives
1. Practice using 3D software interface and terminology
2. Use modeling workflows to create high quality topology
3. Demonstrate fundamental polygonal modeling operations
```

---

### 6. **Project** → `oer:Assessment`
Synthesis-level assessment

```yaml
# content/projects/room-interior.md
---
title: "Interior Room Design"
slug: room-interior
type: oer:Assessment

# Project-specific fields
difficulty: intermediate
requirements:
  - "Completed Modeling Fundamentals lesson"
  - "Completed Texturing lesson"
  - "Completed Lighting lesson"

oer:
  "@context": "https://oerschema.org/"
  "@type": "Assessment"
  name: "Interior Room Design Project"
  assessmentType: "Project"
  
  # What this assesses
  assesses:
    - "3D modeling proficiency"
    - "Texturing and UV mapping skills"
    - "Lighting and atmosphere creation"
    - "Composition and artistic judgment"
  
  # Evaluation criteria
  evaluationCriteria:
    - "Models have clean topology"
    - "Textures are properly applied with minimal stretching"
    - "Scene is well-lit and atmospheric"
    - "Composition is visually compelling"
    - "Final render is high quality"
  
  # Rubric reference
  hasRubric:
    slug: modeling-and-rendering-rubric
    type: oer:Rubric
  
  # Metadata
  duration: "PT16H"  # 16 hours
  educationalLevel: "Intermediate"
  
# Part of specialization
isPartOf:
  - slug: cgi-foundations
    type: oer:LearningComponent
---

# Interior Room Design Project

Create a fully modeled, textured, and lit interior room scene...
```

---

### 7. **Topic** → `oer:ReferencedMaterial` (Future)
External reference materials

```yaml
# content/topics/pbr-materials.md
---
title: "Physically Based Rendering Materials"
slug: pbr-materials
type: oer:ReferencedMaterial

oer:
  "@context": "https://oerschema.org/"
  "@type": "ReferencedMaterial"
  name: "PBR Materials Reference"
  
  # External resources
  citation:
    - author: "Substance Academy"
      url: "https://substance3d.adobe.com/tutorials/"
      name: "PBR Texturing Guide"
    - author: "Marmoset"
      url: "https://marmoset.co/posts/basic-theory-of-physically-based-rendering/"
      name: "Basic Theory of PBR"
  
  # What concepts this covers
  about:
    - "Physically based rendering"
    - "Material properties"
    - "Metallic vs roughness workflows"

# Referenced by lessons
isReferencedBy:
  - slug: texturing-and-uv-mapping
    type: oer:LearningComponent
---

# PBR Materials Reference

External resources for understanding physically based rendering...
```

---

## MDC Component for OER Metadata

### Plugin: `plugins/oer-schema.ts`

```typescript
// plugins/oer-schema.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Helper to generate OER JSON-LD
  const generateOERJsonLd = (content: any) => {
    if (!content.oer) return null

    const jsonLd = {
      '@context': 'https://oerschema.org/',
      '@id': `${nuxtApp.$config.public.siteUrl}${content._path}`,
      ...content.oer,
      
      // Add page-specific data
      name: content.title,
      url: `${nuxtApp.$config.public.siteUrl}${content._path}`,
      
      // Add author if present
      ...(content.author && {
        author: {
          '@type': 'Person',
          name: content.author,
          ...(content.authorURL && { url: content.authorURL })
        }
      }),
      
      // Add license
      ...(content.license && {
        license: content.license
      }),
      
      // Add image if present
      ...(content.image && {
        image: content.image
      })
    }

    return jsonLd
  }

  // Provide globally
  return {
    provide: {
      oerSchema: {
        generate: generateOERJsonLd
      }
    }
  }
})
```

### MDC Component: `components/content/OERSchema.vue`

```vue
<script setup lang="ts">
import { useContent } from '#imports'

const { page } = useContent()
const { $oerSchema } = useNuxtApp()

const jsonLd = computed(() => {
  if (!page.value?.oer) return null
  return $oerSchema.generate(page.value)
})
</script>

<template>
  <script 
    v-if="jsonLd" 
    type="application/ld+json" 
    v-html="JSON.stringify(jsonLd, null, 2)"
  />
</template>
```

### Usage in MDC Files

```markdown
<!-- content/exercises/example.md -->
---
title: "Example Exercise"
oer:
  "@type": "Practice"
  teaches: ["Skill 1", "Skill 2"]
---

::oer-schema
::

# Example Exercise

Your content here...
```

---

## File Structure

```
content/
├── pathways/
│   ├── short-film.md
│   ├── 3d-generalist.md
│   └── game-artist.md
│
├── specializations/
│   ├── cgi-foundations.md
│   ├── introductory-animation.md
│   ├── compositing.md
│   └── animation-for-film-production.md
│
├── lessons/
│   ├── history-of-cgi.md
│   ├── modeling-fundamentals.md
│   ├── texturing-and-uv-mapping.md
│   ├── lighting-basics.md
│   ├── camera-fundamentals.md
│   └── rendering-techniques.md
│
├── lectures/
│   ├── intro-to-3d-modeling.md
│   ├── topology-and-edge-flow.md
│   └── pbr-materials-overview.md
│
├── exercises/
│   ├── basic-shapes-exercise.md
│   ├── mirror-modeling-exercise.md
│   └── modeling-airline-chair.md
│
├── projects/
│   ├── modeling-a-chair.md
│   ├── modeling-a-room.md
│   └── short-film-production.md
│
└── topics/ (future)
    ├── pbr-materials.md
    └── animation-principles.md
```

---

## Navigation Queries

### Get all lessons in a specialization
```typescript
const lessons = await queryContent('lessons')
  .where({
    'isPartOf': {
      $contains: { slug: 'cgi-foundations' }
    }
  })
  .sort({ order: 1 })
  .find()
```

### Get all exercises for a lesson
```typescript
const exercises = await queryContent('exercises')
  .where({
    'isPartOf': {
      $contains: { slug: 'modeling-fundamentals' }
    }
  })
  .find()
```

### Get pathway with all specializations
```typescript
const pathway = await queryContent('pathways', route.params.slug).findOne()

const specializations = await queryContent('specializations')
  .where({
    slug: { $in: pathway.oer.hasPart.map(p => p.slug) }
  })
  .find()
```

---

## Benefits of OER Schema

1. **Educational Standards Compliance** - Aligns with global OER metadata standards
2. **Interoperability** - Content can be imported into LMS platforms
3. **Discovery** - Better indexing in educational search engines
4. **Reusability** - Clear licensing and attribution
5. **Assessment Tracking** - Structured competency and assessment data
6. **Accessibility** - Machine-readable learning objectives

---

## Next Steps

1. Create sample content files for each type
2. Build MDC components for OER display
3. Implement relationship queries
4. Add OER JSON-LD to all pages
5. Validate with OER validators
6. Test with educational search engines
