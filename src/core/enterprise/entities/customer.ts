import { Document } from '@core/enterprise/valueObjects/document'
import { UniqueEntityId } from '@core/enterprise/valueObjects/unique-entity-id'
import { InvalidCustomerError } from '@core/enterprise/custom-exceptions/invalid-customer'

export class Customer {
  id: UniqueEntityId

  constructor(
    private readonly name: string,
    private readonly document: Document,
    private readonly email: string,
    id?: string,
  ) {
    this.validateName(name)
    this.validateEmail(email)
    this.id = new UniqueEntityId(id)
  }

  public getId(): string {
    return this.id.getValue()
  }

  public getName(): string {
    return this.name
  }

  public getDocument(): string {
    return this.document.getValue()
  }

  public getEmail(): string {
    return this.email
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new InvalidCustomerError('Invalid name.')
    }
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      throw new InvalidCustomerError('Invalid email.')
    }
  }
}
