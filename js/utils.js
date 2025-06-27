// lerp gives you the % point between A and B point
// A = 1, B = 5, t = 0.5 --> 1 + (5 - 1) * 0.5 = 3
// with this funtion, it is easy to generate this between % point.
function lerp(A, B, percentage) {
  return A + (B - A) * percentage;
}
