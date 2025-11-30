// Helper script to generate bcrypt password hash
// Usage: node scripts/generate-password.js <password>

const bcrypt = require('bcryptjs')

const password = process.argv[2]

if (!password) {
  console.error('Please provide a password as an argument')
  console.log('Usage: node scripts/generate-password.js <your_password>')
  process.exit(1)
}

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err)
    process.exit(1)
  }
  
  console.log('\n✅ Password hash generated successfully!\n')
  console.log('Add this to your .env.local file:')
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`)
})


