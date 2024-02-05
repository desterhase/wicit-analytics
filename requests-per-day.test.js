var { requestsPerDay } = require("./requests-per-day.js");

var path = require("path");

test("it behaives", async () => {
  var testFilePath = path.resolve("./test-data.log");
  var output = {
    "2021-09-29": 2,
    "2021-09-28": 2,
  };
  expect(await requestsPerDay(testFilePath)).toEqual(output);
});
