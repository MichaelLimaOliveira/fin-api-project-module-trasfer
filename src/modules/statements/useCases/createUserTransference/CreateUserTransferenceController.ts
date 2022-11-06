import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserTransferenceUseCase } from "./CreateUserTransferenceUseCase";

enum OperationType {
  TRANSFER = 'transfer'
}

export class CreateUserTransferenceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userSenderId = req.user.id;
    const { userReceiverId } = req.params;
    const { amount, description } = req.body;

    const createUserTransferenceUseCase = container.resolve(
      CreateUserTransferenceUseCase
    );

    const type = 'transfer' as OperationType

    await createUserTransferenceUseCase.execute({
      userSenderId,
      userReceiverId,
      type,
      amount,
      description
    });

    return res.send();
  }
}
