function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        localStorage.setItem('myJSON', JSON.stringify(result));
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
};

const resultNode = document.querySelector('.j-result');

function displayResult(apiData) {
    let cards = '';
    
    apiData.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
      cards = cards + cardBlock;
    });
      
    resultNode.innerHTML = cards;
}

const btnNode = document.querySelector('.j-btn-request');

btnNode.addEventListener('click', () => {
    let value1;
    let value2;

    value1 = Number(document.querySelector('.input1').value);
    value2 = Number(document.querySelector('.input2').value);


    //Проверка числа
    if (typeof value1 == 'number' && !isNaN(value1) && typeof value2 == 'number' && !isNaN(value2)) {
        if (value1 >= 1 && value1 <=10 && value2 >= 1 && value2 <=10 ) {
            let linkPhoto= `https://picsum.photos/v2/list?page=${value1}&limit=${value2}`;
            useRequest(linkPhoto, displayResult);   
        } else if ((value1 < 1 || value1 > 10) && value2 >= 1 && value2 <=10) {
            alert('Номер страницы вне диапазона от 1 до 10');
        } else if ((value2 < 1 || value2 > 10) && value1 >= 1 && value1 <=10) {
            alert('Лимит вне диапазона от 1 до 10');
        } else {
            alert('Номер страницы и лимит вне диапазона от 1 до 10');
        }
    } else {
        alert('Введино не число');
    }
  });

let myJSON = localStorage.getItem('myJSON');
let result = JSON.parse(myJSON);
displayResult(result);