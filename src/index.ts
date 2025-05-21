import PrismaCustomerRepository from '@infra/database/postgress/prisma-customer-repository'
import { TechChallengeAPI } from '@infra/entrypoint/express/server'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import SqsClient from '@infra/config/sqs.config'

const sqsClient = new SqsClient()

const customerDataSource = new PrismaCustomerRepository(new PrismaService())

TechChallengeAPI.start(customerDataSource, sqsClient)
