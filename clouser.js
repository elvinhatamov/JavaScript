function expandArray(){
    let myArray = [ 1,1,1 ]; 
    
    return function (){
      myArray.push(1);
    
       return myArray;
    };
   
   }


 console.log(expandArray()());