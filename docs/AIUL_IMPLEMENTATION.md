# AIUL Attribution Implementation

## Overview

This project implements the [AI Usage License (AIUL)](https://dmd-program.github.io/aiul/) framework for exercises and projects. AIUL provides a clear, standardized way to communicate AI tool usage policies for educational content.

## Component

The AIUL attribution is implemented as an MDC component at [components/content/AIULComponent.vue](../components/content/AIULComponent.vue).

### Usage

```markdown
::aiul-component
---
title: Exercise Name
slug: exercise-slug
writing: cd-wr
images: na-im
code: lc-cd
---
::
```

### Props

- `title` (required): The title of the exercise/project
- `slug` (required): The URL slug of the exercise/project
- `writing` (optional): AIUL code for writing restrictions (e.g., `cd-wr`, `na-wr`, `lc-wr`, `uc-wr`)
- `images` (optional): AIUL code for image restrictions (e.g., `cd-im`, `na-im`, `lc-im`, `uc-im`)
- `code` (optional): AIUL code for code restrictions (e.g., `cd-cd`, `na-cd`, `lc-cd`, `uc-cd`)

### AIUL Codes

The AIUL framework uses two-part codes:

**Usage Level:**
- `na` - No AI (AI tools not permitted)
- `cd` - Cited & Disclosed (AI may be used for research; output must be student-generated)
- `lc` - Limited & Cited (AI may be used with citation; output must be primarily student-generated)
- `uc` - Unrestricted & Cited (AI may be used without restriction)

**Content Type:**
- `wr` - Writing
- `im` - Images
- `cd` - Code

**Examples:**
- `cd-wr` = "AI may be used for research; writing must be student-generated"
- `na-im` = "No AI-generated images permitted"
- `lc-cd` = "AI may be used with citation; code must be primarily student-generated"

## Airtable Schema

To use AIUL constraints, add the following fields to your Airtable Exercises and Projects tables:

- `aiUsageWriting` (Single select): Options: `cd-wr`, `na-wr`, `lc-wr`, `uc-wr`
- `aiUsageImages` (Single select): Options: `cd-im`, `na-im`, `lc-im`, `uc-im`
- `aiUsageCode` (Single select): Options: `cd-cd`, `na-cd`, `lc-cd`, `uc-cd`

## Migration Script

The migration script ([scripts/migrateToNuxtContent.js](../scripts/migrateToNuxtContent.js)) automatically:

1. Reads AI usage constraint fields from Airtable
2. Adds them to frontmatter
3. Generates AIUL component sections in markdown
4. Includes `aiUsageConstraint` array in OER schema frontmatter

Example frontmatter output:

```yaml
---
title: Introduction to rigging
slug: introduction-to-rigging
aiUsageWriting: cd-wr
aiUsageImages: na-im
oer:
  '@context': 'https://oerschema.org/'
  '@type': ['Practice', 'Assessment']
  aiUsageConstraint:
    - AIUL-CD-WR
    - AIUL-NA-IM
---
```

## OER Schema Integration

The `aiUsageConstraint` property is added to the OER schema in the frontmatter, following the [OERSchema.org Task specification](https://oerschema.org/). This allows for structured data representation of AI usage policies that can be consumed by learning management systems and educational platforms.

## Visual Design

The AIUL component uses:
- Purple color scheme for high visibility
- Shield icon to indicate policy/restriction
- Bordered box with background for clear distinction from content
- Bullet list format for multiple constraints
- Direct links to AIUL documentation for each code
- Explanatory text in parentheses for quick understanding

## Example Output

When rendered, the component displays:

> **AI Usage Policy:** [Introduction to rigging](#) has the following AI tool restrictions:
> 
> • **Writing:** [AIUL-CD-WR](https://dmd-program.github.io/aiul/combinations/cd-wr.html) (AI may be used for research; writing must be student-generated)
> 
> • **Images:** [AIUL-NA-IM](https://dmd-program.github.io/aiul/combinations/na-im.html) (No AI-generated images permitted)
> 
> ℹ️ [Learn more about AIUL (AI Usage License)](https://dmd-program.github.io/aiul/)

## Only for Exercises and Projects

AIUL attribution is only applicable to:
- Exercises (`oer:Practice`)
- Projects (`oer:Assessment`)

Other content types (pathways, lectures, specializations) do not include AI usage constraints as they are instructional materials, not assessments.
