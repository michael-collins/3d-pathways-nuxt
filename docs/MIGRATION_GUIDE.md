# Airtable to Nuxt Content Migration

This guide explains how to migrate your Airtable data to Nuxt Content with OER Schema integration.

## Overview

The migration system:
1. Pulls all published records from Airtable
2. Converts them to Markdown files with OER Schema frontmatter
3. Creates reusable component data for rubrics and licenses
4. Maintains relationships between content types

## Migration Script

### Run Migration

```bash
npm run migrate:content
```

### What Gets Created

```
content/
├── data/
│   ├── rubrics.json          # Rubric data with criteria
│   └── licenses.json         # License data
├── pathways/
│   └── *.md                  # Course-level content
├── specializations/
│   └── *.md                  # Unit-level content (job roles)
├── lessons/
│   └── *.md                  # Lesson-level content
├── lectures/
│   └── *.md                  # Supporting materials
├── exercises/
│   └── *.md                  # Practice activities
└── projects/
    └── *.md                  # Assessment projects
```

## Content Structure

### Frontmatter

Each content file includes:
- **Basic metadata**: title, slug, type, published status
- **OER Schema**: Structured educational metadata
- **Relationships**: Links to parent/child content
- **Custom fields**: Content-specific data

Example exercise frontmatter:
```yaml
---
title: "Modeling the Airline Chair"
slug: modeling-airline-chair
type: oer:Practice
difficulty: beginner
youtubePlaylistID: PL-V2nChTadrXnIBdsAhYlYODx8f45Jk9f
image: /assets/exercises/chair.jpg
license: cc-by-4-0
rubric: exercise
published: true

oer:
  '@context': https://oerschema.org/
  '@type': [Practice, Assessment]
  name: Modeling the Airline Chair
  teaches:
    - Polygonal edge flow
    - Face extrusion techniques
  educationalLevel: Beginner
  
isPartOf:
  - slug: modeling-fundamentals
    type: oer:LearningComponent
---
```

## MDC Components

### Usage in Content Files

#### Rubric Component
```markdown
::rubric-component{id="exercise"}
::
```

Displays rubric with all criteria embedded.

#### License Component
```markdown
::license-component{id="cc-by-4-0"}
::
```

Displays license badge with link to full license.

#### Iframe Component
```markdown
::iframe-component
---
src: https://docs.google.com/presentation/d/ABC123/embed
title: Introduction to 3D Modeling
---
::
```

Embeds presentations, videos, etc.

#### OER Schema Component
```markdown
::oer-schema
::
```

Injects JSON-LD structured data for SEO and educational discoverability.

## Querying Content

### Get all lessons in a specialization
```typescript
const lessons = await queryContent('lessons')
  .where({
    'isPartOf.slug': 'cgi-foundations'
  })
  .sort({ order: 1 })
  .find()
```

### Get exercises with specific difficulty
```typescript
const beginnerExercises = await queryContent('exercises')
  .where({ difficulty: 'beginner' })
  .find()
```

### Get pathway with all specializations
```typescript
const pathway = await queryContent('pathways', 'short-film')
  .findOne()

const specSlugs = pathway.oer.hasPart.map(p => p.slug)
const specializations = await queryContent('specializations')
  .where({ slug: { $in: specSlugs } })
  .find()
```

### Load rubric/license data
```typescript
const { data: rubrics } = await useAsyncData('rubrics', () => 
  $fetch('/content/data/rubrics.json')
)

const { data: licenses } = await useAsyncData('licenses', () => 
  $fetch('/content/data/licenses.json')
)
```

## Content Relationships

```
Pathway (Course)
  └─> Specialization (Unit)
       └─> Lesson
            ├─> Lecture (SupportingMaterial)
            ├─> Exercise (Practice + Assessment)
            └─> Project (Assessment)
```

## Migration Notes

### ID Mapping
- Airtable record IDs are converted to slugs
- Relationships use slugs instead of IDs
- Original IDs preserved in component data for reference

### Published Records Only
- Only records with `published: true` are migrated
- Unpublished content stays in Airtable

### Content Cleanup
- Learning objectives are parsed from numbered lists
- Arrays are properly formatted
- Markdown content is preserved

### Component References
- Rubrics and licenses are referenced by slug
- Components load data from JSON files
- No database queries needed for simple lookups

## Testing Migration

1. **Backup Airtable**: Export all tables before migration
2. **Run migration**: `npm run migrate:content`
3. **Check output**: Review files in `content/` directory
4. **Test queries**: Run sample queries in dev mode
5. **Verify relationships**: Check that links work correctly
6. **Review components**: Test rubric and license components

## Troubleshooting

### Missing slugs
If content references don't resolve, check:
- All related records are published
- Record IDs are in the mapping
- Slugs are generated correctly

### Component not rendering
Verify:
- Component data JSON files exist
- Component is imported in content file
- ID/slug matches data file

### Broken relationships
Check:
- Parent/child relationships in Airtable
- `isPartOf` and `hasPart` arrays
- Slug generation is consistent

## Next Steps

After successful migration:

1. **Update Routes**: Create dynamic routes for new content
2. **Build Navigation**: Use queries to build menus
3. **Add Search**: Implement content search with Nuxt Content
4. **Test Links**: Verify all internal links work
5. **Deploy**: Test on staging before production
6. **Deprecate Airtable**: Once stable, remove Airtable dependencies

## Rollback

If you need to rollback:
```bash
# Delete migrated content
rm -rf content/pathways content/specializations content/lessons
rm -rf content/lectures content/exercises content/projects
rm -rf content/data

# Continue using Airtable cache
npm run dev
```

## Resources

- [OER Schema Documentation](https://oerschema.org/)
- [Nuxt Content Docs](https://content.nuxt.com/)
- [MDC Syntax](https://content.nuxt.com/usage/markdown)
