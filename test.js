import test from 'ava'
import ruid from '.'

test('should return string', async t => {
  const id = await ruid()
  t.true(id.length > 0)
})
