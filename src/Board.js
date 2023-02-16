// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      let row = this.attributes[rowIndex];
      if (row.reduce((sum, cellValue) => sum + cellValue) > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let boardState = this.attributes;
      for (let rowIndex = 0; rowIndex < boardState['n']; rowIndex++) {
        if (this.hasRowConflictAt(rowIndex)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    //   var matrix = {
    //     0 : [0, 0, 0, 0],
    //     1 : [0, 1, 0, 0],
    //     2 : [0, 0, 1, 0],
    //     3 : [0, 0, 0, 0]
    //  };


    hasColConflictAt: function(colIndex) {
       // declare a sum variable
      // iterate over the object's keys
      // create a for loop
      // push the key's value at the index of the foor loop to the new array
      // use reduce to sum the elements in the array
      // if reduce returns more than 1 return true
      // else return false
      let sum = 0;
      for (let row = 0; row < this.attributes['n']; row++) {
        let cellValue = this.attributes[row][colIndex];
        sum += cellValue;
        if (sum > 1) {
          return true;
        }
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // get the number of columns from the object's 'n' property
      var numOfCol = this.attributes['n'];
      // create a for loop from 0 -> n
      for ( let col = 0; col < numOfCol; col++) {
      // call hasColConflictAt on current column index
      // [optionally in the same line] if that result is true, return true. (no else)
        if (this.hasColConflictAt(col)) {
          return true;
        }
      }

      // at the end, return false if true was never triggered
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    // //   var matrix = {
    //     0 : [0, 0, 0, 0],
    //     1 : [0, 1, 0, 0],
    //     2 : [0, 0, 1, 0],
    //     3 : [0, 0, 0, 0]
    //  };
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //  colIndex
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      var rowIndex = 0;
      //  while colIndex < 0
      while (colIndex < 0) {
        colIndex++;
        rowIndex++;
      }

      // create a sum variable, initialize to 0
      var sum = 0;
      // while col and row are < n
      while (colIndex < this.attributes.n && rowIndex < this.attributes.n) {

        //   get value at this row, this index, add to sum
        var value = this.attributes[rowIndex][colIndex];
        sum += value;

        if (sum > 1) {
          return true;
        }
        colIndex++;
        rowIndex++;
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // set column and row indices based on chess board's size n= 4
      // col -2, row always 0
      // for loop, icrement the col index up to n-2
      // call hasMajorDiagonalConflictAt passing in each index
      // if the call return true return true
      // else continue;

      // return false;

      for (let colIndex = -(this.attributes.n - 2); colIndex < -colIndex; colIndex++) {
        if (this.hasMajorDiagonalConflictAt(colIndex)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      var rowIndex = 0;
      //  while colIndex < 0
      while (colIndex >= this.attributes.n - 1) {
        colIndex--;
        rowIndex++;
      }

      // create a sum variable, initialize to 0
      var sum = 0;
      // while col and row are < n
      while (colIndex >= 0 && rowIndex < this.attributes.n) {
        //console.log('this in minor:', this);
        //   get value at this row, this index, add to sum
        var value = this.attributes[rowIndex][colIndex];
        sum += value;

        if (sum > 1) {
          return true;
        }
        colIndex--;
        rowIndex++;
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // var matrixWeCareAbout = [
      //   [0, 0, 1, 0],
      //   [0, 0, 0, 0],
      //   [1, 0, 0, 0],
      //   [0, 0, 0, 0]
      // ];
      // var stopWhen = '{"0":[0,0,1,0],"1":[0,0,0,0],"2":[1,0,0,0],"3":[0,0,0,0],"n":4}';

      // if (stopWhen === JSON.stringify(this.attributes)) {
      //  }
      console.log('yay we made it');
      for (let colIndex = 1; colIndex < ((2 * this.attributes.n) - 3); colIndex++) {
        if (this.hasMinorDiagonalConflictAt(colIndex)) {
          console.log('colIndex:', colIndex);
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
