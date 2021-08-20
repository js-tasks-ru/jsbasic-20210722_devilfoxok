/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement('table');
    this.tbody = document.createElement('tbody');
    this.elem.append(this.tbody)
    this.thead = document.createElement('thead');
    this.thead.innerHTML ='<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr>'
    this.elem.append(this.thead);

    for (let row of rows) {
      this.row = document.createElement('tr')
      this.tbody.append(this.row);
      
      for (let key in row) {
        this.td = document.createElement('td');
        this.td.innerHTML = row[key];
        this.row.append(this.td);
      }
      this.td = document.createElement('td');
      this.td.innerHTML = '<button>X</button>';
      this.row.append(this.td);
      let button = this.row.querySelector('button');
    button.addEventListener('click', () => button.closest('tr').remove())
    }
    
    
  }
}
