import { TicketDatabase } from './../data/TicketDatabase'
import { TicketInputDTO } from './entities/Ticket'
import { IdGenerator } from './services/IdGenerator'
import { CustomError } from '../business/error/CustomError'
import { UserDatabase } from '../data/UserDatabase'
import { UserInputDTO } from './entities/User'

export class TicketBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private ticketDatabase: TicketDatabase,
    private userDatabase: UserDatabase
  ) {}

  async buyTicket(quantity: number, name: string): Promise<void> {
    const userFromDB = await this.userDatabase.getAllUser(name)
    const user = userFromDB.name
    const userId = userFromDB.id

    if (user !== name) {
      throw new CustomError(401, 'Invalid name!')
    }

    await this.ticketDatabase.buyTicket(quantity, userId)
  }

  async createTicket(
    ticket: TicketInputDTO,
    user: UserInputDTO
  ): Promise<void> {
    const userFromDB = await this.userDatabase.getUserByEmail(user.email)
    const userRole = userFromDB.role

    if (userRole === 'NORMAL') {
      throw new CustomError(401, 'Invalid credentials!')
    }

    const id = this.idGenerator.generate()

    await this.ticketDatabase.createTicket(
      id,
      ticket.id_show,
      ticket.name,
      ticket.value,
      ticket.quantity
    )
  }
}
