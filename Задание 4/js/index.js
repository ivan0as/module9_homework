const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');

btnNode.addEventListener('click', () => {
    let value1;
    let valeu2;

    value1 = Number(document.querySelector('.input1').value);
    value2 = Number(document.querySelector('.input2').value);

    //Проверка числа
    if (typeof value1 == 'number' && !isNaN(value1) && typeof value2 == 'number' && !isNaN(value2)) {
        if (value1 >= 100 && value2 <= 300) {
            let linkPhoto= `https://picsum.photos/${value1}/${value2}`;
            fetch (linkPhoto)
            .then((response) =>{
            resultNode.innerHTML = 
            `<div class="card">
            <img src="${response.url}"/>
            </div>`;
            });
        } else {
            alert('одно из чисел вне диапазона от 100 до 300');
        }
    } else {
        alert('Введино не число');
    }
  });