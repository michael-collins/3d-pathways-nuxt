# Airtable to Nuxt Content Migration Roadmap

**Project:** 3D Pathways Educational Platform  
**Goal:** Migrate from Airtable to Nuxt Content with OER Schema integration  
**Timeline:** 6 weeks  
**Status:** Planning Phase

---

## Week 1: Foundation & Proof of Concept

### Day 1-2: Setup & Configuration
- [ ] Install additional dependencies
  ```bash
  npm install gray-matter js-yaml turndown
  npm install -D @types/js-yaml
  ```
- [ ] Configure Nuxt Content collections in `nuxt.config.ts`
- [ ] Create base content directory structure
- [ ] Set up Git branch for migration work: `git checkout -b migration/nuxt-content`

### Day 3-4: Single Exercise Migration (POC)
- [ ] Select 1 simple exercise (e.g., "Modeling the Airline Chair")
- [ ] Create migration script: `scripts/migrateExercise.js`
- [ ] Convert to markdown with frontmatter
- [ ] Add OER Schema metadata
- [ ] Test rendering in Nuxt app
- [ ] Verify all assets load correctly

### Day 5: Component Updates
- [ ] Update `ExerciseCard.vue` to use Nuxt Content
- [ ] Update `pages/exercises/[id].vue` to `[slug].vue`
- [ ] Add JSON-LD structured data
- [ ] Test SEO with Google Rich Results Test

### Weekend: Review & Adjust
- [ ] Team review of POC
- [ ] Adjust schema based on feedback
- [ ] Document any edge cases discovered

---

## Week 2: Core Content Migration

### Day 1-2: Exercises Bulk Migration
- [ ] Complete migration script for all exercises
- [ ] Handle special cases:
  - Multiple file attachments
  - YouTube vs Vimeo videos
  - Missing fields
- [ ] Run migration: `node scripts/migrateExercises.js`
- [ ] Verify all 50+ exercises converted
- [ ] Commit to Git

### Day 3: Projects Migration
- [ ] Adapt script for projects table
- [ ] Handle project-specific fields:
  - Requirements vs Instructions
  - Rubric references
- [ ] Run migration: `node scripts/migrateProjects.js`
- [ ] Verify all projects converted

### Day 4: Pathways & Specializations
- [ ] Migrate pathways (simpler structure)
- [ ] Migrate specializations
- [ ] Verify relationship links work
- [ ] Test nested navigation

### Day 5: Supporting Tables
- [ ] Migrate licenses
- [ ] Migrate rubrics & criteria
- [ ] Migrate lectures
- [ ] Handle files table (may stay as JSON)

---

## Week 3: Relationship Resolution

### Day 1-2: Cross-Reference System
- [ ] Create slug-based relationship system
- [ ] Build lookup composable: `useContentRelations.ts`
  ```typescript
  export const useContentRelations = () => {
    const getPathway = (slug: string) => { ... }
    const getExercisesByPathway = (pathwaySlug: string) => { ... }
    const getRubricCriteria = (rubricSlug: string) => { ... }
  }
  ```
- [ ] Update all components to use new system

### Day 3: Breadcrumbs & Navigation
- [ ] Update breadcrumbs to work with content paths
- [ ] Fix navigation menus
- [ ] Ensure back/forward links work

### Day 4-5: Search Implementation
- [ ] Build content search with Nuxt Content's `queryContent()`
- [ ] Add filters:
  - Difficulty level
  - Pathway
  - Learning resource type
- [ ] Test search performance
- [ ] Add search to navbar

---

## Week 4: UI/UX Refinement

### Day 1: Exercise Pages
- [ ] Polish exercise detail page
- [ ] Add related exercises section
- [ ] Show pathway context
- [ ] Display learning objectives prominently

### Day 2: Project Pages  
- [ ] Polish project detail page
- [ ] Add rubric display
- [ ] Show requirements checklist
- [ ] Add download buttons for attachments

### Day 3: Pathway Pages
- [ ] Build pathway overview page
- [ ] Show exercise progression
- [ ] Add completion indicators (future feature)
- [ ] Create pathway comparison view

### Day 4: Specialization Pages
- [ ] Build specialization landing page
- [ ] Show career roles
- [ ] List related pathways
- [ ] Add exemplar work

### Day 5: Homepage & Dashboard
- [ ] Update homepage to use content queries
- [ ] Create "Featured" and "New" sections
- [ ] Add statistics (X exercises, Y pathways, etc.)

---

## Week 5: OER Enhancement

### Day 1-2: Structured Data
- [ ] Add JSON-LD to all page types
- [ ] Validate with Google Rich Results Test
- [ ] Test with Schema.org validator
- [ ] Ensure all OER required fields present

