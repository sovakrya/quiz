export class Game {
  operators: Array<keyof typeof this.operatorsActions> = ["+", "-"];
  difficulty = 2;
  signs: Array<keyof typeof this.operatorsActions> = [];
  nums: number[] = [];

  operatorsActions = {
    "+": (a: number, b: number) => {
      return a + b;
    },

    "-": (a: number, b: number) => {
      return a - b;
    },

    "*": (a: number, b: number) => {
      return a * b;
    },

    "/": (a: number, b: number) => {
      return a / b;
    },

    "^^": (a: number, b: number) => {
      return Math.pow(a, b);
    },
  } as const;

  countExample() {
    let res = 0;
    const example: Array<keyof typeof this.operatorActions | number> = [];

    for (let i = 0; i <= this.difficulty; i++) {
      if (i === 0) {
        res = this.nums[i];
        example.push(res);
        continue;
      }

      if (i % 2 !== 0) {
        const signIdx = this.signs.findIndex(
          (val) => val === "*" || "/" || "^^"
        );

        if (signIdx >= 0) {
          example.push(this.signs[signIdx]);
          const key = this.signs[signIdx];
          res = this.operatorsActions[key](res, this.nums[i]);
          this.signs.splice(signIdx, 1);
          continue;
        } else {
          const idx = this.signs.findIndex((val) => val === "-" || "+");
          if (idx >= 0) {
            example.push(this.signs[idx]);
            const key = this.signs[signIdx];
            res = this.operatorsActions[key](res, this.nums[i]);
            this.signs.splice(idx, 1);
            continue;
          }
        }
      } else {
        example.push(this.nums[i - 1]);
        continue;
      }
    }

    return { example: example, result: res };
  }

  createExample() {
    for (let i = 0; i <= this.difficulty; i++) {
      if (i === 0) {
        this.nums.push(Math.round(Math.random() * 100));
        continue;
      }

      if (i % 2 === 0) {
        this.nums.push(Math.round(Math.random() * 100));
        continue;
      } else {
        let operatorIdx = Math.round(Math.random() * this.operators.length - 1);
        if (operatorIdx < 0) {
          operatorIdx = Math.round(Math.random() * this.operators.length - 1);
        }
        this.signs.push(this.operators[operatorIdx]);
        continue;
      }
    }
  }

  addOperator(operator: keyof typeof this.operatorsActions) {
    this.operators.push(operator);
  }

  setDifficulty(complexity: number) {
    if (complexity < 2) {
      return;
    }

    if (complexity > 10) {
      return;
    }
    this.difficulty = complexity;
  }
}

type Actions = {
  "+": (a: number, b: number) => number;
  "-": (a: number, b: number) => number;
  "*": (a: number, b: number) => number;
  "/": (a: number, b: number) => number;
  "^^": (a: number, b: number) => number;
};

export interface Game {
  operatorActions: Actions;
  operators: ("+" | "-" | "*" | "/" | "^^")[];
  createExample: () => void;
  countExample: () => {
    example: Array<("+" | "-" | "*" | "/" | "^^") | number>;
    result: number;
  };
  addOperator: (operator: "+" | "-" | "*" | "/" | "^^") => void;
  setDifficulty: (complexity: number) => void;
}
