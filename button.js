// button.js

const button = document.getElementById('button');

button.addEventListener('click',(function(){
    let count =0;

    return function (){
    
            count += 1

            if(count === 2){
                alert("This alert apperas every othert press");
                count =0;
            }
    
    };
})());