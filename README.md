# SwiftCart

### 1. What is the difference between null and undefined?
### Answer:
In JavaScript, both undefined and null are used to represent the absence of a value, but their purposes are different.

undefined means a variable has been declared but no value has been assigned. In this case, the JavaScript engine automatically sets the variable to undefined.

null is a value that developers intentionally assign. It indicates that the variable currently has no value. For example, if no data is received from an API, we can set user = null.

---

### 2. What is the use of the map() function in JavaScript? How is it different from forEach()? 
### Answer:
Both map() and forEach() are used to iterate over arrays in JavaScript, but their usage is different.

map() → Runs a function on each element and returns a new array. The original array remains unchanged. It is mainly used for transforming data or creating a new array.

forEach()

---

### 3. What is the difference between == and ===?
### Answer:
In JavaScript, == is used for loose equality and === is used for strict equality checks.

== only checks the value and, if necessary, performs type conversion before comparison.

=== checks both value and type, without doing any type conversion.

---

### 4. What is the significance of async/await in fetching API data?
### Answer:
When fetching data from an API, using async/await makes the code more readable, makes error handling easier with try/catch, ensures that API calls run in the background without freezing the main thread, and makes the code easier to maintain.

--- 

### 5. Explain the concept of Scope in JavaScript (Global, Function, Block).
### Answer :
Scope refers to the boundary or execution context that determines where a variable or function can be accessed in code and where it cannot.

In JavaScript, there are mainly three types of scope:

Global Scope → Accessible from anywhere in the program.

Function Scope → Accessible only inside the function where it is declared.

Block Scope (let/const) → Accessible only within the {} block where it is declared.

---
