const fs = require('fs')
const pkgInfo = require('./package.json')
const SessionClient = require('../node-session-client/session-client.js')

const client = new SessionClient()
client.loadIdentity({
  seed: fs.existsSync('seed.txt') && fs.readFileSync('seed.txt').toString(),
  displayName: 'OpenGroup Directory Bot',
  //avatarFile: '5f16f4fd7ca8def05968bbca_Jk79urotkJJtMHZNO3kduoJLgAW6X6kgceEjnbI2VeeOseBujKs6ok_IbYl3OHxaaHLUmtMVRNk.png',
}).then(async() => {
  client.open()
  client.on('messages', msgs => {
    msgs.forEach(async msg => {
      console.log('msg', msg)
      /*
      if (msg.attachments.length) {
        const attachments = await client.getAttachments(msg)
        console.log('attachments', attachment)
      }
      */
      // works on desktop
      client.sendOpenGroupInvite(msg.source, 'General Chat', 'chat.getsession.org', 1)
      client.sendOpenGroupInvite(msg.source, 'Session Feedback', 'feedback.getsession.org', 1)
      client.sendOpenGroupInvite(msg.source, 'Loki Community', 'loki.opensession.id', 1)
      client.sendOpenGroupInvite(msg.source, 'Chinese Chat', 'chat.cryptocommit.org', 1)
    })
  })
  const toPubkey = '05d233c6c8daed63a48dfc872a6602512fd5a18fc764a6d75a08b9b25e7562851a'

  // need an image
  //const attachment = await client.makeAttachment(fs.readFileSync('/Users/user2/Pictures/1587699732-0s.png'))
  // console.log('attachment', attachment)
  client.send(toPubkey, 'OpenGroup Bot startup', {
    // attachments: [attachment]
  })
})
