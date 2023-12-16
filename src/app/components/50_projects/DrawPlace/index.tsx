import React, { ChangeEvent } from 'react';
import styles from './styles.module.scss';

export const DrawPlace = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const canvasSettings = React.useRef({ lineWidth: 5, strokeStyle: 'red' });
    const [color, setColor] = React.useState<string>('#000000');

    React.useLayoutEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');

        if (!context) {
            return;
        }

        let isDrawing = false;

        const handleStartDrawing = (event: MouseEvent) => {
            const { lineWidth, strokeStyle } = canvasSettings.current;
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;

            isDrawing = true;

            context.beginPath();
            context.moveTo(
                event.pageX - canvas.offsetLeft,
                event.pageY - canvas.offsetTop
            );
        };

        const handleDraw = (event: MouseEvent) => {
            if (isDrawing) {
                context.lineTo(
                    event.pageX - canvas.offsetLeft,
                    event.pageY - canvas.offsetTop
                );
                context.stroke();
            }
        };

        const handleStopDrawing = () => (isDrawing = false);

        canvas.addEventListener('mousedown', handleStartDrawing);
        canvas.addEventListener('mousemove', handleDraw);
        canvas.addEventListener('mouseup', handleStopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', handleStartDrawing);
            canvas.removeEventListener('mousemove', handleDraw);
            canvas.removeEventListener('mouseup', handleStopDrawing);
        };
    }, []);

    const onClearCanvas = () => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);
    };

    const onChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
        const selectColor = event.target.value;
        setColor(selectColor);
        canvasSettings.current.strokeStyle = selectColor;
    };

    return (
        <React.Fragment>
            <canvas
                ref={canvasRef}
                width="500"
                height="300"
                style={{ border: '1px solid #000' }}
            />
            <div className={styles.footer}>
                <input type="color" value={color} onChange={onChangeColor} />
                <button className={styles.button} onClick={onClearCanvas}>
                    CLear
                </button>
            </div>
        </React.Fragment>
    );
};
