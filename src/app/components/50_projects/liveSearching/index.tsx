import React from 'react';

import { Container, Header, FilteringContainer, Card, Circle } from './styles';

export type Users = {
    name: {
        title: string;
        first: string;
        last: string;
    };

    location: {
        city: string;
        state: string;
    };
}[];

const userFilter = (users: Users, value: string) => {
    return users.filter(({ name }) =>
        (name.first + name.last).toLowerCase().includes(value.toLowerCase())
    );
};

export const LiveSearching = () => {
    const [userCommonList, setUserCommonList] = React.useState<Users>([]);
    const [userFilteredList, setUserFilteredList] = React.useState<Users>([]);
    const prevInputValue = React.useRef<string>('');

    React.useEffect(() => {
        const abortSignal = new AbortController();

        const getUsers = async () => {
            const response = await fetch(
                'https://randomuser.me/api?results=50',
                {
                    signal: abortSignal.signal,
                }
            );
            const { results } = await response.json();

            setUserCommonList(results);
            setUserFilteredList(results);
        };

        getUsers();

        return () => abortSignal.abort();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const isNarrowedSearch = prevInputValue.current.length > value.length;
        prevInputValue.current = value;

        setUserFilteredList((userPrevList) =>
            userFilter(isNarrowedSearch ? userCommonList : userPrevList, value)
        );
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const pattern = /^[a-zA-Z]+$/;

        if (!pattern.test(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <Container>
            <Header>
                <h2>Live User Filter</h2>
                <p>Search by name and/or location</p>
                <input
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </Header>
            <FilteringContainer>
                {userFilteredList.map(({ name, location }, index) => {
                    return (
                        <Card key={index}>
                            <Circle />
                            <div>
                                <h4>
                                    {name.first} {name.last}
                                </h4>
                                <p>
                                    {location.city} {location.state}
                                </p>
                            </div>
                        </Card>
                    );
                })}
            </FilteringContainer>
        </Container>
    );
};
