
export const drawSkewedRect = ({ context, w = 600, h = 200, frame, speed, stroke, fill}) => {
    const radiusx = Math.cos(40) * w;
    const radiusy = Math.sin(-38) * w;
    const acceleration = (speed === 0 ? 1 : speed) * 0.5 *  frame + 1;
    
    context.strokeStyle = stroke;
    context.fillStyle = fill;
    context.lineWidth = 10;

    context.save();

    context.translate(radiusx * -0.5, radiusy * -0.5);
    
    context.beginPath(); 
    context.moveTo(acceleration + 0, 0);
    context.lineTo(acceleration + radiusx , radiusy);
    context.lineTo(acceleration + radiusx , radiusy + h);
    context.lineTo(acceleration + 0, h);
    context.closePath();
    context.stroke();
    context.fill();

    context.restore();

}
