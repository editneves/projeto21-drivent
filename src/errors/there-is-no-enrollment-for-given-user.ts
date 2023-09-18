import { ApplicationError } from '@/protocols';

export function thereIsNoEnrollmentForGivenUser(): ApplicationError {
  return {
    name: 'ThereIsNoEnrollmentForGivenUser',
    message: 'There is no enrollment for given user',
  };
}
