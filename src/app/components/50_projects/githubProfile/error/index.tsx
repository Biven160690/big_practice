import { ErrorCardWrapper } from '../styles';

export type Prop = {
    errorContent: {
        name: string;
        message: string;
    };
};

export const ErrorContent = ({ errorContent }: Prop) => {
    return (
        <ErrorCardWrapper>
            <h1>{errorContent.name}</h1>
            <h2>{errorContent.message}</h2>
        </ErrorCardWrapper>
    );
};
