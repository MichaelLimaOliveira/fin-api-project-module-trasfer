enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

interface ICreateTransferDTO {
  userSenderId: string,
  userReceiverId: string,
  type: OperationType
  amount: number
  description: string
}

export { ICreateTransferDTO }
