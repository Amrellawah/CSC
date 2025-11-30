// Test password hash
const bcrypt = require('bcryptjs')

const password = 'admin'
const hash = '$2b$10$IN25d.SI16whREjMN/B7Iu/cereaR9SSdXt7V4E3P7ehHV8pn/6Ku'

bcrypt.compare(password, hash, (err, result) => {
  if (err) {
    console.error('Error:', err)
    return
  }
  
  console.log('Password:', password)
  console.log('Hash:', hash)
  console.log('Match:', result ? '✅ YES' : '❌ NO')
  
  if (!result) {
    console.log('\nGenerating new hash...')
    bcrypt.hash(password, 10, (err, newHash) => {
      if (err) {
        console.error('Error generating hash:', err)
        return
      }
      console.log('New hash:', newHash)
    })
  }
})



