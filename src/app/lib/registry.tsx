'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export type Props = {
    children: React.ReactNode;
};

export default function StyledComponentsRegistry({ children }: Props) {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        return <React.Fragment>{styles}</React.Fragment>;
    });

    if (typeof window !== 'undefined') {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            {children}
        </StyleSheetManager>
    );
}
