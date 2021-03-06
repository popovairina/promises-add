
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {

    function convert(from, to) {
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();

            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            request.addEventListener('load', function() {
                if (request.status < 400) {
                    resolve(request.response)
                } else {
                    reject(request.statusText)
                }
            });
            request.send();
        });
    }

    convert(inputUsd, inputRub)
        .then((response)=> {
            let data = JSON.parse(response);
            inputUsd.value = inputRub.value / data.usd;
        })
        .catch(()=> inputUsd.value = "Что-то пошло не так!");

});