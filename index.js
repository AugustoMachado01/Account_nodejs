// modulos externos
import inquirer from "inquirer";
import chalk from "chalk";
// modulos internos

// const fs = require("fs");
import fs from "fs";

function operation() {
  inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "o que voce deseja fazer",
      choices: [
        "Criar conta",
        "Conasultar saldo",
        "Depositar",
        "Sacar",
        "Sair",
      ],
    },
  ]);
}
