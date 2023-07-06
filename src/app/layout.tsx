import StyledComponentsRegistry from './lib/registry';

import './globals.scss';

export type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </body>
        </html>
    );
}
