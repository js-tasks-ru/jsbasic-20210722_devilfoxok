function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {
    if ( typeof salaries[key] === 'number'  && (salaries[key]/salaries[key] == 1) ) { 
      sum += salaries[key];
    }
  }
  
  return sum;
}
