export class Game {
  gameStorage = window.localStorage;
  operators: ("+" | "-" | "*" | "/" | "**")[] = ["+", "-"];
  difficulty: number;
  currentTask: number;
  date: null | string;
  timer: number;
  example: ("+" | "-" | "*" | "/" | "**" | number)[];

  constructor() {
    const storageDifficulty = this.gameStorage.getItem("difficulty");
    const storageCurrentTask = this.gameStorage.getItem("currentTask");
    const storageDate = this.gameStorage.getItem("date");
    const storageTimer = this.gameStorage.getItem("time");
    const storageExample = this.gameStorage.getItem("example");
    const storageOperators = this.gameStorage.getItem("operators");

    if (storageDifficulty) {
      try {
        this.difficulty = JSON.parse(storageDifficulty);
      } catch {
        this.difficulty = 2;
      }
    } else {
      this.difficulty = 2;
    }

    if (storageCurrentTask) {
      try {
        this.currentTask = JSON.parse(storageCurrentTask);
      } catch {
        this.currentTask = 0;
      }
    } else {
      this.currentTask = 0;
    }

    if (storageDate) {
      try {
        this.date = JSON.parse(storageDate);
      } catch {
        this.date = null;
      }
    } else {
      this.date = null;
    }

    if (storageTimer) {
      try {
        this.timer = JSON.parse(storageTimer);
      } catch {
        this.timer = 3600000;
      }
    } else {
      this.timer = 3600000;
    }

    if (storageExample) {
      try {
        this.example = JSON.parse(storageExample);
      } catch {
        this.example = this.createExample();
      }
    } else {
      this.example = this.createExample();
    }

    if (storageOperators) {
      try {
        this.operators.push(JSON.parse(storageOperators));
      } catch {
        this.operators = ["+", "-"];
      }
    } else {
      this.operators = ["+", "-"];
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

    this.gameStorage.setItem("example", JSON.stringify(example));
    console.log(example);
    return example;
  }

  incrementCurrentTask() {
    this.gameStorage.setItem(
      "currentTask",
      JSON.stringify(this.currentTask + 1)
    );
    this.currentTask += 1;
  }

  addOperator(operator: "+" | "-" | "*" | "/" | "**") {
    if (this.operators.includes(operator)) {
      return;
    }
    this.operators.push(operator);
    this.gameStorage.setItem("operators", JSON.stringify(operator));
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
    this.date = new Date().toLocaleDateString("es-CL");
    this.gameStorage.setItem(
      "date",
      JSON.stringify(new Date().toLocaleDateString("es-CL"))
    );
  }

  saveTimer(time: number) {
    this.timer = time;
    this.gameStorage.setItem("time", JSON.stringify(this.timer));
  }

  restartGame() {
    this.operators = ["+", "-"];
    this.difficulty = 2;
    this.currentTask = 0;
    this.timer = 3600000;
    this.gameStorage.setItem("operators", JSON.stringify(this.operators));
    this.gameStorage.setItem("difficulty", JSON.stringify(this.difficulty));
    this.gameStorage.setItem("currentTask", JSON.stringify(this.currentTask));
    this.gameStorage.setItem("time", JSON.stringify(this.timer));
  }
}

export interface Game {
  operators: ("+" | "-" | "*" | "/" | "**")[];
  createExample: () => Array<"+" | "-" | "*" | "/" | "**" | number>;
  countExample: (
    example: Array<"+" | "-" | "*" | "/" | "**" | number>
  ) => number;
  addOperator: (operator: "+" | "-" | "*" | "/" | "**") => void;
  setDifficulty: (complexity: number) => void;
}
