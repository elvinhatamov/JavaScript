# JavaScript.tutorial

Function Declarations vs. Function Expressions
Before we jump into immediately-invoked function expressions (IIFE), let's make sure we're on the same page regarding the differences between function declarations and function expressions.

A function declaration defines a function and does not require a variable to be assigned to it. It simply declares a function, and doesn't itself return a value. Here's an example:

function returnHello() {
  return 'Hello!';
}
On the other hand, a function expression does return a value. Function expressions can be anonymous or named, and are part of another expression's syntax. They're commonly assigned to variables, as well. Here's the same function as a function expression:

// anonymous
const myFunction = function () {
  return 'Hello!';
};

// named
const myFunction = function returnHello() {
  return 'Hello!';
};

Immediately-Invoked Function Expressions: Structure and Syntax
An immediately-invoked function expression, or IIFE (pronounced iffy), is a function that is called immediately after it is defined. Check out the following example:

(function sayHi(){
    alert('Hi there!');
  }
)();

// alerts 'Hi there!'
The syntax might seem a bit odd, but all we're doing is wrapping a function in parentheses, then adding a pair of parentheses at the end of that to invoke it!

Passing Arguments into IIFE's
Let's look into how we can go about passing arguments into IIFE's. Consider the following example of an anonymous function expression that takes in a single argument:

(function (name){
    alert(`Hi, ${name}`);
  }
)('Andrew');

// alerts 'Hi, Andrew'
The second pair of parentheses not only immediately executes the function preceding it -- it's also the place to put any arguments that the function may need! We pass in the string 'Andrew', which is stored in the function expression's name variable. It is then immediately invoked, alerting the message 'Hi, Andrew' onto the screen.

Here's another example of an IIFE, this time taking two arguments and returning their product:

(function (x, y){
    console.log(x * y);
  }
)(2, 3);

// 6
Again -- the arguments passed into the anonymous function (i.e., 2 and 3) belong in trailing set of parentheses.

IIFE's and Private Scope
One of the primary uses for IIFE's is to create private scope (i.e., private state). Recall that variables in JavaScript are traditionally scoped to a function. Knowing this, we can leverage the behavior of closures to protect variables or methods from being accessed! Consider the following example of a simple closure within an IIFE, referenced by myFunction:

const myFunction = (
  function () {
    const hi = 'Hi!';
    return function () {
      console.log(hi);
    }
  }
)();
Let's break myFunction down and review the individual parts that make it up:


myFunction refers to an IIFE with a locally-defined variable, hi, and a returned function that closes over hi and prints its value to the console.

In the above image, an immediately-invoked function expression is used to immediately run a function. This function runs and returns an anonymous function that is stored in the myFunction variable.

Note that the function that is being returned closes over (i.e., captures) the hi variable. This allows myFunction to maintain a private, mutable state that cannot be accessed outside the function! What's more: because the function expressed is called immediately, the IIFE wraps up the code nicely so that we don't pollute the global scope.

If any of this sounds familiar -- it's because IIFE's are very closely related to everything you've learned about scope and closures!

QUESTION 1 OF 2
What is true about immediately-invoked function expressions? Select all that apply:

IIFE's can be used to create private scope


IIFE's are very closely associated with scope and closures

There is an alternative syntax for writing an IIFE

💡 Alternative Syntax for IIFE's 💡
Recall the example from the beginning of this section:

(function sayHi(){
   alert('Hi there!');
 }
)();

// alerts 'Hi there!'
This works great, but there's also another way we can write this to achieve the same results! The first set of parentheses can wrap around the entire expression. That is, we can move the first closing parenthesis to the very end:

(function sayHi(){
   alert('Hi there!');
}());

// alerts 'Hi there!'
Again, using either approach will still produce the same result: alerting 'Hi there!' in the browser.

Now, when would you choose one form over the other? Much of this is a stylistic choice; there is no "correct" way of auto-executing an anonymous function. Both are valid approaches for achieving the same result, and the JavaScript engine will still parse them each as a function expression (i.e., rather than as a function declaration).

