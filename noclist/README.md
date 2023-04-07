TODO: Brainstorming:

- dockerize?
- potential errors
  - disconnect before connecting
  - disconnect while connecting
  - 400s / 500s etc
  - malformed data
  - unauthorized
  - 400, 401, 403, 404, 408, 500, 502, 504, 505, 507?, 508?
- python version?
- run linter again
- requests library using it without retry
# noclist
- [noclist](#noclist)
  - [Dev Environment](#dev-environment)
  - [Testing](#testing)
  - [Future Improvements](#future-improvements)
  - [noclist Documentation](#noclist-documentation)

For this more backend oriented assessment question I wanted to use python, since the CFPB uses plenty of Django. Taking a peek at your [Dockerfile](https://github.com/cfpb/consumerfinance.gov/blob/main/Dockerfile) from your main repo, it looks like you're using a `python:3.8-alpine` image which runs python version 3.8.16. So that's what I'll be using here.

TODO: brief description

TODO: coming from Typescript land, I decided to add the optional typing

TODO: gif of project

TODO: Please write the retry logic yourself rather than use a request library with built-in retry functionality. Requests library ok, just not retry?

TODO: no newline after stdout

TODO: should this thing be wrapped in an object?

## Dev Environment

## Testing

## Future Improvements
- add types to testing file

## noclist Documentation

[Link to Ad Hoc noclist documentation](https://homework.adhoc.team/noclist/)
