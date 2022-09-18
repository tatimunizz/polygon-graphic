
export const drawPolygon = ({ context, radius = 100, sides = 3 }) => {
    const slice = Math.PI * 2 / sides;

    context.beginPath();
    context.moveTo(0, -radius);

    for(let i = 1; i < sides; i++) {
        const theta = i * slice - Math.PI * 0.5;
        context.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
    }

    context.closePath();
}