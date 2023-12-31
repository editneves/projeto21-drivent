import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { enrollmentsService } from '@/services';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;

    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    if (error.name === 'ThereIsNoEnrollmentForGivenUser') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    await enrollmentsService.createOrUpdateEnrollmentWithAddress({
      ...req.body,
      userId: req.userId,
    });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

// TODO - Receber o CEP do usuário por query params.
export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { cep } = req.query as Record<string, string>;
  try {
    const address = await enrollmentsService.getAddressFromCEP(cep);
    res.status(httpStatus.OK).send(address);
  } catch (error) {
    next(error);
  }
}
