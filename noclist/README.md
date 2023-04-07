# noclist
- [noclist](#noclist)
  - [Dev Environment](#dev-environment)
    - [Install homebrew (for optional pyenv install)](#install-homebrew-for-optional-pyenv-install)
      - [Install pyenv](#install-pyenv)
    - [Install Python 3.8.16](#install-python-3816)
    - [Install Pipenv](#install-pipenv)
    - [Install Docker](#install-docker)
    - [Run the script](#run-the-script)
  - [Testing](#testing)
  - [Potential Future Improvements](#potential-future-improvements)
  - [noclist Documentation](#noclist-documentation)

> "The Bureau of Adversarial Dossiers and Securely Encrypted Code (BADSEC) has asked you to retrieve a list of VIP users. Fortunately, BADSEC provides an API to the agency you've been working with. Unfortunately, it's not the best API in the world..."

For this more backend oriented assessment question I wanted to use python, since the CFPB uses plenty of Django. Taking a peek at your [Dockerfile](https://github.com/cfpb/consumerfinance.gov/blob/main/Dockerfile) from your main repo, it looks like you're using a `python:3.8-alpine` image which runs python version 3.8.16, so that's the version I'll go with to hopefully make things easier.

## Dev Environment
We're targeting 3.8.16 for the python version, so I'll add some optional instructions below to use pyenv to get that version (other version managers are great too!). I also used pipenv for my virtual environments (others are also still great!).

### Install [homebrew](https://brew.sh/) (for optional pyenv install)
```*.sh-session
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
```

#### Install [pyenv](https://formulae.brew.sh/formula/pyenv)
```*.sh-session
brew update 
brew install pyenv
```

Add the following to your shell profile:
```*.sh-session
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi

```
Reload your shell, or source your profile:
```*.sh-session
source ~/.zshrc  # or ~/.bash_profile
```

### Install Python 3.8.16
Install python 3.8.16:
```*.sh-session
pyenv install 3.8.16
```

Set pyenv version as default:
```*.sh-session
pyenv global 3.8.16
```

Check to see if your version is 3.8.16
```*.sh-session
python --version
```

### Install [Pipenv](https://pipenv.pypa.io/en/latest/)
Install pipenv with homebrew:
```*.sh-session
brew install pipenv
```

Time to install the dependencies! Make sure you run this command from the root of the noclist folder:
```*.sh-session
pipenv sync --python 3.8.16
```

One last pythong step! To make sure that your virtual environment is completely ready, run this install command:
```*.sh-session
pipenv install requests responses pytest mypy requests-mock
```

### Install [Docker](https://www.docker.com/)
Now all you need is Docker for the assessment's backend API.

Don't have Docker? You can download it on their [website](https://docs.docker.com/get-docker/).

Then start running the container:
```*.sh-session
docker run --rm -p 8888:8888 adhocteam/noclist
```

### Run the script

You've done it! Now it's time to execute the command from the root of the noclist directory:

```*.sh-session
pipenv run python main.py
```


## Testing

Run unit tests from the root of the noclist directory:
```*.sh-session
pipenv run pytest tests/test_main_unit.py 
```

Run e2e tests from the root of the noclist directory (make sure that docker container is running):
```*.sh-session
pipenv run pytest tests/test_main_e2e.py
```

Run type checks:
```*.sh-session
pipenv run mypy main.py
```

## Potential Future Improvements
- I wish I had more time to dig into building out pytest fixtures instead of these garish variables in the main pages.
- One internal debate I had was if I should include the newline in the stdout and if I should encapsulate the entire stdout in an object. In the end, I believe this is the most valid JSON without any extra trappings.
- I'd love to add types to the testing file as well
- Really wanted to dockerize this, but it just slipped in my scope. Instead, I got to write a small novel of dev environment steps.

## noclist Documentation

[Link to Ad Hoc noclist documentation](https://homework.adhoc.team/noclist/)
