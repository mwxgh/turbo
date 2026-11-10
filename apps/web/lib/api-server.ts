import { cookies } from 'next/headers'

import { setServerHeaders } from './api'

// Server Components and Server Actions call the api as the signed-in user: forward the cookies
setServerHeaders(async () => {
  const cookie = (await cookies()).toString()
  return cookie ? { cookie } : undefined
})