### Day 3: OER API Endpoints
- [ ] Create `/api/oer/search` endpoint
- [ ] Create `/api/oer/feed` for RSS
- [ ] Create `/api/oer/sitemap.xml`
- [ ] Document API for external use

### Day 4: Accessibility Audit
- [ ] Run axe DevTools on all pages
- [ ] Verify ARIA labels
- [ ] Check keyboard navigation
- [ ] Test with screen reader

### Day 5: License Compliance
- [ ] Verify all content has license metadata
- [ ] Add license badges to pages
- [ ] Create license info page
- [ ] Add attribution where required

---

## Week 6: Testing & Launch

### Day 1-2: Comprehensive Testing
- [ ] Test all exercises load correctly
- [ ] Test all projects load correctly
- [ ] Test all pathways display properly
- [ ] Verify all images and files accessible
- [ ] Test video embeds (YouTube/Vimeo)
- [ ] Test Google Slides embeds

### Day 3: Performance Optimization
- [ ] Run Lighthouse audits
- [ ] Optimize images if needed
- [ ] Enable content caching
- [ ] Test load times
- [ ] Check mobile responsiveness

### Day 4: Migration Validation
- [ ] Run comparison script:
  ```bash
  node scripts/validateMigration.js
  ```
- [ ] Verify record counts match
- [ ] Check for broken relationships
- [ ] Ensure no data loss

### Day 5: Deprecate Airtable Integration
- [ ] Remove or comment out:
  - `plugins/airtable.js`
  - `stores/airtableStore.js`
  - `scripts/generateAirtableCache.js`
- [ ] Remove Airtable from `package.json`
- [ ] Update README with new architecture
- [ ] Remove `/cache` endpoints

### Weekend: Soft Launch
- [ ] Merge to main branch
- [ ] Deploy to staging
- [ ] Internal team testing
- [ ] Gather feedback

---

## Post-Launch Tasks

### Week 7: Monitoring & Iteration
- [ ] Monitor search console for errors
- [ ] Check analytics for user behavior
- [ ] Gather user feedback
- [ ] Fix any reported issues

### Future Enhancements
- [ ] Add user accounts and progress tracking
- [ ] Build admin CMS interface (TinaCMS integration)
- [ ] Add comments/discussion system
- [ ] Create printable versions of exercises
- [ ] Build mobile app using same content API

---

## Risk Mitigation

### Data Loss Prevention
- ✅ Keep Airtable backup until migration verified
- ✅ Use Git for version control of all content
- ✅ Run validation scripts before deprecating
- ✅ Maintain parallel systems during transition

### Rollback Plan
If major issues discovered:
1. Keep Airtable integration active during Week 6
2. Feature flag system to switch between data sources
3. Can revert to Airtable-based system if needed

### Performance Concerns
- Nuxt Content uses file-based caching
- Build-time generation for static pages
- CDN delivery for assets
- Should be faster than API calls to Airtable

---

## Success Criteria

- [ ] All exercises accessible via markdown files
- [ ] All projects accessible via markdown files
- [ ] All pathways & specializations migrated
- [ ] All relationships resolved correctly
- [ ] Search works with new system
- [ ] Google can index OER metadata
- [ ] Page load times < 2 seconds
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] All tests passing

---

## Team Assignments

**Developer 1:** Migration scripts & data conversion  
**Developer 2:** Component updates & UI refinement  
**Designer:** Review new layouts, ensure brand consistency  
**Content Lead:** Validate accuracy of migrated content  
**QA:** Test all features, document bugs

---

## Tools & Resources

### Required Tools
- VS Code with MDC extension
- Git/GitHub
- Google Search Console
- Schema.org validator
- Lighthouse/axe DevTools

### Documentation
- [Nuxt Content Docs](https://content.nuxt.com)
- [Schema.org LearningResource](https://schema.org/LearningResource)
- [Open Educational Resources Commons](https://www.oercommons.org)
- [Creative Commons Licensing Guide](https://creativecommons.org/licenses/)

### Testing Sites
- https://search.google.com/test/rich-results
- https://validator.schema.org
- https://wave.webaim.org
- https://pagespeed.web.dev

---

## Communication Plan

### Weekly Updates
- **Monday:** Week planning meeting
- **Wednesday:** Mid-week check-in
- **Friday:** Week review & demo

### Status Tracking
- Use GitHub Projects board
- Daily standups (async in Slack)
- Document blockers immediately

---

## Budget Considerations

### Time Investment
- Development: ~200 hours (5 weeks × 40 hours)
- Testing: ~40 hours
- Content review: ~20 hours
- **Total:** ~260 hours

### Infrastructure
- No new hosting costs (already on Vercel)
- No new API costs (removing Airtable API calls)
- Potential savings: ~$50-100/month in Airtable fees

---

**Last Updated:** January 16, 2026  
**Next Review:** Week 1 Completion  
**Status:** Ready to Begin
