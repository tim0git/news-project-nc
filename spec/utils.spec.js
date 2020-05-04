const {
  formatDates,
  makeRefObj,
  formatComments,
  formatSeedData,
} = require("../db/utils/utils");

const moment = require("moment");

describe("formatDates", () => {
  test("returns an array when passed one", () => {
    expect(formatDates([])).toEqual([]);
  });
  test("returns an array when passed one", () => {
    const output = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    expect(formatDates(input)).toEqual(output);
  });
});

describe("rename ref obj keys", () => {
  test("formats seed data", () => {
    const output = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    expect(formatSeedData(input)).toEqual(output);
  });
});
