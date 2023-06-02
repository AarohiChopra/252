var foldl = function (f, acc, array) {
	for(int i = 0; i < array.length; i++)
	{
		acc = f(acc, array[i]);
	}
	return acc;
};

console.log(foldl(function(x,y){return x+y}, 0, [1,2,3]));

var foldr = function(f, z, array) {
  for (var i = array.length - 1; i >= 0; i--) {
    z = f(array[i], z);
  }
  return z;
};

console.log(foldl(function(x,y){return x/y}, 1, [2,4,8]));

var map = function(f, array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push(f(array[i]));
  }
  return result;
};

console.log(map(function(x){return x+x}, [1,2,3,5,7,9,11,13]));


// Write a curry function as we discussed in class.
// Create a `double` method using the curry function
// and the following `mult` function.
function mult(x,y) {
  return x * y;
}
function dou(x) {
  return 2 * x;
}
Function.prototype.curry = function() {
  var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this;
  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
};
var mul = mult.curry(1);
console.log(mul(3));
console.log(dou.curry(3));




