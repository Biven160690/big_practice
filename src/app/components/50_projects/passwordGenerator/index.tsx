import React from 'react';
import {
    Button,
    Input,
    LabelText,
    Setting,
    Container,
    ResultContainer,
    Text,
} from './styles';

export type PasswordGenStates = {
    hasUpLetters: boolean;
    hasLowLetter: boolean;
    hasNumber: boolean;
    hasSymbols: boolean;
    passwordLength: number;
};

const uppercaseLetters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
);
const lowercaseLetters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
);
const numbers = Array.from({ length: 10 }, (_, index) => index);
const symbols = [
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '-',
    '_',
    '+',
    '=',
    '{',
    '}',
    '[',
    ']',
    '|',
    ';',
    ':',
    ',',
    '.',
    '<',
    '>',
    '/',
    '?',
];

const passwordSigns = [uppercaseLetters, lowercaseLetters, numbers, symbols];

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getPasswordSign = (
    signs: (number | string)[],
    maxNumber: number = signs.length - 1
) => signs.at(getRandomNumber(0, maxNumber));

const checkValidInput = (
    fn: (arg: PasswordGenStates) => string,
    passwordGenStates: PasswordGenStates
) => {
    const { passwordLength, ...rest } = passwordGenStates;
    const includedCheckedInput = Object.values(rest).some((item) => item);

    if (!passwordLength || !includedCheckedInput) {
        return '';
    }

    return fn(passwordGenStates);
};

const getPassword = ({ passwordLength, ...rest }: PasswordGenStates) => {
    const includedCheckedInput = Object.values(rest);
    let password = '';
    let index = 0;

    while (true) {
        if (includedCheckedInput[index]) {
            password += getPasswordSign(passwordSigns[index]);

            if (password.length >= passwordLength) {
                return password;
            }
        }

        index >= includedCheckedInput.length - 1 ? (index = 0) : ++index;
    }
};

export const PasswordGenerator = () => {
    const passwordRef = React.useRef<HTMLDivElement | null>(null);
    const [password, setPassword] = React.useState<string>('');
    const [hasUpLetters, setHasUpLetters] = React.useState<boolean>(true);
    const [hasLowLetter, setHasLowLetter] = React.useState<boolean>(true);
    const [hasNumber, setHasNumber] = React.useState<boolean>(true);
    const [hasSymbols, setHasSymbols] = React.useState<boolean>(true);
    const [passwordLength, setPasswordLength] = React.useState<number>(20);

    const passwordGenStates = {
        hasUpLetters,
        hasLowLetter,
        hasNumber,
        hasSymbols,
        passwordLength,
    };

    const handleCopyClick = () => {
        const password = passwordRef.current;

        if (!password) {
            return;
        }

        navigator.clipboard
            .writeText(password.innerText)
            .then(() => alert('Текст скопирован в буфер обмена!'))
            .catch((err) =>
                console.error('Не удалось скопировать текст: ', err)
            );
    };

    return (
        <Container>
            <ResultContainer>
                <Text ref={passwordRef}>{password}</Text>
                <Button onClick={handleCopyClick} $mode="copy">
                    Copy
                </Button>
            </ResultContainer>
            <Setting>
                <LabelText>Password Length</LabelText>
                <Input
                    min={0}
                    max={20}
                    checked={hasUpLetters}
                    value={passwordLength}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPasswordLength(Number(e.target.value))
                    }
                    type="number"
                />
            </Setting>
            <Setting>
                <LabelText>Include uppercase letters</LabelText>
                <Input
                    checked={hasUpLetters}
                    onChange={() => setHasUpLetters((prev) => !prev)}
                    type="checkbox"
                />
            </Setting>
            <Setting>
                <LabelText>Include lowercase letters</LabelText>
                <Input
                    checked={hasLowLetter}
                    onChange={() => setHasLowLetter((prev) => !prev)}
                    type="checkbox"
                />
            </Setting>
            <Setting>
                <LabelText>Include numbers</LabelText>
                <Input
                    checked={hasNumber}
                    onChange={() => setHasNumber((prev) => !prev)}
                    type="checkbox"
                />
            </Setting>
            <Setting>
                <LabelText>Include symbols</LabelText>
                <Input
                    checked={hasSymbols}
                    onChange={() => setHasSymbols((prev) => !prev)}
                    type="checkbox"
                />
            </Setting>
            <Button
                onClick={() =>
                    setPassword(checkValidInput(getPassword, passwordGenStates))
                }
            >
                Generator Password
            </Button>
        </Container>
    );
};
