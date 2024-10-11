export class Game {
  operators: Array<keyof typeof this.operatorsActions> = ["+", "-"];
  difficulty = 2;

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

  createExample() {
    let res = 0;
    const exemple: Array<keyof typeof this.operatorsActions | number> = [];

    for (let i = 0; i <= this.difficulty; i++) {
      if (i === 0) {
        res = Math.round(Math.random() * 100);
        exemple.push(res);
        continue;
      }

      if (i % 2 === 0) {
        exemple.push(Math.round(Math.random() * 100));
        const key = exemple[i - 1];
        if (typeof key === "string") {
          res = this.operatorsActions[key](res, exemple[i] as number);
          continue;
        }
        
      } else {
        const operatorIdx = Math.round(
          Math.random() * this.operators.length - 1
        );
        exemple.push(this.operators[operatorIdx]);
        continue;
      }
    }

    return { exemple: exemple, result: res };
  }

  addOperator(operator: keyof typeof this.operatorsActions) {
    this.operators.push(operator);
  }

  setDifficulty(complexity: number) {
    if (complexity < 2) {
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
  createExample: () => {
    exemple: (number | "+" | "-" | "*" | "/" | "^^")[];
    result: number;
  };
  addOperator: (operator: "+" | "-" | "*" | "/" | "^^") => void;
  setDifficulty: (complexity: number) => void;
}
