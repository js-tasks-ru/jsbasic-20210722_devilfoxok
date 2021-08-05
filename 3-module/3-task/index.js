function camelize(str) {
  // ваш код...
  return camelized = str.split('-')
                        .map((item, index) => index > 0 ? item[0].toUpperCase() + item.slice(1) : item)
                        .join('');
}


