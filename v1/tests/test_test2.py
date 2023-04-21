import os
logname = os.environ['URL']


def test_env():
    assert logname == 'www.google.com'
