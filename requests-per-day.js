"use strict";
var fs = require("fs/promises");

module.exports = { requestsPerDay };

(async function () {
  console.log(await requestsPerDay("./wicit.log"));
})();

async function requestsPerDay(path) {
  var logFile = await readFile(path);

  var occurencesOfDate = logFile.split("\n").reduce(countDay, {});

  return occurencesOfDate;
}

/**
 *
 * @param {*} path
 * @returns
 */
async function readFile(path) {
  try {
    var logLines = await fs.readFile(path, "utf-8");

    return logLines;
  } catch (err) {
    throw err;
  }
}

function countDay(occurencesOfDate, currentValue) {
  // at a minimum remove lines that can't possibly have a date
  if (currentValue.length < 9) return occurencesOfDate;

  // docker log dates are yyyy-mm-dd
  var currentDateSelection = currentValue.slice(0, 10);

  if (!occurencesOfDate[currentDateSelection]) {
    occurencesOfDate[currentDateSelection] = 1;
  } else {
    occurencesOfDate[currentDateSelection]++;
  }

  return occurencesOfDate;
}
