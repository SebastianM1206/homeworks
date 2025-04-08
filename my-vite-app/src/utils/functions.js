//I got primarily the idea from this article:
//https://www.freecodecamp.org/news/regular-vs-arrow-functions-javascript/#regular-function-syntax-vs-arrow-function-syntax

/**
Differences between Regular Functions and Arrow Functions in JavaScript:

1. 'this' Binding:
- Regular Functions: Define their own 'this' context, which depends on how the function is called.
- Arrow Functions: Do not have their own 'this' context, they inherit 'this' from the surrounding lexical scope.
 
2. 'arguments' Object:
- Regular Functions: Have access to the 'arguments' object, an array-like collection of all arguments passed to the function.
- Arrow Functions: Do not have their own 'arguments' object; attempting to access 'arguments' within an arrow function will result in a reference error.


3. Constructor Usage:
- Regular Functions: Can be used as constructors and invoked with the 'new' keyword to create instances.
- Arrow Functions: Cannot be used as constructors and will throw an error if used with 'new'.

4. Hoisting:
- Regular Functions: Function declarations are hoisted, allowing them to be called before they are defined in the code.
- Arrow Functions: Are not hoisted in the same manner; they must be defined before they are used.

5. Duplicate Named Parameters:
- Regular Functions: Allow duplicate named parameters, though this can lead to unexpected behavior and is not recommended.
- Arrow Functions: Don't  permit duplicate named parameters and will throw a syntax error if duplicates are present.
*/

// This is a regular Function Implementation (with the typical function keyword)
export function checkOddOrEven(num) {
  if (num % 2 === 0) {
    console.log(`${num} is an even.`);
  } else {
    console.log(`${num} is an odd.`);
  }
}

// Arrow Function Implementation (with the arrow syntax)
export const checkOddOrEvenArrow = (num) => {
  if (num % 2 === 0) {
    console.log(`${num} is an even.`);
  } else {
    console.log(`${num} is an odd.`);
  }
};
