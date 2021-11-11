const inquirer = require("inquirer");
const chalk = require("chalk");
const info = chalk.bold.white;

const askMove = [
  {
    type: "input",
    name: "move",
    message: "Input: ",
    validate: function (value) {
      const validMoves = ["1", "2", "3", "4"];
      if (value === "help") {
        return (
          "\n 1 => left" + "\n 2 => right" + "\n 3 => up" + "\n 4 => down"
        );
      } else 
      {
        if (validMoves.includes(value)) {
          return true;
        }
      }
    },
  },
];

exports.move = () => {
  return inquirer.prompt(askMove).then((answers) => 
  {
    return answers["move"];
  });
};
