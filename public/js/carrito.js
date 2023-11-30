const host = "http://localhost:8000";



window.addEventListener("load", function(event){
    fetch(`${host}/compratotal`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const compraTotalDiv = document.getElementById("compraTotal");
        compraTotalDiv.innerHTML = `<div class="h4">${json.total} <i class="bi bi-currency-euro m-color"></i></div>`;
    })
    .catch(function(error){
        console.log(error);
    });
});
