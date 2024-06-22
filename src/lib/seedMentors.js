const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabaseUrl = 'https://rddlklwyxqrhczpmlbzv.supabase.co' // Replace with your Supabase URL
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZGxrbHd5eHFyaGN6cG1sYnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2Mzc2MDMsImV4cCI6MjAyODIxMzYwM30.nwiAlUXbazq-x1nL94NBYHGvPetdxQmaEyMm8ucebF8' // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey)

const data = JSON.parse(fs.readFileSync('mentors.json', 'utf8'))

data.forEach(async (mentor) => {
  const imagePath = `mentor-images/${mentor.fullName}.jpg`

  const { data, error } = await supabase.from('mentors').insert([
    {
      fullName: mentor.fullName,
      image: imagePath,
      social_networks: mentor.social_networks,
      ielts_score: mentor.ielts_score,
      short_info: mentor.short_info,
      description: mentor.description,
      categories: mentor.categories
    }
  ])

  if (error) console.log('Error:', error)
  else console.log('Inserted:', data)
})
