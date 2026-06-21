// Sudoku Pattern Generator
// Generates a valid 9x9 Sudoku puzzle

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const matrix_number = (i: number, j: number): number => {
  return i < 3 ? (j < 3 ? 1 : j < 6 ? 2 : 3) : i < 6 ? (j < 3 ? 4 : j < 6 ? 5 : 6) : j < 3 ? 7 : j < 6 ? 8 : 9;
};

const make_array = (row: number, col: number): number[][] => {
  return Array.from(Array(row), () => new Array(col).fill(0));
};

const make_boolean_array = (row: number, col: number): boolean[][] => {
  return Array.from(Array(row), () => new Array(col).fill(false));
};

interface SudokuGeneratorContext {
  got_pattern: boolean;
}

export const generate_a_new_pattern = (): number[][] => {
  const context: SudokuGeneratorContext = { got_pattern: false };

  let SUDOKU = make_array(9, 9);
  let row = make_boolean_array(9, 10);
  let col = make_boolean_array(9, 10);
  let matrix = make_boolean_array(10, 10);

  const create_pattern = (
    x: number,
    y: number,
    SUDOKU: number[][],
    row: boolean[][],
    col: boolean[][],
    matrix: boolean[][]
  ): void => {
    let new_x = x;
    let new_y = y + 1;
    const mat_num = matrix_number(x, y);

    if (y === 8) {
      new_x++;
      new_y = 0;
    }

    const till_now = new Set<number>();

    while (till_now.size < 9 && !context.got_pattern) {
      let new_num = randomNumber(1, 9);

      if (till_now.has(new_num)) continue;
      till_now.add(new_num);

      if (!row[x][new_num] && !col[y][new_num] && !matrix[mat_num][new_num]) {
        row[x][new_num] = true;
        col[y][new_num] = true;
        matrix[mat_num][new_num] = true;

        SUDOKU[x][y] = new_num;

        if (x === 8 && y === 8) {
          context.got_pattern = true;
        } else {
          create_pattern(new_x, new_y, SUDOKU, row, col, matrix);
        }

        row[x][new_num] = false;
        col[y][new_num] = false;
        matrix[mat_num][new_num] = false;
      }
    }
  };

  create_pattern(0, 0, SUDOKU, row, col, matrix);

  return SUDOKU;
};
