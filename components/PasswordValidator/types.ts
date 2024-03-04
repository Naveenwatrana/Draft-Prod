export type FieldError = {
    valid: (value: string) => boolean,
    message: string,
    id: number,
};

export type PasswordValidatorProps = {
    validations: FieldError[],
    touched?: boolean,
    value: string,
};
