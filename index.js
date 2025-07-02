

console.log(Array.from(
    [1 , 2 , 3 , , 5] , (e , i) => {
        return e % 2 == 0;
    }
    
))