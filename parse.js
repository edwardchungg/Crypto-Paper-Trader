// This is our 2d Array to string method 
// (2D Array) => (string)
// Example: 'Bob,1234,Bob@example.com,Mark,5678,Mark@example.com'

const arrToString = (arr) => {
    let str = "";
    for (let item of arr) {
        if (Array.isArray(item)){
            str += arrToString(item);
        }
        else{
            str += item + ',';
        }
    }
/*
    if ((str.charAt(str.length - 1)) == ","){
        
        return str.slice(0,-1);   
    }
*/
    return str;
}

//This is our formatting method that parses our string to our intended format to allow it to be used in both arr/str functions
// (string delimited by commas) => (string delimited by commas and semicolons)
// Example: 'Bob,1234,Bob@example.com;Mark,5678,Mark@example.com'

const addSemicolons = (str, arraySize) => {


    let newString = "";
    let count = 0;
    for (let i = 0; i < str.length; i++){
        if (str.charAt(i) == ','){
            count++;
            if ((count % arraySize == 0) && count != 0){
                newString += ";";
            }
            else{
                newString += str.charAt(i);
            }
        }
        else{
            newString += str.charAt(i);
        }
    }
    if ((newString.charAt(newString.length - 1)) == ";"){
        
        return newString.slice(0,-1);   
    }
    return newString;
}


// This is our string to array method that will be used to convert a string to a 2d array.
// Needs a ; to separate arrays
const stringToArray = (str) => {

    if (str == "" || str == null){
        return null;
    }

    let arr = [];
    arr = str.split(';');
    for(let i = 0; i < arr.length; i++){
       arr[i] = arr[i].split(',');
    };
    return arr;
    
}




