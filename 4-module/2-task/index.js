function makeDiagonalRed(table) {
  // ваш код...
  for (let i = 0; i <= 4; ++i) {
    let row = table.rows[i];
  row.cells[i].style.backgroundColor = 'red';
  } 
}
