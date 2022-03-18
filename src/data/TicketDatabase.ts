import { CustomError } from '../business/error/CustomError'
import { BaseDatabase } from './BaseDatabase'

export class TicketDatabase extends BaseDatabase {
  private static TABLE_NAME = 'LAMA_TICKETS'

  public async createTicket(
    id: string,
    id_show: string,
    name: string,
    value: number,
    quantity: number
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          id,
          id_show,
          name,
          value,
          quantity
        })
        .into(TicketDatabase.TABLE_NAME)
    } catch (error) {
      throw new CustomError(500, 'An unexpected error ocurred')
    }
  }

  public async buyTicket(quantity: number, id: string): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          quantity
        })
        .into(TicketDatabase.TABLE_NAME)
        .where((id = id))
    } catch (error) {
      throw new CustomError(500, 'An unexpected error ocurred')
    }
  }
}
