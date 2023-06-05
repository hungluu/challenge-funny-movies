import { createConsumer } from '@rails/actioncable'
import type { ICableApi } from '../interfaces'

if (!process.env.CABLE_URL) {
  throw Error('CABLE_URL env not set')
}

export const FmCableApi: ICableApi = createConsumer(process.env.CABLE_URL)
