import express from 'express'
import routes from './routes'
import { ICustomerDataSource } from '@core/application/interfaces/repository/customer-data-source'
import globalErrorHandler from './global-error-handling'
import SqsClient from '@infra/config/sqs.config'

export class TechChallengeAPI {
  static start(customerDataSource: ICustomerDataSource, sqsClient: SqsClient) {
    const app = express()
    app.use(express.json())

    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    app.use((req, res, next) => {
      req.app.locals.customerDataSource = customerDataSource
      req.app.locals.sqsClient = sqsClient
      next()
    })

    app.use(routes)
    app.use(globalErrorHandler)

    const port = process.env.PORT ?? 3001

    app.listen(port, () => {
      console.log(`Server started on port ${port}⚡`)
    })
  }
}
