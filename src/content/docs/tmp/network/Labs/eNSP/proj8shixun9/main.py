import requests
from requests.auth import HTTPBasicAuth
import json

AUTH = HTTPBasicAuth('python', 'Huawei@123')
MEDIA_TYpe = 'application/yang-data+json'
HEADERS = {'Accept': MEDIA_TYpe, 'Content-Type':MEDIA_TYpe}

def get_rquest(url):
    response = requests.get(url, auth=AUTH, headers=HEADERS, verify=False)
    print('API:', url)
    print(response.status_code)
    if response.status_code in [200, 202, 204]:
        print('successful req')
    else:
        print('error req')
    out = json.loads(response.text)
    print(out)
url = "http://192.168.226.220:8080/restconf/data/identifier"
# url = "http://192.168.11.200:8080/restconf/data/huawei-aaa:aaa/domains"
get_rquest(url)