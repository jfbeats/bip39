const bip39 = require('../')
const Buffer = require('safe-buffer').Buffer
const test = require('tape')

test('README example 1', async function (t) {
  // defaults to BIP39 English word list
  const entropy = 'ffffffffffffffffffffffffffffffff'
  const mnemonic = await bip39.entropyToMnemonic(entropy)

  t.plan(2)
  t.equal(mnemonic, 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong')

  // reversible
  t.equal(await bip39.mnemonicToEntropy(mnemonic), entropy)
})

test('README example 2', async function (t) {
  const randombytes = (size) => Buffer.from('qwertyuiopasdfghjklzxcvbnm[];,./'.slice(0, size), 'utf8')

  // mnemonic strength defaults to 128 bits
  const mnemonic = await bip39.generateMnemonic(undefined, randombytes)

  t.plan(2)
  t.equal(mnemonic, 'imitate robot frame trophy nuclear regret saddle around inflict case oil spice')
  t.equal(await bip39.validateMnemonic(mnemonic), true)
})

test('README example 3', async function (t) {
  const mnemonic = 'basket actual'
  const seed = await bip39.mnemonicToSeed(mnemonic)

  t.plan(2)
  t.equal(seed.toString('hex'), '5cf2d4a8b0355e90295bdfc565a022a409af063d5365bb57bf74d9528f494bfa4400f53d8349b80fdae44082d7f9541e1dba2b003bcfec9d0d53781ca676651f')
  t.equal(await bip39.validateMnemonic(mnemonic), false)
})
