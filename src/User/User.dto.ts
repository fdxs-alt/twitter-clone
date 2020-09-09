import { IsString, IsEmail, IsNumber } from 'class-validator';

export class createUserInput {
    @IsString({ message: 'Given value must be a string' })
    @IsEmail({}, { message: 'Given value is not an email' })
    email: string;

    @IsString({ message: 'Given value must be a string' })
    password: string;

    @IsString({ message: 'Given value must be a string' })
    name: string;

    @IsString({ message: 'Given value must be a string' })
    surname: string;

    @IsNumber({}, { message: 'Given number is incorrect' })
    phone: number;

    @IsString({ message: 'Given value must be a string' })
    username: string;
}

export class loginInput {
    @IsString({ message: 'Given value must be a string' })
    @IsEmail({}, { message: 'Given value is not an email' })
    email: string;

    @IsString({ message: 'Given value must be a string' })
    password: string;
}

export class VerifyAccountInput {
    @IsString({ message: 'Given value must be a string' })
    @IsEmail({}, { message: 'Given value is not an email' })
    email: string;

    @IsNumber(
        { maxDecimalPlaces: 4 },
        { message: 'Given value must be a four decimal number' },
    )
    code: number;
}
export class UpdateProfileInput {
    city?: string;
    country?: string;
    description?: string;
    profileLink?: string;
}
