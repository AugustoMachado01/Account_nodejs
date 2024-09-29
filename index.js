// modulos externos
import inquirer from "inquirer";
import chalk from "chalk";
// modulos internos

// const fs = require("fs");
import fs from "fs";

operation();

function operation() {
  inquirer
    .prompt([
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
    ])
    .then((ansewer) => {
      const action = ansewer["action"];

      if (action === "Criar conta") {
        createAccount();
      } else if (action === "Consultar saldo") {
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
      } else {
        console.log(chalk.bgBlue.black("Obrigado por usar accounts!"));
        process.exit();
      }
    })
    .catch((err) => console.log());
}

// create account
function createAccount() {
  console.log(chalk.bgGreen.black("Parabens por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opcoes da sua conta a seguir"));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      { name: "accountName", message: "Digite um nome para a sua conta:" },
    ])
    .then((ansewer) => {
      const accountName = ansewer["accountName"];
      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta ja existe. escolha outro nome!")
        );
        return buildAccount();
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        "{balance: 0}",
        function (err) {
          console.log(err);
        }
      );
      console.log(chalk.green("parabens a sua conta foi criada!"));
      operation();
    })
    .catch((err) => console.log(err));
}

// add an amount to user accont
function deposit() {
  inquirer
    .prompt([
      {
        name: "AccountName",
        message: "qual o nome da sua conta",
      },
    ])
    .then((ansewer) => {
      const accountName = ansewer["AccountName"];

      //verify if account exists
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Qual e o valor que voce desejar depositar",
          },
        ])
        .then((ansewer) => {
          const amount = ansewer["amount"];

          //  add on amount
          addAmount(accountName, amount);

          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("Esta conta nao existe, escolha outro nome!")
    );
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu un erro, tente novamente mas tarde!")
    );
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi depositado o valor de R${amount} na sua conta!`)
  );
  // return operation();
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}
