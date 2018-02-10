let api="16b76a4bf5553901df564275e8be0a21";
let apiLink="https://api.openweathermap.org/data/2.5/forecast?q=";
let id=3105913;
let input = document.getElementById('search-city')
let get = document.getElementById('location');
get.addEventListener('click', controller);
let days=8;
var scale = (() => {
				})();
scale = document.getElementById('change');
scale.addEventListener('click',changeUnit(scale));

function controller(){
    var div = document.getElementById('container-data');
    var div2 = document.getElementById('week');
    var target = input.value;
    
   // console.log(target);
    updateZip(target,div);
}

function updateZip(city,elem){
    
    var url = apiLink + city + "&APPID=" + api + '&units=' + scale + '&cnt=' + days;
    
    return fetch(url)
    .then(response => {
        if (response.ok){
            return response.json();
            
        }else{
            throw new Error(response.status);
        }
        
    })
    .then(data => {
        console.log(data);
        
        renderHTML(data,elem);
        renderForWeek(data,elem);
      
        
    })
    .catch(error =>{
        console.log(Error);
    })
console.log(store);
    
 
};
function renderHTML(data,elem){
    elem.innerHTML=
        `
		<div class='today'>
			<p>${ data.city.name }</p>
			<p>${ data.list[0].main.temp } </p>
			<p>${ data.list[0].main.temp_max} ... ${data.list[0].main.temp_min}</p>
		</div>
		`
};
function renderForWeek(data,elem){
  for (let i = 1; i < data.list.length; i++) {
    
    elem.innerHTML+=  
		`<div class = 'week-forecast'>
			<p>${ data.city.name }</p>
			<p>${ data.list[i].main.temp } </p>
			<p>${ data.list[i].main.temp_max} ... ${data.list[i].main.temp_min}</p>
		</div>
		`
  };
};
function changeUnit(scale){
		if (scale === 'metric') {
			scale = 'imperial';
		} else {
			scale = 'metric';
        }
};