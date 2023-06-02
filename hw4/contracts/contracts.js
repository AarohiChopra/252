// NOTE: This library uses non-standard JS features (although widely supported).
// Specifically, it uses Function.name.
function any(v) {
  return true;
}
function isNumber(v) {
  return !Number.isNaN(v) && typeof v === 'number';
}
isNumber.expected = "number";
//
// ***YOUR CODE HERE***
// IMPLEMENT THE FOLLOWING CONTRACTS
//

//
// isBoolean(v) returns boolean results based on the typeOf of v
// :t v == boolena => returns true 
//

function isBoolean(v){
  return typeof v === "boolean";
}
isBoolean.expected = "boolean";

//
// isDefined(v) returns boolean results based on the typeOf of v
// :t v == defined => returns true
// 
 

// value !== undefined gives ref error !??

function isDefined(v){
  return v !== null && typeof v !== "undefined";
}
isDefined.expected = "defined";

//
// isString(v) returns boolean results based on the typeOf of v
// :t v == string => returns true
//

// instanceOf checks instance is of String object not primitive string
// ==  is messed up

function isString(v){
  return typeof v === "string" || (Object.prototype.toString.call(v) === "[object String]");
}
isString.expected = "string";

//
// isNegative(v) returns boolean results based on the value of v
// :t v == number && < 0 => returns true
//

function isNegative(v){
  return isNumber(v) && v<0;
}
isNegative.expected = "negative number";

//
// isPositive(v) returns boolean results based on the value of v
// :t v == number && > 0 => returns true
//

function isPositive(v){
  return isNumber(v) && v>0;
}
isPositive.expected = 'positive number';


// Combinators:

function and() {
  let args = Array.prototype.slice.call(arguments);
  let cont = function(v) {
    for (let i in args) {
      if (!args[i].call(this, v)) {
        return false;
      }
    }
    return true;
  }
  cont.expected = expect(args[0]);
  for (let i=1; i<args.length; i++) {
    cont.expected += " and " + expect(args[i]);
  }
  return cont;
}

//
// ***YOUR CODE HERE***
// IMPLEMENT THESE CONTRACT COMBINATORS
//
function or(){
  let args = Array.prototype.slice.call(arguments);
  let cont = function(v) {
    for (let i in args) {
      if (args[i].call(this, v)) {
        return true;
      }
    }
    return false;
  }
  cont.expected = expect(args[0]);
  for (let i=1; i<args.length; i++) {
    cont.expected += " or " + expect(args[i]);
  }
  return cont;
};

function not(){
  let args = Array.prototype.slice.call(arguments);
  let cont = function(v) {
    // ! return a boolean value indicating whether the contract is satisfied or not.
    return !args[0].call(this, v);
  }
  cont.expected = "not " + expect(args[0]);
  return cont;
};



// Utility function that returns what a given contract expects.
function expect(f) {
  // For any contract function f, return the "expected" property
  // if it is specified.  (This allows developers to specify what
  // the expected property should be in a more readable form.)
  if (f.expected) {
    return f.expected;
  }
  // If the function name is available, use that.
  if (f.name) {
    return f.name;
  }
  // In case an anonymous contract is specified.
  return "ANONYMOUS CONTRACT";
}

//
//
//
//

function contract (preList, post, f) {
  let myHandler = { apply: function(tarF, arg, argLis) {
    for (let a in argLis)
    {
      let checkPre = preList[a].call(arg, argLis[a]);
      if(! checkPre)
      {
        throw new Error('Contract violation at position ' + a + '. Expected ' + preList[a].expected + ' but received ' + argLis[a] + '. Blame -> Top-level code');
      }
    }
    let checkPost = tarF.apply(arg, argLis);
    if(!post(checkPost))
    {
      throw new Error('Contract violation. Expected ' + post.expected + ' but returned ' + checkPost + '. Blame -> ' + f.name);
    }
    return checkPost;
}
};
  const proxyF = new Proxy(f, myHandler);
  return proxyF;
}
module.exports = {
  contract: contract,
  any: any,
  isBoolean: isBoolean,
  isDefined: isDefined,
  isNumber: isNumber,
  isPositive: isPositive,
  isNegative: isNegative,
  isInteger: Number.isInteger,
  isString: isString,
  and: and,
  or: or,
  not: not,
};
