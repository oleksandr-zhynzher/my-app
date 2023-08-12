import { colors } from 'src/app/constants/map';

export const createLevelLessThan = (value: number): any => [
  '<',
  ['get', 'mag'],
  value,
];

export const createLevelRange = (lower: any, upper: any): any => [
  'all',
  ['>=', ['get', 'mag'], lower],
  ['<', ['get', 'mag'], upper],
];

export function createDonutChart(props: any): any {
  console.log('props = ', props);

  var offsets = [];
  var counts = [props.level1, props.level2, props.level3];
  var total = 0;
  for (var i = 0; i < counts.length; i++) {
    offsets.push(total);
    total += counts[i];
  }
  var fontSize = total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
  var r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
  var r0 = Math.round(r * 0.6);
  var w = r * 2;

  var html =
    '<div><svg width="' +
    w +
    '" height="' +
    w +
    '" viewbox="0 0 ' +
    w +
    ' ' +
    w +
    '" text-anchor="middle" style="font: ' +
    fontSize +
    'px sans-serif; display: block">';

  for (i = 0; i < counts.length; i++) {
    html += donutSegment(
      offsets[i] / total,
      (offsets[i] + counts[i]) / total,
      r,
      r0,
      colors[i]
    );
  }
  html +=
    '<circle cx="' +
    r +
    '" cy="' +
    r +
    '" r="' +
    r0 +
    '" fill="white" /><text dominant-baseline="central" transform="translate(' +
    r +
    ', ' +
    r +
    ')">' +
    total.toLocaleString() +
    '</text></svg></div>';

  var el = document.createElement('div');
  el.innerHTML = html;
  return el.firstChild;
}

export function donutSegment(
  start: any,
  end: any,
  r: any,
  r0: any,
  color: any
) {
  if (end - start === 1) end -= 0.00001;
  var a0 = 2 * Math.PI * (start - 0.25);
  var a1 = 2 * Math.PI * (end - 0.25);
  var x0 = Math.cos(a0),
    y0 = Math.sin(a0);
  var x1 = Math.cos(a1),
    y1 = Math.sin(a1);
  var largeArc = end - start > 0.5 ? 1 : 0;

  return [
    '<path d="M',
    r + r0 * x0,
    r + r0 * y0,
    'L',
    r + r * x0,
    r + r * y0,
    'A',
    r,
    r,
    0,
    largeArc,
    1,
    r + r * x1,
    r + r * y1,
    'L',
    r + r0 * x1,
    r + r0 * y1,
    'A',
    r0,
    r0,
    0,
    largeArc,
    0,
    r + r0 * x0,
    r + r0 * y0,
    '" fill="' + color + '" />',
  ].join(' ');
}