Among developers, Douglas Crockford has mentioned that wrapping the entire unit in parentheses (as presented directly above) helps readers understand that what they're seeing is indeed an expression. Feel free to check out his chat here.

All in all, however you decide to form your immediately-invoked function expressions is up to you!

IIFE's, Private Scope, and Event Handling
Let's check out another example of an immediately-invoked function expression -- this time in the context of handling an event. Say that we want to create a button on a page that alerts the user on every other click. One way to begin doing this would be to keep track of the number of times that the button was clicked. But how should we maintain this data?

We could keep track of the count with a variable that we declare in the global scope (this would make sense if other parts of the application need access to the count data). However, an even better approach would be to enclose this data in event handler itself!

For one, this approach prevents us from polluting the global with extra variables (and potentially variable name collisions). What's more: if we use an IIFE, we can leverage a closure to protect the count variable from being accessed externally! This prevents any accidental mutations or unwanted side-effects from inadvertently altering the count.

To begin, let's first create an HTML file containing a single button:

<!-- button.html -->

<html>

  <body>

     <button id='button'>Click me!</button>

     <script src='button.js'></script>

  </body>

</html>
No surprises here -- just a <button> tag with ID of 'button'. We also reference a button.js file that we're now going to build. Within that file, let's retrieve a reference to that element via its ID, then save that reference to a variable, button:

// button.js

const button = document.getElementById('button');
Next, we'll add an event listener to button, and listen for a 'click' event. Then, we'll pass in an IIFE as the second argument:

// button.js

button.addEventListener('click', (function() {
  let count = 0;

  return function() {
    count += 1;

    if (count === 2) {
      alert('This alert appears every other press!');
      count = 0;
    }
  };
})());
Quite a bit is going on in the IIFE, so let's break it down!

First, we declare a local variable, count, which is initially set to 0. We then return a function from that function. The returned function increments count, but alerts the user and resets the count back to 0 if the count reaches 2.

What is important to note is that the returned function closes over the count variable. That is, because a function maintains a reference to its parent's scope, count is available for the returned function to use! As a result, we immediately invoke a function that returns that function. And since the returned function has access to the internal variable, count, a private scope is created -- effectively protecting the data!

Containing count in a closure allows us to retain the data from each click. Now, let's see this all in action!


Here's the code from the preceding video:

button.html
button.js
QUESTION 2 OF 2
The following immediately-invoked function expression is run in the browser:

(function(n){
  delete n;
  return n;
})(2);
What is the return value?




2


Benefits of Immediately-Invoked Function Expressions
We've seen how using an immediately-invoked function expression creates a private scope that protects variables or methods from being accessed. IIFE's ultimately use the returned functions to access private data within the closure. This works out very well: while these returned functions are publicly-accessible, they still maintain privacy for the variables defined within them!

Another great opportunity to use an IFFE is when you want to execute some code without creating extra global variables. However, note that an IIFE is only intended to be invoked once, to create a unique execution context. If you have some code that is expected to be re-used (e.g., a function meant to be executed more than once in the application), declaring the function and then invoking it might be a better option.

All in all, if you simply have a one-time task (e.g., initializing an application), an IIFE is a great way to get something done without polluting your the global environment with extra variables. Cleaning up the global namespace decreases the chance of collisions with duplicate variable names, after all.

Summary
An immediately-invoked function expression (IIFE) is a function that is called immediately after it is defined. Utilizing an IIFE alongside closures allows for a private scope, which maintains privacy for variables defined within them. And since less variables are created, an IIFE will help to minimize pollution of the global environment, hindering the chances of variable name collisions.

Further Research
Function Declarations vs. Function Expressions
An Introduction to IIFEs - Immediately Invoked Function Expressions on A Drip of JavaScript
Immediately-Invoked Function Expression (IIFE) by Ben Alman
