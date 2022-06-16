// Clean the room:

const cleanTheRoom = array => {
	//Copying the value of the original array into another array so as to not modify the original array
	let newArray = array.slice();

	//Sorting newArray from the smallest number to the biggest
	newArray.sort((a, b) => a - b);

	//Storing number and string items in two different arrays
	const numberArray = newArray.filter(item => typeof(item) === "number");
	const stringArray = newArray.filter(item => typeof(item) === "string");

	//Function to group same values into individual arrays
	const groupTheArray = array => array.reduce((accumulator, currentValue) => {
		const firstIndex = array.indexOf(currentValue);
		const lastIndex = array.lastIndexOf(currentValue);
		const count = lastIndex - firstIndex + 1;
		if(count > 1) {
			accumulator.push(Array(count).fill(currentValue))
			array.splice(firstIndex, count, currentValue);
		} else {
			accumulator.push(currentValue);
		}
		return accumulator;
	}, [])

	//Returning array grouped into numbers and/or strings based on the input array
	if(numberArray.length > 0 && stringArray.length > 0) {
		return JSON.stringify([groupTheArray(numberArray), groupTheArray(stringArray)]);
	} else if(numberArray.length > 0) {
		return JSON.stringify(groupTheArray(numberArray));
	} else {
		return JSON.stringify(groupTheArray(stringArray));
	}
}

//Getting the input array value and displaying the grouped array
const displayGroupedArray = () => {
	const inputArray = document.querySelector("#array1").value.replace(/ /g, "");
	const outputArray = document.querySelector("#output_array");

	const arrayPattern = /^(-?\d+|\"-?\d+\")(,-?\d+|,\"-?\d+\")*$/;
	if(!arrayPattern.test(inputArray)) {
		outputArray.innerText = "Oops! Incorrect input format, please try again.";
		return;
	}

	const actualArray = inputArray.split(",").map(element => element.charAt(0) === "\"" ? element.slice(1,-1) : Number(element));
	outputArray.innerText = cleanTheRoom(actualArray);
}

//Listening to clicks on the 'Clean array' button
document.querySelector("#submit_array").addEventListener("click", displayGroupedArray);