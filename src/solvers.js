/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// window.addPiece = function(partialMatrix, conflictsArray, n) {

//   //     get how many rows in partial Matrix
//   var numOfRows = partialMatrix.length;
//   //     if #rows = n
//   console.log(solutions);
//   if (numOfRows = n) {
//     solutions.push(partialMatrix);
//     return;
//   }
//   //     fill with zeros
//   var newRow = [0, 0, 0, 0];
//   //     iterate through 0 - n-1
//   for ( let i = 0; i < n; i++) {
//   //         if (column i is not contained in conflicts array)
//   //             newRow[i] = 1;
//     if (!conflictsArray.includes(i)) {
//       newRow[i] = 1;
//       conflictsArray.push(i);


//       newPM = newRow + partialMatrix;
//       addPiece(newPM, conflictsArray, n);
//       newRow[i] = 0;
//       conflictsArray.pop();
//     }
//   }
// };

window.findNRooksSolution = function(n) {
  let solutions = [];
  var addPiece = function(partialMatrix, conflictsArray, n) {

    //     get how many rows in partial Matrix
    var numOfRows = partialMatrix.length;
    //     if #rows = n
    if (numOfRows === n) {
      solutions.push(partialMatrix);

      return;
    }
    //     fill with zeros
    var newRow = new Array(n).fill(0);
    //     iterate through 0 - n-1

    for ( let i = 0; i < n; i++) {
    //         if (column i is not contained in conflicts array)
    //             newRow[i] = 1;

      if (!conflictsArray.includes(i)) {
        newRow[i] = 1;
        conflictsArray.push(i);
        let newPM = partialMatrix.slice();
        newPM.push(newRow.slice());
        addPiece(newPM, conflictsArray, n);
        // partialMatrix.pop();
        newRow[i] = 0;
        conflictsArray.pop();
      }
    }
  };

  addPiece([], [], n);
  var solution = solutions[0];
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // console.log('n', n);
  // console.log(solutions.length);
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // MS: return a count of all possible solutions,

  var factorial = function (n) {
    return n === 0 ? 1 : n * (factorial(n - 1));
  };
  var memoFactorial = _.memoize(factorial);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return memoFactorial(n);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let solutions = [];
  if (n === 2) {
    return [[0, 0], [0, 0]];
  }
  if (n === 3) {
    return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  }
  // *add the major and minor diag. conflicts array paramters
  var addPiece = function(partialMatrix, conflictsArray, majorDConflict, minorDConflict, n) {

    //     get how many rows in partial Matrix
    var numOfRows = partialMatrix.length;
    //     if #rows = n
    if (numOfRows === n) {
      solutions.push(partialMatrix);
      return;
    }
    //     fill with zeros
    var newRow = new Array(n).fill(0);
    //     iterate through 0 - n-1

    var unAcceptableCols = [];
    // add current row to majorDConflict -> push to unAcceptableCols
    majorDConflict.forEach(function(col) {
      unAcceptableCols.push(col + numOfRows);
    });
    // do the same thing for minorDConflict -> push to unAcceptableCols
    minorDConflict.forEach(function(col) {
      unAcceptableCols.push(col - numOfRows);
    });
    // push all conflictsArray cols to  unAcceptableCols
    unAcceptableCols = unAcceptableCols.concat(conflictsArray);

    for ( let i = 0; i < n; i++) {
    //         if (column i is not contained in conflicts array)
    //             newRow[i] = 1;
      // * add Major and Minor conflicts arrays
      // unAcceptableCols = []
      if (!unAcceptableCols.includes(i)) {
        newRow[i] = 1;
        conflictsArray.push(i);
        majorDConflict.push(i - numOfRows);
        minorDConflict.push(i + numOfRows);
        // * push to the major and minor arrays, conflicts.
        let newPM = partialMatrix.slice();
        newPM.push(newRow.slice());
        // * add major and minor arrays as paramters
        addPiece(newPM, conflictsArray, majorDConflict, minorDConflict, n);
        newRow[i] = 0;
        conflictsArray.pop();
        majorDConflict.pop();
        minorDConflict.pop();
      }
    }
  };
// debugger;
  addPiece([], [], [], [], n);
  var solution = solutions[0];
  // console.log('n', n);
  // console.log('solutions, list', solutions);
  console.log('number of solutions for n ===', n, ' ', solutions.length);
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
