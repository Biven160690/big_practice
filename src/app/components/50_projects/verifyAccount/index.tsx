import React from 'react';

import {
    Container,
    Description,
    InputContainer,
    Input,
    Footer,
} from './styles';

const mocks = new Array(6).fill(6);

export type InputsCollection<T> = {
    [key: number]: T;
};

export type RefType<T> = React.MutableRefObject<T>;

const setInputRef = (
    ref: HTMLInputElement | null,
    index: number,
    inputsCollection: RefType<InputsCollection<HTMLInputElement>>
) => {
    if (!ref) {
        return;
    }

    inputsCollection.current[index] = ref;
};

export const VerifyAccount = () => {
    const inputsCollection = React.useRef<InputsCollection<HTMLInputElement>>(
        {}
    );
    const inputsContainer = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        let timeOutId: NodeJS.Timeout;
        const handleEvent = (event: KeyboardEvent) => {
            const { key } = event;
            const container = inputsContainer.current;

            if (!container) {
                return;
            }

            if (Number(key) >= 0 && Number(key) <= 9) {
                const inputsList = container.querySelectorAll('input');
                const currentInput = Array.from(inputsList).findIndex(
                    (input) => input === document.activeElement
                );

                inputsCollection.current[currentInput].value = '';
                timeOutId = setTimeout(
                    () => inputsCollection.current[currentInput + 1]?.focus(),
                    10
                );
            }
        };

        window.addEventListener('keydown', handleEvent);

        return () => {
            window.removeEventListener('keydown', handleEvent);
            clearTimeout(timeOutId);
        };
    }, []);

    return (
        <Container>
            <Description>
                <h1>Verify Your Account</h1>
                <p>
                    We emailed you the six digit code to cool_guy@email.com
                    <br />
                    Enter the code below to confirm your email address.
                </p>
            </Description>
            <InputContainer ref={inputsContainer}>
                {mocks.map((_, index) => (
                    <Input
                        key={index}
                        placeholder="0"
                        type="number"
                        required
                        autoFocus={!index}
                        ref={(link) =>
                            setInputRef(link, index, inputsCollection)
                        }
                    />
                ))}
            </InputContainer>
            <Footer>
                This is design only. We didn&apos;t actually send you an email
                as we don&apos;t have your email, right?
            </Footer>
        </Container>
    );
};


// export type RefType<T> = React.MutableRefObject<T>;

// const getInputValue = (
//     value: string,
//     prevInputValue: RefType<InputsCollection<string>>,
//     index: number
// ) => {
//     const prevValue = prevInputValue.current[index];

//     if (!prevValue) {
//         prevInputValue.current[index] = value;
//         return value;
//     }

//     const [item] = value.split('').filter((value) => value !== prevValue);

//     return (prevInputValue.current[index] = item || prevValue);
// };

// const updateInput = (
//     inputsCollection: RefType<InputsCollection<HTMLInputElement>>,
//     index: number,
//     value: string = ''
// ) => {
//     inputsCollection.current[index].value = value;
//     inputsCollection.current[index + 1]?.focus();
// };

// const setInputRef = (
//     ref: HTMLInputElement | null,
//     index: number,
//     inputsCollection: RefType<InputsCollection<HTMLInputElement>>
// ) => {
//     if (!ref) {
//         return;
//     }

//     inputsCollection.current[index] = ref;
// };

// export const VerifyAccount = () => {
//     const inputsCollection = React.useRef<InputsCollection<HTMLInputElement>>(
//         {}
//     );
//     const prevInputValue = React.useRef<InputsCollection<string>>({});
//     const inputsContainer = React.useRef<HTMLDivElement | null>(null);

//     const handleChange = (
//         currentInput: number,
//         event: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         const { value } = event.target;

//         updateInput(
//             inputsCollection,
//             currentInput,
//             getInputValue(value, prevInputValue, currentInput)
//         );
//     };

//     React.useEffect(() => {
//         const handleEvent = (event: KeyboardEvent) => {
//             const { key } = event;
//             const container = inputsContainer.current;

//             if (!(container && key === SPACEBAR)) {
//                 return;
//             }

//             const inputsList = container.querySelectorAll('input');
//             const currentInput = Array.from(inputsList).findIndex(
//                 (input) => input === document.activeElement
//             );
    
//             updateInput(inputsCollection, currentInput);
//         };

//         window.addEventListener('keydown', handleEvent);

//         return () => {
//             window.removeEventListener('keydown', handleEvent);
//         };
//     }, []);

//     return (
//         <Container>
//             <Description>
//                 <h1>Verify Your Account</h1>
//                 <p>
//                     We emailed you the six digit code to cool_guy@email.com
//                     <br />
//                     Enter the code below to confirm your email address.
//                 </p>
//             </Description>
//             <InputContainer ref={inputsContainer}>
//                 {mocks.map((_, index) => (
//                     <Input
//                         key={index}
//                         placeholder="0"
//                         maxLength={2}
//                         type="number"
//                         required
//                         autoFocus={!index}
//                         ref={(link) =>
//                             setInputRef(link, index, inputsCollection)
//                         }
//                         onChange={(event) => handleChange(index, event)}
//                     />
//                 ))}
//             </InputContainer>
//             <Footer>
//                 This is design only. We didn&apos;t actually send you an email
//                 as we don&apos;t have your email, right?
//             </Footer>
//         </Container>
//     );
// };
