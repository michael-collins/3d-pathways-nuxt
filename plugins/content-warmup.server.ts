// plugins/content-warmup.server.ts
export default defineNuxtPlugin(async () => {
  // Only run on server side during build/ISR
  if (process.server) {
    try {
      console.log('Warming up content for ISR...')
      
      // Pre-warm the content database to ensure it's available during ISR
      const exercises = await queryCollection('exercises').find()
      const projects = await queryCollection('projects').find()
      const lectures = await queryCollection('lectures').find()
      
      console.log(`Content warmed up: ${exercises.length} exercises, ${projects.length} projects, ${lectures.length} lectures`)
      
      // Store in Nitro storage for ISR access
      if (exercises.length > 0) {
        await nitroApp?.storage.setItem('content:exercises', exercises)
      }
      if (projects.length > 0) {
        await nitroApp?.storage.setItem('content:projects', projects)
      }
      if (lectures.length > 0) {
        await nitroApp?.storage.setItem('content:lectures', lectures)
      }
    } catch (err) {
      console.error('Error warming up content:', err)
    }
  }
})