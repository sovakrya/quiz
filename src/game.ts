type Sign = {
  operator: "+" | "-" | "*" | "/" | "^^";
  leftNumber: number;
  rightNumber: number;
  priority: number;
};

export class Game {
  operators: Array<keyof typeof this.operatorsActions> = [
    "+",
    "-",
    "*",
    "/",
    "^^",
  ];
  difficulty = 4;
  example: Array<keyof typeof this.operatorsActions | number> = [];
  signs: Sign[] = [];

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

  countExample(example: Array<keyof typeof this.operatorsActions | number>) {
    let res = 0;
    const signs: Sign[] = [];

    for (let i = 0; i < example.length; i++) {
      if (i % 2 !== 0) {
        let priority = 0;
        if (example[i] === "*" || example[i] === "/") {
          priority = 1;
        } else if (example[i] === "^^") {
          priority = 2;
        }

        signs.push({
          operator: example[i] as keyof typeof this.operatorsActions,
          leftNumber: example[i - 1] as number,
          rightNumber: example[i + 1] as number,
          priority,
        });
      }
    }

    const sortSigns = signs.sort((a, b) => b.priority - a.priority);
    for(let sign of sortSigns){
      const leftNumber = sign.leftNumber
      const rightNumber = sign.rightNumber
      const operator = sign.operator
      console.log(leftNumber)
      console.log(operator)
      console.log(rightNumber)
      if(sortSigns.findIndex((a) => a === sign) === 0){
        res = this.operatorsActions[operator](leftNumber, rightNumber)
        continue
      }
      console.log(res)

      res = this.operatorsActions[operator](res, rightNumber)
      
    }

    return { example: example, result: res };
  }

  createExample() {
    const example: Array<keyof typeof this.operatorsActions | number> = [];
    for (let i = 0; i < this.difficulty * 2 - 1; i++) {
      if (i === 0) {
        const num = Math.round(Math.random() * 10);
        example.push(num);
        continue;
      }

      if (i % 2 === 0) {
        const num = Math.round(Math.random() * 10);
        example.push(num);
        continue;
      } else {

        const operatorIdx = Math.round(
          Math.random() * (this.operators.length - 1)
        );
        example.push(this.operators[operatorIdx]);
        continue;
      }
    }

    return example;
  }

  addOperator(operator: keyof typeof this.operatorsActions) {
    this.operators.push(operator);
    console.log(`added operator: ${operator}`);
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
  createExample: () => Array<("+" | "-" | "*" | "/" | "^^") | number>;
  countExample: (example: Array<("+" | "-" | "*" | "/" | "^^") | number>) => {
    example: Array<("+" | "-" | "*" | "/" | "^^") | number>;
    result: number;
  };
  addOperator: (operator: "+" | "-" | "*" | "/" | "^^") => void;
  setDifficulty: (complexity: number) => void;
}
