import { requestInterceptor } from './requestInterceptor'
import { routeInterceptor } from './routeInterceptor'

const addInterceptors = () => {
  requestInterceptor()
  routeInterceptor()
}

export default addInterceptors
