const fs = require('fs')
const pkgInfo = require('./package.json')
const SessionClient = require('../node-session-client/session-client.js')

const client = new SessionClient()
client.groupInviteTextTemplate = 'You can join {name} at {url}'
if (fs.existsSync('lastHash.txt')) {
  client.lastHash = fs.readFileSync('lastHash.txt').toString()
}
client.loadIdentity({
  seed: fs.existsSync('seed.txt') && fs.readFileSync('seed.txt').toString(),
  displayName: 'OpenGroup Directory Bot',
  //avatarFile: '5f16f4fd7ca8def05968bbca_Jk79urotkJJtMHZNO3kduoJLgAW6X6kgceEjnbI2VeeOseBujKs6ok_IbYl3OHxaaHLUmtMVRNk.png',
}).then(async() => {
  console.log(client.identityOutput)
  await client.open()
  client.on('updateLastHash', hash => {
    fs.writeFileSync('lastHash.txt', hash)
  })
  client.on('messages', msgs => {
    msgs.forEach(async msg => {
      console.log('request', msg.source, msg.body)
      await client.sendSafeOpenGroupInvite(msg.source, 'General Chat', 'chat.getsession.org', 1)
      await client.sendSafeOpenGroupInvite(msg.source, 'Session Feedback', 'feedback.getsession.org', 1)
      await client.sendSafeOpenGroupInvite(msg.source, 'Loki Community', 'loki.opensession.id', 1)
      await client.sendSafeOpenGroupInvite(msg.source, 'Chinese Chat', 'chat.cryptocommit.org', 1)
      await client.send(msg.source, `Development depends on your support
LZQqA5mj6zBRb9Z7AVb4KBhYtZWGzauaJ6DtsHUEatdeZYo1r9m8euWNZfQnhtVdVe2ZRo8R1b9yuMjHXTxe7knqEjPCK4u`)
    })
  })

  client.send('05d233c6c8daed63a48dfc872a6602512fd5a18fc764a6d75a08b9b25e7562851a', 'OpenGroup Bot startup', {})
})
