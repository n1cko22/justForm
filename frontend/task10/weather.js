//data
let api="16b76a4bf5553901df564275e8be0a21";
let apiLink="https://api.openweathermap.org/data/2.5/forecast?q=";
//let id=3105913;
let input = document.getElementById('search-city');
let get = document.getElementById('location');
get.addEventListener('click', controller);
let days=8;
var scale ={ 
    celsium: 'metric',
    fahrenheit: 'imperial',
    change: document.getElementById('change'),
    current: 'metric',
    

};
scale.change.addEventListener('click',changeUnit);
let recentCity = [];
let favouriteCity = [];
var his = document.getElementById('history');
var fav = document.getElementById('favourite');
fav.addEventListener('click', function(){
    favouriteCity = JSON.parse(localStorage.getItem('favouriteCity'));
    updateZip(favouriteCity);
    console.log('dt')
});
var plus = document.getElementById('add-favourite');
    plus.addEventListener('click', function(){
        cityFavourite(input.value);
        renderList(favouriteCity,fav);
    });

function controller(){
    var div = document.getElementById('container-data');
    var div2 = document.getElementById('week');
    var target = input.value;
    
   
    
    
   // console.log(target);

    updateZip(target,div);
    cityHistory(target);
}
//get Forecast
function updateZip(city,elem){
    
    var url = apiLink + city + "&APPID=" + api + '&units=' + scale.current + '&cnt=' + days;
    console.log(scale.current);
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
        
        renderList(recentCity,his)
        
    })
    .catch(error =>{
        console.log(Error);
    })
console.log(store);
    
 
};
// making HTML with weather
function renderHTML(data,elem){
    elem.innerHTML=
        `
		<div class='today'>
			<p>${ data.city.name }</p>
			<p>${ data.list[0].main.temp.toFixed(0) } </p>
			<p>${ data.list[0].main.temp_max.toFixed(0)} ... ${data.list[0].main.temp_min.toFixed(0)}</p>
		</div>
		`
};
function renderForWeek(data,elem){
  for (let i = 1; i < data.list.length; i++) {
    
    elem.innerHTML+=  
		`<div class = 'week-forecast'>
			<p>${ data.city.name }</p>
			<p>${ data.list[i].main.temp.toFixed(0) } </p>
			<p>${ data.list[i].main.temp_max.toFixed(0)} ... ${data.list[i].main.temp_min.toFixed(0)}</p>
		</div>
	`
  }
  };

    //unit change
function changeUnit(){
		if (scale.current === scale.celsium) {
			scale.current = scale.fahrenheit;
		} else {
			scale.current = scale.celsium;
        }
    
    console.log(scale.change);
    scale.change.value = scale.current;
    controller();
};
//url 

//add to favorite
function cityFavourite(city){
    if (favouriteCity.length === 3){
       favouriteCity.shift()
    };
    favouriteCity.push(city);
    
    localStorage.setItem('favouriteCity', JSON.stringify('favouriteCity'));
    console.log(localStorage);       
};
//add to history
function cityHistory(city){
    if (recentCity.length === 5){
       recentCity.shift()
    };
    recentCity.push(city);
    
    localStorage.setItem('recentCity', JSON.stringify('recentCity'));
    console.log(localStorage);
};

//render History and Favorite
function renderList(list,div){
    
		// add cities from favouriteCities
    div.innerHTML = '';
		for (var i = list.length - 1; i >= 0; i--) {
			let cityName = list[i];
			let cityLi = document.createElement( 'a' );
			cityLi.innerHTML = `${cityName}`;
			cityLi.href = `?q=${cityName}`;
            div.append(cityLi);



    }
  };
//url 

//пуе

function getFavouriteCity(){
    favouriteCity = JSON.parse(localStorage.getItem('favoriteCity'));  
};
function getHistoryCity(){
    recentCity = JSON.parse(localStorage.getItem('recentCity'));
};
