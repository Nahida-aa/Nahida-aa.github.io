import requests

response = requests.get('https://www.bing.com')
print(response.status_code)
print(response.text)