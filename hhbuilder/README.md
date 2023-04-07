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
- The most controversial decision I think I made was to lean into the form validation API instead of a pure JS solution. I was pretty shocked that the instructions for the assessment made a point of following accessibility guidelines, while also saying you were not allowed to touch the index.html. This kind of validation should be on the HTML for the widest support of screenreaders.
- It pained me not to improve the CSS, but the instructions said not to worry.
- The index.js said "your code here", so I was reluctant to make ES modules in separate files.
- I tried to keep the server the source of truth, but I think I could have done things a little more declaratively
- If I could modify the index.html, I would have used FormData to make things more extensible.

## Original hhbuilder documentation from README.md

[Link to hhbuilder documentation](https://homework.adhoc.team/hhbuilder/)