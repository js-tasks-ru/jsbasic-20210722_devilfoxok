function getMinMax(str) {
  // ваш код...
  let filtered = str.split(' ')
                    .filter(item => (+item / +item) == 1)
                    .sort(( a, b) => a - b);
  return result = {
    min: +filtered.shift(),
    max: +filtered.pop(),
  };
}
