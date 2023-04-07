
TODO: brainstorming

- pains me not to use CSS, but it says not to make it pretty
- only one file for JS?
- it's going to be fun to do old JS
- important for me to use HTML validation to complete for accessibility
- allow submitting with unadded houshold members?
- capitalize relations and states when rendered?
- Can ages have decimals?
- assume backend validation
- display server errors
- video of project with screen reader
- tests on chrome, firefox, safari - latest stable versions

# hhbuilder

- [hhbuilder](#hhbuilder)
  - [Dev Environment](#dev-environment)
    - [Install homebrew (for optional nvm install)](#install-homebrew-for-optional-nvm-install)
    - [Install nvm (optional):](#install-nvm-optional)
    - [Install node dependencies](#install-node-dependencies)
  - [Testing](#testing)
  - [Potential Future Improvements](#potential-future-improvements)
  - [Original hhbuilder documentation from README.md](#original-hhbuilder-documentation-from-readmemd)

> "... a way to capture information about a household applying for health insurance coverage. Develop a UI for building a household up from individual people."

## Dev Environment

Other than node to run the cypress tests, everything is going to accessible in the browser. I mostly developed this while working in Chrome, but I did also test in Firefox and Safari as well. The node version I used was the latest LTS release (v18.15.0), but I'll go into detail about nvm as a node version manager below just in case.

For an optimal experience, you might consider switching to v18.15.0 of node. Here are instructions for mac/linux shell using nvm (n or other node managers are great too).

### Install [homebrew](https://brew.sh/) (for optional nvm install)
```*.sh-session
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
```

### Install [nvm](https://github.com/nvm-sh/nvm) (optional):
```*.sh-session
brew update 
brew install nvm
mkdir ~/.nvm
vim ~/.zshrc  # or ~/.bash_profile
```

Add the following to your shell profile:
```*.sh-session
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```
Reload your shell, or source your profile:
```*.sh-session
source ~/.zshrc  # or ~/.bash_profile
```

Install and use node v18.15.0:
```*.sh-session
nvm install v18.15.0
nvm use v18.15.0 
```

### Install node dependencies
Make sure your shell is located in the hhbuilder root directory.

Install node dependencies (from the hhbuilder directory):
```*.sh-session
npm install
```

Now you can jump into the [index.js](./index.js) whenever you're ready!

## Testing

The hard part is done now that you've got your node version and dependencies sorted. To run the cypress tests, just run:

```*.sh-session
npx cypress run
```

If you'd like a more interactive UI, try out:
```*.sh-session
npx cypress open
```

## Potential Future Improvements
// The following code is based on the restriction from the assessment challenge that the index.js
// file cannot be changed in any way while also following industry standard accessibility practices.
// Accessibility best practices are to use HTML's built-in form validation as much as possible in
// order to allow the widest range of screen readers to report input restrictions (see screen reader
// demo in the README)

- keep server the source of truth
- would be great to have a declarative framework
- I hate that I can't mess with the index.html at all, and I'm guessing messing with it with babel to import them as modules would be bad
- keep all code in index.js?
- can't change index.js, bad accessibility
  - add ids for JS
  - required and minimums
  - TODO: said put code HERE... which made me sad
  - TODO: most controversial: not a pure JS solution, they said I could change dom, all the screen readers
handle that stuff differently 
  - whole number ages?
  - it'd be great to add a unique ID for each of these users, but I'll leave that to the future backend
  - assume backend validation
  - index.js said put your code here, so I wasn't sure if I could use modules, which I might depending on the conventions where I worked
  - store
  -   // Would prefer to use FormData API for extensibility here if without restrictions, see README.md
  -       <script type="module" src="./index.js"></script>
  - code goes here

## Original hhbuilder documentation from README.md

[Link to hhbuilder documentation](https://homework.adhoc.team/hhbuilder/)