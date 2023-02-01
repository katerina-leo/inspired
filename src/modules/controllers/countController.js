export const countController = (minus, number, plus, input) => {
  let n = +input.value;

  minus.addEventListener('click', () => {
    if(n > 1) {
      n = n - 1;
    }
    
    number.textContent = n;
    input.value = n;
  })

  plus.addEventListener('click', () => {
  
      n = n + 1;
  
    
    number.textContent = n;
    input.value = n;
  })
}