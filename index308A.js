let counter = 0;

function recursiveFunction() {
  counter++;
  recursiveFunction();
}

try {
  recursiveFunction();
} catch (error) {
  console.error("An error occurred: ", error);
  console.log("Maximum call stack size:", counter);
}

//PART 2 - Trampolines - Flatening the arrays

function RecursiveFlattenArray(arr, acc = []) {
  if (arr.length === 0) return acc;
  const [head, ...tail] = arr;
  if (Array.isArray(head)) {
    return () => RecursiveFlattenArray(head.concat(tail), acc);
  } else {
    return () => RecursiveFlattenArray(tail, acc.concat(head));
  }
}

// Trampoline function to avoid stack overflow
function trampoline(fn) {
  return function (...args) {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
}

const fnForTrampoline = trampoline(RecursiveFlattenArray);

window.onload = function () {
  //   Cache the HTML element
  const primeContainer = document.getElementById("prime-container");

  // Step 3: Function to check if a number is prime
  function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  //  Function to add prime numbers between 1 and n to the HTML element
  function displayNumbers(n) {
    let i = 1;

    function calculatePrimeNumbers() {
      if (i > n) {
        alert("Calculation finished!");
        return;
      }

      if (isPrime(i)) {
        primeContainer.innerHTML += i + " ";
      }

      i++;
      setTimeout(calculatePrimeNumbers, 0);
    }

    calculatePrimeNumbers();
  }

  displayNumbers(10000);
};
