const Color = require('canvas-sketch-util/color');
const {drawSkewedRect} = require('.././functions/drawSkewedRect.js')

export const drawRectangles = ({ context, frame, rects, mask, }) => {
    rects.forEach(rect => {
        const {x, y, w, h, fill, stroke, blend, speed } = rect;
        let shadowColor;
  
        context.save();
        context.translate(-mask.x, -mask.y);
  
        context.translate(x, y);
        
        context.globalCompositeOperation = blend;
  
        drawSkewedRect({context, w, h, frame, speed, stroke, fill });
        shadowColor = Color.offsetHSL(fill, 0, 0, -20);
        shadowColor.rgba[3] = 0.5;
        
        context.shadowColor = Color.style(shadowColor.rgba);
        context.shadowOffsetX = -10;
        context.shadowOffsetY = 20;
        
        context.fill();  
  
        context.shadowColor = null;
        context.stroke();
  
        context.globalCompositeOperation = 'source-over';
  
        //linha preta por cima dos retangulos
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.stroke();
        
        context.restore();
      });

}
