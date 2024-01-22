import React from 'react';
import {
    Container,
    Text,
    ToggleArea,
    Ball,
    ToggleContainer,
    Block,
} from './styles';

type ValueOf<T> = T[keyof T];
type ToggleState = ValueOf<typeof toggleState>;

const toggleState = {
    active: 'active',
    completed: 'completed',
    none: 'none',
} as const;

const getToggleState = (prev: ToggleState) => {
    if (prev === toggleState.none || prev === toggleState.active) {
        return toggleState.completed;
    }

    return toggleState.active;
};

const isGoalsCompleted = (...args: ToggleState[]) =>
    args.every((goal) => goal === toggleState.completed);

export const GoodCheapFast = () => {
    const [goodGoal, setGoodGoal] = React.useState<ToggleState>(
        toggleState.none
    );
    const [cheapGoal, setCheapGoal] = React.useState<ToggleState>(
        toggleState.none
    );
    const [fastGoal, setFastGoal] = React.useState<ToggleState>(
        toggleState.none
    );

    const changeGoals =
        (
            updateToggle: React.Dispatch<React.SetStateAction<ToggleState>>,
            isGoalsCompleted: boolean,
            updateGoal: (goalState: ToggleState) => void
        ) =>
        () => {
            updateToggle(getToggleState);

            if (isGoalsCompleted) {
                updateGoal(toggleState.active);
            }
        };

    return (
        <Container>
            <Text>How do you want your project to be?</Text>
            <Block>
                <ToggleContainer>
                    <ToggleArea className={goodGoal}>
                        <Ball
                            onClick={changeGoals(
                                setGoodGoal,
                                isGoalsCompleted(fastGoal, cheapGoal),
                                setFastGoal
                            )}
                            className={goodGoal}
                        />
                    </ToggleArea>
                    <Text>Good</Text>
                </ToggleContainer>
                <ToggleContainer>
                    <ToggleArea className={cheapGoal}>
                        <Ball
                            onClick={changeGoals(
                                setCheapGoal,
                                isGoalsCompleted(goodGoal, fastGoal),
                                setGoodGoal
                            )}
                            className={cheapGoal}
                        />
                    </ToggleArea>
                    <Text>Cheap</Text>
                </ToggleContainer>
                <ToggleContainer>
                    <ToggleArea className={fastGoal}>
                        <Ball
                            onClick={changeGoals(
                                setFastGoal,
                                isGoalsCompleted(goodGoal, cheapGoal),
                                setCheapGoal
                            )}
                            className={fastGoal}
                        />
                    </ToggleArea>
                    <Text>Fast</Text>
                </ToggleContainer>
            </Block>
        </Container>
    );
};
