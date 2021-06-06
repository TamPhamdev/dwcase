import AuthRepository from './modules/AuthRepository'
import CasesRepository from './modules/CasesRepository'
import ProfileRepository from './modules/ProfileRepository'
import ItemsRepository from './modules/ItemsRepository'
import StatRepository from './modules/StatRepository'

export default ($axios) => ({
  auth: AuthRepository($axios),
  cases: CasesRepository($axios),
  profile: ProfileRepository($axios),
  items: ItemsRepository($axios),
  stats: StatRepository($axios),
})
