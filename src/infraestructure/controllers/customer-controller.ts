import { CreateCustomerDto } from '@core/application/dtos/create-customer-dto'
import { ICustomerDataSource } from '@core/application/interfaces/repository/customer-data-source'
import { CreateCustomerUseCase } from '@core/application/useCases/create-customer-use-case'
import { IdentifyCustomerByDocumentUseCase } from '@core/application/useCases/identify-customer-by-document-use-case'
import SqsClient from '@infra/config/sqs.config'
import { CustomerGateway } from '@infra/gateway/customer-gateway'
import { CustomerPresenter } from '@infra/presenters/CustomerPresenter'

export class CustomerController {
  private readonly queueUrl: string

  constructor(
    private readonly customerDataSource: ICustomerDataSource,
    private readonly sqsClient: SqsClient,
  ) {
    this.queueUrl = process.env.CREATED_CUSTOMER_QUEUE_URL ?? ''
  }

  async createCustomer(
    customer: CreateCustomerDto,
  ): Promise<CustomerPresenter> {
    const customerGateway = new CustomerGateway(this.customerDataSource)
    const createCustomerUseCase = new CreateCustomerUseCase(customerGateway)

    const { customer: createdCustomer } =
      await createCustomerUseCase.execute(customer)

    const customerPresenter = CustomerPresenter.present(createdCustomer)

    await this.sqsClient.sendMessage(this.queueUrl, customerPresenter)

    return customerPresenter
  }

  async findCustomerByDocument(document: string): Promise<CustomerPresenter> {
    const customerGateway = new CustomerGateway(this.customerDataSource)
    const identifyCustomerByDocumentUseCase =
      new IdentifyCustomerByDocumentUseCase(customerGateway)

    const { customer } =
      await identifyCustomerByDocumentUseCase.execute(document)

    return CustomerPresenter.present(customer)
  }
}
