const canvasSketch = require('canvas-sketch');
const { drawRectangles } = require('./functions/drawRectangles.js')
const { drawPolygon } = require('./functions/drawPolygon.js');
const random = require('canvas-sketch-util/random');
const risoColors = require('riso-colors');

const seed = random.getRandomSeed();

const settings = {
  dimensions: [ 1080, 1080 ],
  //animate: true
};

const sketch = ({ width, height }) => {
  random.setSeed(seed);

  const totalRectangles = 200;
  const rects = [];

  const mask = {
    radius: width * 0.4,
    sides: 6,
    x: width * 0.5,
    y: height * 0.5,
  }

  let x, y, w, h, blend, speed;
  let fill, stroke;

  const rectColors = [
    ...risoColors.filter(color => color.name == 'Melon'),
    ...risoColors.filter(color => color.name == 'Smoky Teal'),
  ];

  for(let i = 0; i < totalRectangles; i++) {
    x = random.range(0, width);
    y = random.range(0, height);
    w = random.range(200, 600);
    h = random.range(40, 200);

    fill = random.pick(rectColors).hex;
    stroke = random.pick(rectColors).hex;

    blend = (random.value() > 0.8) ? 'overlay': 'source-over';
    speed = (random.range(-5, 5));

    rects.push({x, y, w, h, fill, stroke, blend, speed });
  };

  return ({ context, width, height, frame }) => {
    //background
    context.fillStyle = '#B8C7C4';
    context.fillRect(0, 0, width, height);

    //polygon clipping mask with internal rectangles background
    context.save();
    context.translate(mask.x, mask.y);
    drawPolygon({ context, radius: mask.radius, sides: mask.sides });
    context.clip();
    drawRectangles({ context, frame, rects, mask, })
    context.restore();

    //polygon outline
    context.save();
    context.translate(mask.x, mask.y);
    drawPolygon({ context, radius: mask.radius, sides: mask.sides });
    context.lineWidth = 20;
    context.strokeStyle = '#5F8289';
    context.stroke();
    context.restore();
  };
};

canvasSketch(sketch, settings);
