import React from 'react';

import { Container, Square } from './styles';

const mocks = new Array(806).fill(0);

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'cyan',
    'magenta',
    'teal',
    'lime',
    'indigo',
    'violet',
    'maroon',
    'olive',
    'navy',
    'gray',
    'silver',
    'black',
    'darkred',
    'darkgreen',
    'darkblue',
    'darkyellow',
    'darkorange',
    'darkpurple',
    'darkpink',
    'darkbrown',
    'darkcyan',
    'darkmagenta',
];

export const HoverBoard = () => {
    return (
        <Container>
            {mocks.map((_, index) => (
                <Square
                    key={index}
                    $color={`${colors.at(getRandomNumber(0, colors.length))}`}
                />
            ))}
        </Container>
    );
};
