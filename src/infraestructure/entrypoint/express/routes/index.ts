import { Router } from 'express'
import customerRouter from './customer.routes'
import healthRouter from './health.routes'

const routes = Router()

routes.use('/customers', customerRouter)
routes.use('/health', healthRouter)

export default routes
