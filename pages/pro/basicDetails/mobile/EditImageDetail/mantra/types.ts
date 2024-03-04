import { FieldError, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IAddImageFormValues } from 'pages/pro/basicDetails/mobile/EditImageDetail/types';

export type MantraProps = {
    watch: UseFormWatch<IAddImageFormValues>;
    error: FieldError | undefined,
    register: UseFormRegister<IAddImageFormValues>;
}
