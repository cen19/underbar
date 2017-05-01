
// function _.sortBy(){

//      if (typeof(iterator) === 'function') {
//       return collection.sort(function(a, b) {
//         return iterator(a)-iterator(b);
//       });
//     } else {
//       return collection.sort(function(a, b) {
//         return a[iterator]-b[iterator];
//       });
//     }
//    }




//         var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
//         people = _.sortBy(people, function(person) {
//           return person.age;
//         });




// var iterator = 'length';
// console.log('abcdef'[iterator].apply(this));

  var array = [['a','b','c','d'], [1,2,3]]
  var sortedArrays = array.sort(function (a, b) {
    return b.length - a.length
  });

  var result = [];

for(var j = 0; sortedArrays.length; j ++){
  for(var i = 0; sortedArrays[0].length; i++){
     result.push([sortedArrays[j][i]])
  }
}

return result;


console.log('random string')

