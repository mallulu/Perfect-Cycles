
// This function checks whether an array is a perfect cycle or not
 function checkCycleValidity(array) {

    // If the array has no elements, then it isn't a perfect cycle
    if (array.length == 0){
        return false;
    }

    // First, initialize a "visit table", which is an array of booleans the same size 
    // as the given array that is used to check which indices the cycle visits.
    var visitTable = Array(array.length).fill(false);

    // Set 0 as the initial index
    var currentIndex = 0;

    // Function that checks whether every value in the visit table has been visited, 
    // i.e. whether tbe array is a perfect cycle, and returns true if so, and false otherwise.
    let checker = arr => arr.every(v => v === true);

    do {
        let nextIndex = array[currentIndex];    // Get the next index, which is the value of the current index
        if (nextIndex >= array.length) {
            // If the next index is out of the bounds of the array, the perfect cycle is automatically broken.
            break;
        }
        visitTable[currentIndex] = true;    // Mark the current index as visited/true in the visit table
        currentIndex = nextIndex;           // Initialize the current index for the next itiration of the loop.
    } while (currentIndex != 0);    // If the current index is back to 0, then we've started the cycle anew

    return checker(visitTable);     // If all the indices have been visited, returns true. Otherwise, returns false.
}

function getPerfectCycles(data) {
    let validatedArrays = {};   // Initialize the response json
    for (let key in data) {     // Go through all the arrays in the request json
        validatedArrays[key] = checkCycleValidity(data[key]);  // Set the values of each array whether it is a perfect loop or not
    }
    return validatedArrays;     // Return the response json
}

exports.checkCycleValidity = checkCycleValidity;
exports.getPerfectCycles = getPerfectCycles;