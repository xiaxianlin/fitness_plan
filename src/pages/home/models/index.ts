import { allPlans } from '@services/plan'
import { useLiveQuery } from 'dexie-react-hooks'
import { createContainer } from 'unstated-next'

const useContainer = () => {
    const plans = useLiveQuery(allPlans)
    return { plans }
}

export const HomeModel = createContainer(useContainer)
export const useHomeModel = HomeModel.useContainer
