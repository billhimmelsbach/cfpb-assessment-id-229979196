'''unit and slight integration tests for main.py'''

import contextlib
import io
import main
import pytest
import requests.exceptions
import requests
from requests_mock import Mocker

TEST_URL_BASE: str = 'http://0.0.0.0:8888'
AUTH_URL = TEST_URL_BASE + '/auth'
USERS_URL = TEST_URL_BASE + '/users'

auth_headers = {
    "Badsec-Authentication-Token": "FDE43423-362D-0DD8-C92C-BD32E6E24A6A",
}


def test_handle_exception():
    '''test that handle_exception prints to stderr the exception message'''
    text_stream = io.StringIO()
    with contextlib.redirect_stderr(text_stream):
        main.handle_exception(Exception("a test exception"))
        output = text_stream.getvalue().strip()
        assert output == "a test exception"


def test_connect_200():
    '''test that connect can return a status code 200'''
    with Mocker() as mock:
        mock.get(AUTH_URL)
        response = main.connect(AUTH_URL, None)
        assert response.status_code == 200


def test_connect_200_with_headers():
    '''test that connect can return a status code 200 when headers are passed'''
    with Mocker() as mock:
        mock.get(AUTH_URL, headers=auth_headers)
        auth_token = main.get_auth_token()
        assert auth_token == 'FDE43423-362D-0DD8-C92C-BD32E6E24A6A'


def test_connect_fail_500():
    '''test that connect can exit with status code 1 when status code is 500'''
    with Mocker() as mock:
        with pytest.raises(SystemExit) as pytest_error:
            mock.get("http://0.0.0.0:8888/auth", status_code=500)
            main.connect(AUTH_URL, None)
        assert pytest_error.type == SystemExit
        assert pytest_error.value.code == 1
        assert mock.call_count == 3


def test_connect_fail_connection_error():
    '''test that connect can exit with status code 1 when connection error is raised'''
    with Mocker() as mock:
        with pytest.raises(SystemExit) as pytest_error:
            mock.get(
                "http://0.0.0.0:8888/auth", exc=requests.exceptions.ConnectionError
            )
            main.get_auth_token()
        assert pytest_error.type == SystemExit
        assert pytest_error.value.code == 1
        assert mock.call_count == 3


def test_connect_fail_timeout():
    '''test that connect can exit with status code 1 when timeout error is raised'''
    with Mocker() as mock:
        with pytest.raises(SystemExit) as pytest_error:
            mock.get(
                "http://0.0.0.0:8888/auth", exc=requests.exceptions.Timeout
            )
            main.get_auth_token()
        assert pytest_error.type == SystemExit
        assert pytest_error.value.code == 1
        assert mock.call_count == 3


def test_get_auth_token():
    '''test that get_auth_token can return the auth token'''
    with Mocker() as mock:
        mock.get(AUTH_URL, headers=auth_headers)
        auth_token = main.get_auth_token()
        # assert auth_token == 'FDE43423-362D-0DD8-C92C-BD32E6E24A6A'
        assert auth_token == auth_headers["Badsec-Authentication-Token"]


def test_get_auth_checksum():
    '''test that get_auth_checksum can return the auth checksum when given an auth_token'''
    auth_checksum = main.get_auth_checksum(
        auth_headers["Badsec-Authentication-Token"], '/users')
    assert auth_checksum == 'fb56d5cda515b9f666d47434f5c1d05dfedc1b5f266b86fca15f56c005504df2'


def test_get_noclist_main():
    '''test that get_noclist_main can return a status code 0'''
    with Mocker() as mock:
        mock.get(AUTH_URL, headers=auth_headers)
        mock.get(USERS_URL, headers={
                 'X-Request-Checksum': 'fb56d5cda515b9f666d47434f5c1d05dfedc1b5f266b86fca15f56c005504df2'})
        with pytest.raises(SystemExit) as excinfo:
            main.get_noclist_main()

        assert excinfo.value.code == 0
