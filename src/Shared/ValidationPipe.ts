import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype) {
            return value;
        }

        const object = plainToClass(metatype, value);

        const errors = await validate(object);

        if (errors.length > 0) {
            throw new BadRequestException(this.formatErrors(errors));
        }

        return this.trimValuesInObject(value);
    }

    private formatErrors(errors: any[]) {
        return errors
            .map(error => {
                for (const property in error?.constraints) {
                    return error.constraints[property];
                }
            })
            .join(', ');
    }

    private trimValuesInObject(obj: any) {
        return Object.keys(obj).reduce((acc, curr) => {
            acc[curr] = obj[curr] =
                typeof obj[curr] == 'string' ? obj[curr].trim() : obj[curr];
            return acc;
        }, {});
    }
}
