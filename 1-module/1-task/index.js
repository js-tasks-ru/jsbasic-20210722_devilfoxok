function factorial(n) {
 let sum = 1;

 if (n == 0 || n == 1) { return sum; }

 for (let i = n; i > 1; i--) {
    sum *= i;
 }
 
 return sum;
}
