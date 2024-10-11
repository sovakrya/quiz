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
    const exampal: Array<keyof typeof this.operatorsActions | number | "="> =
      [];

    for (let i = 1; i <= this.difficulty; i++) {
      if (i === 1) {
        res = Math.round(Math.random() * 100);
        exampal.push(res);
      }

      if (i % 2 !== 0) {
        exampal.push(Math.round(Math.random() * 100));
        const key = exampal[i - 1];
        if (typeof key === "string" && key !== "=") {
          res = this.operatorsActions[key](res, exampal[i] as number);
        }
      } else {
        const operatorIdx = Math.round(
          Math.random() * this.operators.length - 1
        );
        exampal.push(this.operators[operatorIdx]);
      }
    }

    exampal.push("=");
    exampal.push(res);

    return exampal;
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
  createExample: () => (number | "+" | "-" | "*" | "/" | "^^" | "=")[];
  addOperator: (operator: "+" | "-" | "*" | "/" | "^^") => void;
  setDifficulty: (complexity: number) => void;
}

declare global {
    interface Window {
      game: Game
    }
  }

window.game = new Game()


