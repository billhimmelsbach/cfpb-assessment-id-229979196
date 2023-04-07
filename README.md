# CFPB Assessment
## Assessment ID: 229979196
- [CFPB Assessment](#cfpb-assessment)
  - [Assessment ID: 229979196](#assessment-id-229979196)
  - [Dev Environment Setup](#dev-environment-setup)
  - [Testing](#testing)
  - [Potential Future Improvements](#potential-future-improvements)

Two projects for a CFPB skills assessment due April 7, 2023 at 12pm Eastern.

1. [hhbuilder](./hhbuilder/README.md) (JS/HTML) - capture and display a household's individual members using a simple web form

2. [noclist](./noclist/README.md) (Python) - create a CLI program that can pull a VIP user list from an unreliable API and print the results to stdout

I've chosen to use JavaScript and Python to match the tech stack of the CFPB, and they just happen to be two of my favorites!

## Dev Environment Setup

To keep things separate and simple, I've kept the two projects split from each other for their dependencies and setup. Here are links to their separate readmes. Please just ensure that you're running the console commands from the root of their respective directiories.

- [hhbuilder dev environment](./hhbuilder/README.md#dev-environment)
- [noclist dev environment](./noclist/README.md#dev-environment)

## Testing

To continue the theme of JavaScript, Python, and the CFPB: I've chosen to use Cypress and Pytest (Thanks for the confirmation of allowing testing libraries over email). The testing instructions are similarly separated into their respective assessments, and please run the commands from the roots of their respective directories.

- [hhbuilder testing setup](./hhbuilder/README.md#dev-environment)
- [noclist testing setup](./noclist/README.md#dev-environment)

## Potential Future Improvements

- The restrictions placed on the assessments sometimes forced me into knots to get to the best practices (particularly hhbuilder).  I'd definitely revisit and clarify those restrictions if I had more time.
- More tests, and more fixtures to make them easier!
- I prefer to use slightly longer, but very explicit variable names. Sometimes this felt like overkill though for the simpler parts of the assessment.
- I might revisit my decision not to architect my code around classes. While I like how easy these small individual functions are to test, particularly in a time crunch, it might have improved code readability.
- I told myself I was going to dockerize everything for an easy dev environment set up, but I didn't quite get there.
- Assessment specific notes are in the individual readmes:
  - [hhbuilder future improvements](./hhbuilder/README.md#potential-future-improvements)
  - [noclist future improvements](./noclist/README.md#potential-future-improvements)

I definitely had fun working on these projects yesterday (particularly the cypress work), and I hope to hear more from the CFPB soon.

- Assessment ID: 229979196