export class Game {
  gameStorage = window.localStorage;
  operators: string[];
  difficulty;
  currentTask;
  date;

  constructor() {
    const storageOperators = this.gameStorage.getItem("operators");
    const storageDifficulty = this.gameStorage.getItem("difficulty");
    const storageCurrentTask = this.gameStorage.getItem("currentTask");
    const storageDate = this.gameStorage.getItem("currentDate");
    if (storageOperators) {
      this.operators = JSON.parse(storageOperators);
    } else {
      this.operators = ["+", "-"];
    }

    if (storageDifficulty) {
      this.difficulty = JSON.parse(storageDifficulty);
    } else {
      this.difficulty = 2;
    }

    if (storageCurrentTask) {
      this.currentTask = JSON.parse(storageCurrentTask);
    } else {
      this.currentTask = 0;
    }

    if (storageDate) {
      this.date = JSON.parse(storageDate);
    } else {
      this.date = null;
    }
  }

  countExample(example: Array<"+" | "-" | "*" | "/" | "**" | number>) {
    const res = Number(eval(example.join("")));
    return res;
  }

  createExample() {
    const example: Array<"+" | "-" | "*" | "/" | "**" | number> = [];
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

        example.push(
          this.operators[operatorIdx] as "+" | "-" | "*" | "/" | "**"
        );

        continue;
      }
    }

    this.gameStorage.setItem("currentTask", JSON.stringify(this.currentTask + 1));
    this.currentTask += 1;

    return example;
  }

  addOperator(operator: "+" | "-" | "*" | "/" | "**") {
    this.operators.push(operator);
    this.gameStorage.setItem("operators", operator);
    alert(`added operator: ${operator}`);
  }

  setDifficulty(complexity: number) {
    if (complexity < 2) {
      return;
    }

    if (complexity > 10) {
      return;
    }
    this.difficulty = complexity;
    this.gameStorage.setItem("difficulty", JSON.stringify(this.difficulty));
  }

  saveDate() {
    this.gameStorage.setItem("currentDate", JSON.stringify(new Date()));
  }
}

export interface Game {
  operators: string[];
  createExample: () => Array<"+" | "-" | "*" | "/" | "**" | number>;
  countExample: (
    example: Array<"+" | "-" | "*" | "/" | "**" | number>
  ) => number;
  addOperator: (operator: "+" | "-" | "*" | "/" | "**") => void;
  setDifficulty: (complexity: number) => void;
}
