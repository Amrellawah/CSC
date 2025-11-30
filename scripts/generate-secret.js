// Generate a random secret key for JWT
const crypto = require('crypto')

const secret = crypto.randomBytes(32).toString('hex')

console.log('\n✅ JWT Secret generated successfully!\n')
console.log('Add this to your .env.local file:')
console.log(`JWT_SECRET=${secret}\n`)
console.log('This is a secure random 64-character hex string.')


