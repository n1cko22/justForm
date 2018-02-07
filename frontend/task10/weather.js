let api="16b76a4bf5553901df564275e8be0a21";
let apiLink="https://api.openweathermap.org/data/2.5/weather?";
let id=3105913;

      /*Client ID (Consumer Key)
dj0yJmk9aVBKN0lPWG01Z3hiJmQ9WVdrOVFVOWpiemxKTkhNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD00NA--
Client Secret (Consumer Secret)
f0459dc75ff097a5e986c8c57619b8d43a5d1f7a*/
function updateZip(){
    var div = document.getElementById('location');
    var url = apiLink+"id="+id+"&APPID="+api;
    
    return fetch(url)
    .then(response =>{
        if (response.ok){
            return response.json();
        }else{
            throw new Error(response.status);
        }
        
    })
    .then(data=>{
        return data;
    })
    .catch(error =>{
        console.log(Error);
    })

    
};
let get = document.getElementById('location');
get.addEventListener('click', updateZip);