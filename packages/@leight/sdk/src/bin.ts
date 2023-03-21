#!/usr/bin/env node
import boxen from "boxen";
import chalk from "chalk";

console.log(boxen(
        chalk.yellowBright.bold("Leight SDK"),
        {
            padding:         2,
            margin:          2,
            borderStyle:     "round",
            borderColor:     "green",
            backgroundColor: "#313030"
        }
    )
);
