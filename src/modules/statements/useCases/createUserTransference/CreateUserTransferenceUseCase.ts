import { inject, injectable } from "tsyringe";
import { CreateUserTransferenceError } from "./CreateUserTransferenceError";
import { OperationType, Statement } from "../../entities/Statement";
import { ICreateTransferDTO } from "./ICreateTransferDTO";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";


export interface ICreateTransfer {
  userSenderId: string;
  userReceiverId: string;
  amount: number;
  description: string;
}

@injectable()
class CreateUserTransferenceUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({
    userSenderId,
    userReceiverId,
    amount,
    description
  }: ICreateTransferDTO): Promise<Statement> {
    const userSender = await this.usersRepository.findById(userSenderId);
    const userReceiver = await this.usersRepository.findById(userReceiverId);
    const userSenderBalance = await this.statementsRepository.getUserBalance({user_id: userSenderId})

    if(!userSender) {
      throw new CreateUserTransferenceError.UserSenderNotFound();
    }

    if(!userReceiver) {
      throw new CreateUserTransferenceError.UserReceiverNotFound();
    }

    if(userSenderBalance.balance < amount) {
      throw new CreateUserTransferenceError.UserBalanceInsufficient();
    }

    const transference = await this.statementsRepository.create({
      user_id: userSenderId,
      user_receiver: userReceiverId,
      type: OperationType.TRANSFER,
      amount,
      description
    });

    return transference;
  }
}

export { CreateUserTransferenceUseCase }
