# Utility Functions

You should employ full TDD as you build these functions.

If you need extra guidance refer back to your schema in the migrations files and look at how the data provided differs from the structure set out in the schema.

---

## formatDate

This utility function should be able to take an array (`list`) of objects and return a new array. Each item in the new array must have its timestamp converted into a Javascript date object. Everything else in each item must be maintained.

_hint: Think carefully about how you can test that this has worked - it's not by copying and pasting a sql timestamp from the terminal into your test_
input:
{
  body:
    'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
  belongs_to: 'Living in the shadow of a great man',
  created_by: 'butter_bridge',
  votes: 14,
  created_at: 1479818163389,
}
output:
{
  body:
    'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
  belongs_to: 'Living in the shadow of a great man',
  created_by: 'butter_bridge',
  votes: 14,
  created_at: 1479818163389,
}

---

## makeRefObj

This utility function should be able to take an array (`list`) of objects and return a reference object. The reference object must be keyed by each item's title, with the values being each item's corresponding id. e.g.

`[{ article_id: 1, title: 'A' }]`

will become

`{ A: 1 }`

---

## formatComments

This utility function should be able to take an array of comment objects (`comments`) and a reference object, and return a new array of formatted comments.

Each formatted comment must have:

- Its `created_by` property renamed to an `author` key
- Its `belongs_to` property renamed to an `article_id` key
- The value of the new `article_id` key must be the id corresponding to the original title value provided
- Its `created_at` value converted into a javascript date object
- The rest of the comment's properties must be maintained
