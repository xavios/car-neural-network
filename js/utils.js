// lerp gives you the % point between A and B point
// A = 1, B = 5, t = 0.5 --> 1 + (5 - 1) * 0.5 = 2.5
// with this funtion, it is easy to generate this between % point.
function lerp(A, B, percentage) {
  return A + (B - A) * percentage;
}

function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      };
    }
  }

  return null;
}

function getPolyInterSects(polyA, polyB) {
  const touches = [];
  const segmentsA = getSegments(polyA);
  const segmentsB = getSegments(polyB);
  for (let segmentA of segmentsA) {
    for (let segmentB of segmentsB) {
      const touch = getIntersection(
        segmentA.start,
        segmentA.end,
        segmentB.start,
        segmentB.end
      );
      if (touch) {
        touches.push(touch);
      }
    }
  }
  if (touches.length > 0) {
    return touches;
  }
  return null;
}

function poplyInterSect(polyA, polyB) {
  if (getPolyInterSects(polyA, polyB)) {
    return true;
  }
  return false;
}

function getSegments(polygon) {
  if (polygon.start && polygon.end) {
    return [polygon];
  }
  const segments = [];
  for (let i = 0; i < polygon.length - 1; i++) {
    segments.push({ start: polygon[i], end: polygon[i + 1] });
  }
  segments.push({ start: polygon[polygon.length - 1], end: polygon[0] });
  return segments;
}
