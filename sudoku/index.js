const sudokus = [
    [
        [ 1, 6, 2, 8, 5, 7, 4, 9, 3 ],
        [ 5, 3, 4, 1, 2, 9, 6 ,7, 8 ],
        [ 7, 8, 9, 6, 4, 3, 5, 2, 1 ],
    
        [ 4, 7, 5, 3, 1, 2, 9, 8, 6 ],
        [ 9, 1, 3, 5, 8, 6, 7, 4, 2 ],
        [ 6, 2, 8, 7, 9, 4, 1, 3, 5 ],
    
        [ 3, 5, 6, 4, 7, 8, 2, 1, 9 ],
        [ 2, 4, 1, 9, 3, 5, 8, 6, 7 ],
        [ 8, 9, 7, 2, 6, 1, 3 ,5 ,4 ]
    ],
    [
        [ 1, 6, 2, 8, 5, 7, 4, 9, 3 ],
        [ 5, 3, 4, 1, 2, 9, 6 ,7, 8 ],
        [ 7, 8, 3, 6, 4, 3, 5, 2, 1 ],
    
        [ 4, 7, 5, 3, 1, 2, 9, 8, 6 ],
        [ 9, 1, 3, 5, 8, 6, 7, 4, 2 ],
        [ 6, 2, 8, 7, 9, 4, 1, 3, 5 ],
    
        [ 3, 5, 6, 4, 7, 8, 2, 1, 9 ],
        [ 2, 4, 1, 9, 3, 5, 8, 6, 7 ],
        [ 8, 9, 7, 2, 6, 1, 3 ,5 ,4 ]
    ],
    [
        [ 1, 6, 2, 8, 5, 7, 4, 9, 3 ],
        [ 5, 3, 4, 1, 2, 9, 6 ,7, 8 ],
        [ 7, 8, 9, 6, 4, 3, 5, 2, 1 ],
    
        [ 4, 7, 5, 3, 1, 2, 9, 2, 6 ],
        [ 9, 1, 3, 5, 8, 6, 7, 4, 2 ],
        [ 6, 2, 8, 7, 9, 4, 1, 3, 5 ],
    
        [ 3, 5, 6, 4, 7, 8, 2, 1, 9 ],
        [ 2, 4, 1, 9, 3, 5, 8, 6, 7 ],
        [ 8, 9, 7, 2, 6, 1, 3 ,5 ,4 ]
    ],
    [
        [ 1, 6, 2, 8, 5, 7, 4, 9, 3 ],
        [ 5, 3, 4, 1, 2, 9, 6 ,7, 8 ],
        [ 7, 8, 9, 6, 4, 3, 5, 2, 1 ],
    
        [ 4, 7, 5, 3, 1, 2, 9, 8, 6 ],
        [ 9, 1, 3, 5, 8, 6, 7, 4, 2 ],
        [ 6, 2, 8, 7, 9, 4, 1, 3, 5 ],
    
        [ 3, 5, 6, 4, 7, 8, 2, 1, 9 ],
        [ 2, 4, 1, 9, 3, 5, 8, 6, 7 ],
        [ 8, 9, 7, 2, 6, 1, 3 ,2 ,4 ]
    ],
    [
        [ 1, 6, 2, 8, 5, 7, 4, 9, 3 ],
        [ 5, 3, 4, 1, 2, 9, 6 ,7, 8 ],
        [ 7, 8, 9, 6, 4, 3, 5, 2, 1 ],
    
        [ 4, 7, 5, 3, 1, 2, 9, 8, 6 ],
        [ 9, 1, 3, 5, 8, 6, 7, 4, 2 ],
        [ 6, 2, 8, 7, 9, 4, 1, 3, 5 ],
    
        [ 3, 5, 6, 4, 7, 8, 2, 1, 9 ],
        [ 2, 4, 1, 9, 3, 5, 8, 6, 7 ]
    ],
    [
        [ 1, 6, 2, 8, 5, 7, 4, 9 ],
        [ 5, 3, 4, 1, 2, 9, 6 ,7, 8 ],
        [ 7, 8, 9, 6, 4, 3, 5, 2, 1 ],
    
        [ 4, 7, 5, 3, 1, 2, 9, 8, 6 ],
        [ 9, 1, 3, 5, 8, 6, 7, 4, 2 ],
        [ 6, 2, 8, 7, 9, 4, 1, 3, 5 ],
    
        [ 3, 5, 6, 4, 7, 8, 2, 1, 9 ],
        [ 2, 4, 1, 9, 3, 5, 8, 6, 7 ],
        [ 8, 9, 7, 2, 6, 1, 3 ,2 ,4 ]
    ],
]

  
function checkSudoku (sudoku) {
    // pre
    const isArrayOfArray = Array.isArray(sudoku) && Array.isArray(sudoku[0]);
    console.assert(isArrayOfArray, 'sudoku must be an array of array');
    if (!isArrayOfArray) return false;

    const isValidSize = sudoku.length === 9 && sudoku[0].length === 9;
    console.assert(isValidSize, 'sudoku dimensions seems not valid');
    if (!isValidSize) return false;

    // Test every row
    const allRowsAreValid = sudoku.every(line => isNineUniqueDigits(line));
    console.assert(allRowsAreValid, 'At least one row is not valid');
    if (!allRowsAreValid) return false;

    // Test every column
    let columnIndex = 0;
    let allColumsAreValid = true;
    while (columnIndex < 9 && allColumsAreValid) {
        const columnDigits = Array.from({ length: 9 })
                                  .map((_, rowIndex) => sudoku[rowIndex][columnIndex]);

        if (!isNineUniqueDigits(columnDigits)) allColumsAreValid = false;
        console.assert(allColumsAreValid, 'This column is not valid', columnIndex);

        columnIndex++;
    }
    if (!allColumsAreValid) return false;

    // Test every square
    let rowIndex = 0;
    let allSquaresAreValid = true;
    while (rowIndex < 7 && allSquaresAreValid) {
        columnIndex = 0;
        while (columnIndex < 7 && allSquaresAreValid) {
            const squareDigits = [
                ...sudoku[rowIndex].slice(columnIndex, columnIndex + 3),
                ...sudoku[rowIndex + 1].slice(columnIndex, columnIndex + 3),
                ...sudoku[rowIndex + 2].slice(columnIndex, columnIndex + 3),
            ];

            if (!isNineUniqueDigits(squareDigits)) allSquaresAreValid = false;
            console.assert(allSquaresAreValid, 'This square is not valid', rowIndex, columnIndex);

            columnIndex += 3;
        }
        rowIndex += 3;
    }
    if (!allSquaresAreValid) return false;

    return true;
}

function isNineUniqueDigits(digits) {
    if (digits.length !== 9) return false;

    const digitsSeen = Array(9).fill(false);
    digits.forEach(digit => digitsSeen[digit - 1] = true);

    return digitsSeen.every(isSeen => isSeen);
}
  
  
// main
sudokus.forEach((sudoku, index) => {
    console.log(`>>> Is sudoku #${index + 1} succeeded ?`, checkSudoku(sudoku))
})
  
  