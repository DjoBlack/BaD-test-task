function processFile() {
    const fileInput = document.getElementById('fileInput');
    const maxValue = document.getElementById('maxValue');
    const minValue = document.getElementById('minValue');
    const medianValue = document.getElementById('medianValue');
    const arithmeticMeanValue = document.getElementById('arithmeticMeanValue');
    const ascSequence = document.getElementById('longestAscSequence');
    const descSequence = document.getElementById('longestDescSequence');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const contents = event.target.result;
        const numbers = contents.split('\n').map(Number);

        const maxNum = arrayMax(numbers);
        const minNum = arrayMin(numbers);
        const medianNum = findMedian(numbers);
        const arithmeticMeanNum = findArithmeticMean(numbers);
        const longestAscSequence = findLongestAscendingSequence(numbers);
        const longestDescSequence = findLongestDescendingSequence(numbers)

        maxValue.textContent = `Highest number is: ${maxNum}`;
        minValue.textContent = `Lowest number is: ${minNum}`;
        medianValue.textContent = `Median is: ${medianNum}`;
        arithmeticMeanValue.textContent = `Arithmetic mean is: ${arithmeticMeanNum}`;
        ascSequence.textContent = `Longest ascending sequence is: ${longestAscSequence}`;
        descSequence.textContent = `Longest descending sequence is: ${longestDescSequence}`;
    };

    reader.readAsText(file);
}

function arrayMax(arr) {
    return arr.reduce(function (p, v) {
      return ( p > v ? p : v );
    });
  }

function arrayMin(arr) {
    return arr.reduce(function (p, v) {
        return ( p < v ? p : v );
    });
}

function findMedian(array) {
    const length = array.length;
    
    if (length % 2 === 0) {                                 // if array have even length
        const midIndex = length / 2;
        return (array[midIndex - 1] + array[midIndex]) / 2;
    } else {                                                // if array have uneven length
        const midIndex = Math.floor(length / 2);
        return array[midIndex];
    }
}

function findArithmeticMean(array) {
    // Calculate the sum of all elements in the array
    const sum = array.reduce((acc, currentValue) => acc + currentValue, 0);

    // Calculate the average by dividing the sum by the number of elements
    const average = sum / array.length;

    return average;
}

function findLongestAscendingSequence(array) {
    let currentSequence = [array[0]]; // Initialize the current sequence with the first element
    let longestAscSequence = [array[0]]; // Initialize the longest sequence with the first element

    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[i - 1]) {
            // If the current element is greater than the previous one, it's part of the ascending sequence
            currentSequence.push(array[i]);
        } else {
            // If the current element is not greater, the ascending sequence is broken
            if (currentSequence.length > longestAscSequence.length) {
                // Update the longest sequence if the current one is longer
                longestAscSequence = currentSequence.slice();
            }

            // Start a new sequence with the current element
            currentSequence = [array[i]];
        }
    }

    // Check the last sequence in case it's the longest
    if (currentSequence.length > longestAscSequence.length) {
        longestAscSequence = currentSequence;
    }

    return longestAscSequence;
}

function findLongestDescendingSequence(array) {
    let currentSequence = [array[0]]; // Initialize the current sequence with the first element
    let longestDescSequence = [array[0]]; // Initialize the longest sequence with the first element

    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            // If the current element is less than the previous one, it's part of the descending sequence
            currentSequence.push(array[i]);
        } else {
            // If the current element is not less, the descending sequence is broken
            if (currentSequence.length > longestDescSequence.length) {
                // Update the longest sequence if the current one is longer
                longestDescSequence = currentSequence.slice();
            }

            // Start a new sequence with the current element
            currentSequence = [array[i]];
        }
    }

    // Check the last sequence in case it's the longest
    if (currentSequence.length > longestDescSequence.length) {
        longestDescSequence = currentSequence;
    }

    return longestDescSequence;
}