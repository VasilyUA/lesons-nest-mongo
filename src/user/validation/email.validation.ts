import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomEmailValidation implements ValidatorConstraintInterface {
  async validate(text: string, args: ValidationArguments): Promise<boolean> {
    const body: any = args.object;

    return text && body.email === text && text.includes('@gmail.com');
  }
}
