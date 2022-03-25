export class Ticket {
  constructor(
    public readonly id: string,
    public readonly id_show: string,
    public readonly name: string,
    public readonly value: number,
    public readonly quantity: number
  ) {}
}

export interface TicketInputDTO {
  id: string
  id_show: string
  name: string
  value: number
  quantity: number
}
