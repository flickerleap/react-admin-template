import { PublicLayout } from '../layouts/PublicLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { DefaultLogger } from '../components/loggers/loggers'

export const defaultAppConfig = {
  title: 'Admin',
  layouts: {
    public: PublicLayout,
    admin: AdminLayout
  },
  copyright: {
    url: 'https://www.flickerleap.com',
    name: 'Flicker Leap',
    company: 'Flicker Leap'
  },
  logger: new DefaultLogger()
}
