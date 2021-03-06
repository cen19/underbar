(function() {
  'use strict';

  window._ = {};
  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n > array.length) {
      return array;
    }
    return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length)
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var x in collection) {
        iterator(collection[x], x, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // test are even/odd
    var result = [];

    _.each(collection, function(item) {
      if (test(item)) {
        result.push(item);
      }
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) { //isEven(1) --> false, true false ,[1,2,3]
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item) {
      if (!test(item)) { //! isEven(2)
        return true;
      }
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) { //1,2,2,3,4
    var uniqueArray = [];
    for (var i = 0; i < array.length; i++) {
      if (!uniqueArray.includes(array[i])) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mappedArray = [];

    _.each(collection, function(item) {
      mappedArray.push(iterator(item));
    })

    return mappedArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

    if (accumulator === undefined) {
      accumulator = collection[0];
      if (Array.isArray(collection)) {
        for (var i = 1; i < collection.length; i++) {
          accumulator = iterator(accumulator, collection[i]);
        }
      } else {
        for (var prop in collection) {
          accumulator = iterator(accumulator, collection[prop])
        }
      }
    } else {
      if (Array.isArray(collection)) {
        for (var j = 0; j < collection.length; j++) {
          accumulator = iterator(accumulator, collection[j]);
        }
      } else {
        for (var prop in collection) {
          accumulator = iterator(accumulator, collection[prop]);
        }
      }
    }

    return accumulator;
  }



    //   var initializing = accumulator === undefined;
    //   _.each(collection, function(item) {
    //     if (initializing) {
    //       accumulator = item;
    //       initializing = false;
    //     } else {
    //       accumulator = iterator(accumulator, item);
    //     }
    //   });
    //   return accumulator;
    // }





  /*var identity = _.reduce([5], function(total, number){
       return total + number * number;
     });
  console.log(identity);*/

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    if (!iterator) {
      var check = true;
      _.each(collection, function(element) {
        check = check && element;
      });
      return check;
    }

    return _.reduce(collection, function(status, element) {
      return status && (iterator(element) ? true : false);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // default iterator checks booleans
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    if (collection.length === 0) {
      return false;
    }


    if (!iterator) {
      var exists = false;
      _.each(collection, function(element) {
        if (element === true) {
          exists = true;
        }
      });
      return exists;
    }
    //

    // Solution #1
    // var outlier = [];
    // for(var i = 0; i < collection.length; i++){
    //   if(iterator(collection[i])){
    //     outlier.push(collection[i])
    //   }
    // }

    // if(outlier.length > 0){
    //   return true;
    // } else {
    //   return false;
    // }

    // Solution #2
    return (_.every(collection, function(item) {
      return iterator(item) ? false : true;
    })) ? false : true;

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {

    //use arguments.length to find out the number of paramaters to chain

    for (var i = 1; i < arguments.length; i++) {
      for (var prop in arguments[i]) {
        obj[prop] = arguments[i][prop];
      }
    }
    return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {


    for (var i = 1; i < arguments.length; i++) {
      for (var prop in arguments[i]) {
        if (!obj.hasOwnProperty(prop)) {
          obj[prop] = arguments[i][prop];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {


    // var cache = {};
    //    return function(){
    //      var serialized = Array.prototype.slice.apply(arguments);
    //      if (!cache.hasOwnProperty(serialized)){
    //        cache[serialized] = func.apply(this, arguments);
    //      }
    //      return cache[serialized];
    //    }


    var storage = {} //aka hash or cache = {};


    return function() {
      var arg = JSON.stringify(arguments); // (1, 2, 3)
      if (!storage[arg]) {
        storage[arg] = func.apply(this, arguments);
      }

      return storage[arg];
    }


  };



  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // setTimeout() -- excecutes a snippet of code after a delay

    // this makes it so we can use the arguments
    // makes an array from array-like-object
    // use regular slice when dealing with arrays
    var args = Array.prototype.slice.call(arguments, 2);

    setTimeout(function() {
      // func applies (itself, arguments)
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {


    var args = Array.prototype.slice.apply(array);
    //Randomize inside of clone array
    //iterate each element and assign a arbitary value
    //Math.random()
    // sort and put back in array
    // var randomizeArray = [];
    // var storage = {}
    // for (var i = 0; i < args.length; i++) {
    //   storage[Math.random() * 100] = args[i];
    //  }
    //  var sortedObject = Object.keys(storage).sort(function(a,b){
    //   return a-b;
    //  })

    // for(var num in storage){
    //   randomizeArray.push(storage[num]);
    // }



    // var currIndex = 0;
    var tempValue = '';
    var randomIndex = '';

    for (var j = 0; j < args.length; j++) {
      randomIndex = Math.floor(Math.random() * j);

      // swap
      tempValue = args[j];
      args[j] = args[randomIndex];
      args[randomIndex] = tempValue;
    }


    return args;



    //   var currentIndex = array.length;
    //   var temporaryValue;
    //   var randomIndex;

    //   // While there remain elements to shuffle...
    //   while (0 !== currentIndex) {

    //     // Pick a remaining element...
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     currentIndex -= 1;

    //     // And swap it with the current element.
    //     temporaryValue = array[currentIndex];
    //     array[currentIndex] = array[randomIndex];
    //     array[randomIndex] = temporaryValue;
    //   }

    //   return array;
    // }


  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  _.invoke = function(collection, functionOrKey, args) {
  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.


// function(collection, functionOrKey, arg) {
//     var args = Array.prototype.slice.call(arguments, 2);
//     var isFunc = typeof functionOrKey === 'function';

//     return _.map(collection, function(element) {
//       var func = isFunc ? functionOrKey : element[functionOrKey];
//       return func == null ? func : func.apply(element, args);
//     });
//   };

//   })


  // _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(item) {
      // console.log(item, typeof item);
      var method;
      if (typeof(functionOrKey) === 'string') {
        method = item[functionOrKey];
      } else {
        method = functionOrKey;
      }

      return method.apply(item);
    });
  };

// argsArray
// An array-like object, specifying the arguments with which function should be called, or null or undefined if no arguments should be provided to the function. Starting with ECMAScript 5 these arguments can be a generic array-like object instead of an array. See below for browser compatibility information.






  _.sortBy = function(collection, iterator) {

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  // var sortedCollection;

  //  _.each(collection, function(element){
  //     sortedCollection = iterator(element);
  //  })
  //  sortedCollection;

  if (typeof(iterator) === 'function') {
      return collection.sort(function(a, b) {
        return iterator(a)-iterator(b);
      });
    } else {
      return collection.sort(function(a, b) {
        return a[iterator]-b[iterator];
      });
    }


  };

  _.zip = function() {
      // Zip together two or more arrays with elements of the same index
  // going together.
  //

  // has to take into account unknown amount
    // Example:
    // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]


    var arrays = Array.prototype.slice.call(arguments);
    var sortedArrays = arrays.sort(function (a, b) {
      return b.length - a.length
    });


    var finalArray = [];
    for(var i = 0; i < sortedArrays[0].length; i ++){
      var tempArray =[]
      for (var j = 0; j < sortedArrays.length; j++) {
        if (!sortedArrays[j][i]) {
          tempArray.push(undefined);
        } else {
          tempArray.push(sortedArrays[j][i]);
        }
      } // inner loops ends
      finalArray.push(tempArray);
    } // outer loops ends
    return finalArray;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    return _.reduce(nestedArray, function(prev, curr) {
      return prev.concat(Array.isArray(curr) ? _.flatten(curr) : curr);
    },[]);

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var results = [];
    // iterate through the first array's elements
    for (var i = 0; i < args[0].length; i++) {
      var currentElementOfFirstArray = args[0][i];
      // iterate through all the other arrays's elements to check for a match
      for (var j = 1; j < args.length; j++) {
        // this is inside the 'following' array
        for (var k = 0; k < args[j].length; k++) {
          // now iterating through elements of 'following' array
          // if there is a match, push to the results array
          if (currentElementOfFirstArray === args[j][k]) {
            results.push(currentElementOfFirstArray);
          }
        }
      }
    }

    // return results
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {





  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {}




  ;
}());