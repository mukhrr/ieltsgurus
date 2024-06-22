const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabaseUrl = 'https://rddlklwyxqrhczpmlbzv.supabase.co' // Replace with your Supabase URL
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZGxrbHd5eHFyaGN6cG1sYnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2Mzc2MDMsImV4cCI6MjAyODIxMzYwM30.nwiAlUXbazq-x1nL94NBYHGvPetdxQmaEyMm8ucebF8' // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey)

const data = JSON.parse(fs.readFileSync('mentors.json', 'utf8'))

const toSnakeCase = (str) => {
  return str
    .normalize('NFD') // Normalize the string
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters but keep spaces
    .split(' ') // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join('') // Join the words without spaces
}

data.forEach(async (mentor) => {
  const imageFileName = toSnakeCase(mentor.fullName)
  const imagePath = `mentor-images/${imageFileName}.jpg`

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
