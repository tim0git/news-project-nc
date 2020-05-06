const {
  formatDates,
  makeRefObj,
  formatComments,
  renameKey,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("returns an array when passed one", () => {
    expect(formatDates([])).toEqual([]);
  });
  test("returns an array with formatted dates", () => {
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
        article_id: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: 1479818163389,
      },
    ];
    expect(formatDates(input)).toEqual(output);
  });
  test("checks that array has not mutated the original", () => {
    const control = [
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
        article_id: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    formatDates(input);
    expect(input).toEqual(control);
  });
  test("checks that the returned array is not the original", () => {
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const output = formatDates(input);
    expect(output).not.toBe(input);
  });
}); // done and pure

describe("makeRefObj", () => {
  test("returns an object when passed an array", () => {
    expect(makeRefObj([{}])).toEqual({});
  });
  test("returns a destructured object when keys and vlaue are entered", () => {
    const input = [{}];
    expect(
      makeRefObj([{ title: "nonesense", article_id: 1 }], "article_id", "title")
    ).toEqual({ 1: "nonesense" });
  });
  test("works for an array of objects", () => {
    const input = [
      { title: "lorem100", article_id: 1 },
      { title: "lorem80", article_id: 2 },
      { title: "lorem60", article_id: 3 },
      { title: "lorem40", article_id: 4 },
    ];
    const output = { 1: "lorem100", 2: "lorem80", 3: "lorem60", 4: "lorem40" };
    expect(makeRefObj(input, "article_id", "title")).toEqual(output);
  });
  test("return object does not share the same mem ref as original", () => {
    const input = [
      { title: "lorem100", article_id: 1 },
      { title: "lorem80", article_id: 2 },
      { title: "lorem60", article_id: 3 },
      { title: "lorem40", article_id: 4 },
    ];
    const output = { 1: "lorem100", 2: "lorem80", 3: "lorem60", 4: "lorem40" };
    const result = makeRefObj(input, "article_id", "title");
    expect(result).not.toBe(input);
  });
  test("check does not mutate original array", () => {
    const input = [
      { title: "lorem100", article_id: 1 },
      { title: "lorem80", article_id: 2 },
      { title: "lorem60", article_id: 3 },
      { title: "lorem40", article_id: 4 },
    ];
    const control = [
      { title: "lorem100", article_id: 1 },
      { title: "lorem80", article_id: 2 },
      { title: "lorem60", article_id: 3 },
      { title: "lorem40", article_id: 4 },
    ];
    makeRefObj(input, "article_id", "title");
    expect(input).toEqual(control);
  });
}); // done and pure

describe("formatComments", () => {
  test("returns an array", () => {
    expect(formatComments([])).toEqual([]);
  });
  test("updateds values when passed a key, value and refObj ", () => {
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const refObj = { "Living in the shadow of a great man": 1 };
    const keyToChange = "belongs_to";
    const keyToCreate = "comments_id";
    const result = [
      {
        author: "butter_bridge",
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        comment_votes: 14,
        comments_id: 1,
        created_at: new Date(1479818163389),
      },
    ];
    expect(formatComments(input, refObj, keyToChange, keyToCreate)).toEqual(
      result
    );
  });
  test("does not mutate the original array ", () => {
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const check = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const refObj = { "Living in the shadow of a great man": 1 };
    const keyToChange = "belongs_to";
    const keyToCreate = "comments_id";
    formatComments(input, refObj, keyToChange, keyToCreate);
    expect(input).toEqual(check);
  });
  test("array returned does not have the same memory ref as original ", () => {
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const check = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const refObj = { "Living in the shadow of a great man": 1 };
    const keyToChange = "belongs_to";
    const keyToCreate = "comments_id";
    const output = formatComments(input, refObj, keyToChange, keyToCreate);
    expect(input).not.toBe(output);
  });
}); // done and pure

describe("renameKey", () => {
  test("returns an array when passed one", () => {
    expect(renameKey([])).toEqual([]);
  });
  test("renames a key when passed array, keyToRename and newKey", () => {
    const list = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const output = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const keyToRename = "created_by";
    const newKey = "author";
    expect(renameKey(list, keyToRename, newKey)).toEqual(output);
  });
  test("does not mutate original array", () => {
    const list = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const check = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const keyToRename = "created_by";
    const newKey = "author";
    renameKey(list, keyToRename, newKey);
    expect(list).toEqual(check);
  });
  test("result array is not the same memory ref as the input", () => {
    const list = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const check = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const keyToRename = "created_by";
    const newKey = "author";
    const result = renameKey(list, keyToRename, newKey);
    expect(list).not.toBe(result);
  });
}); // done and pure
