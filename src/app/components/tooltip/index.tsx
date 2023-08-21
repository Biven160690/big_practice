// https://ru.stackoverflow.com/questions/987607/%D0%9A%D0%B0%D0%BA-%D0%B2%D1%8B%D0%B2%D0%B5%D1%81%D1%82%D0%B8-%D0%B1%D0%BB%D0%BE%D0%BA-%D0%BF%D0%BE-%D0%BA%D0%BB%D0%B8%D0%BA%D1%83-%D1%80%D1%8F%D0%B4%D0%BE%D0%BC-%D1%81-%D0%BA%D1%83%D1%80%D1%81%D0%BE%D1%80%D0%BE%D0%BC
import React from 'react';

import styles from './styles.module.scss';
import { TooltipManagement } from './helper';

export type Props = React.PropsWithChildren<{
    isDisabled?: boolean;
    content?: React.ReactNode;
}>;

export const Tooltip = ({ children, content }: Props) => {
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const childrenRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const tooltip = tooltipRef.current;
        const content = contentRef.current;
        const children = childrenRef.current;

        if (!tooltip || !content || !children) {
            return;
        }

        const tooltipManagement = new TooltipManagement(
            tooltip,
            content,
            children
        );

        const onMouseEnter = (event: MouseEvent) => {
            tooltipManagement.updatePosition(event);
        };

        const onMouseLeave = () => {
            tooltipManagement.hide();
        };

        tooltip.addEventListener('mouseenter', onMouseEnter);
        tooltip.addEventListener('mouseleave', onMouseLeave);
        content.addEventListener('mouseenter', () => {
            content.style.display = 'none'
        });

        return () => {
            tooltip.removeEventListener('mouseenter', onMouseEnter);
            tooltip.removeEventListener('mouseleave', onMouseLeave);
            content.removeEventListener('mouseenter', onMouseLeave);
        };
    }, []);

    return (
        <div ref={tooltipRef}>
            <div ref={childrenRef}>{children}</div>
            <div ref={contentRef} className={styles.content}>
                {content}
            </div>
        </div>
    );
};
