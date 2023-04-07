'''This module handles interfacing with the BADSEC API'''

import json
import hashlib
import sys
import typing

import requests

# default docker address for adhocteam/noclist
BADSEC_API_URL: str = 'http://0.0.0.0:8888'
MAX_NUMBER_OF_CONNECTION_ATTEMPTS: int = 3


def handle_exception(error: Exception) -> None:
    """
    abstracted error handling function (would include logging in a production environment)
    """
    print(error, file=sys.stderr)


def connect(url: str, headers: typing.Optional[typing.Mapping[str, typing.Union[str, bytes]]]) -> requests.Response:
    """
    initiates initial API call with headers, retries API connection if connection fails
    """
    attempts: int = 0
    while attempts < MAX_NUMBER_OF_CONNECTION_ATTEMPTS:
        attempts += 1
        try:
            response: requests.Response = requests.get(url, headers=headers)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as error:
            handle_exception(error)
    # throw retry exception after max number of attempts (requests lib defaults to 1 try per call)
    print(requests.exceptions.RetryError(
        'Max number of connection attempts reached'))
    sys.exit(1)


def get_auth_token() -> str:
    """
    get authentication token from API
    """
    auth_url: str = BADSEC_API_URL + '/auth'
    auth_response: requests.Response = connect(auth_url, None)
    auth_token: str = auth_response.headers['Badsec-Authentication-Token']
    return auth_token


def get_auth_checksum(auth_token: str, endpoint: str) -> str:
    """
    gets the checksum necessary to authorize access the API
    """
    utf_8_string_to_be_hashed: bytes = (auth_token + endpoint).encode('utf-8')
    sha_hash: hashlib.sha3_256 = hashlib.sha256(utf_8_string_to_be_hashed)
    auth_checksum: str = sha_hash.hexdigest()
    return auth_checksum


def get_users(checksum: str) -> str:
    """
    get the list of users from the API
    """
    get_users_url: str = BADSEC_API_URL + '/users'
    auth_header: typing.Dict[str, str] = {'X-Request-Checksum': checksum}
    users_response: requests.Response = connect(
        get_users_url, auth_header)
    user_list: str = users_response.text
    return user_list


def get_noclist_main() -> None:
    """
    main function to get the noclist
    """
    auth_token: str = get_auth_token()
    auth_checksum: str = get_auth_checksum(auth_token, '/users')
    users_newline_delimited: str = get_users(auth_checksum)
    users_json_string: str = json.dumps(users_newline_delimited.splitlines())
    # using sys.stdout: assessment instructions say json string which don't include newline chars
    sys.stdout.write(users_json_string)
    sys.exit(0)


if __name__ == '__main__':
    get_noclist_main()
