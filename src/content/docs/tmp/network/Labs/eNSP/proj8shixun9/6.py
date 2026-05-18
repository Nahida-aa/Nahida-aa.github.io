def construct_get_request(url):
    from urllib.parse import urlparse

    parsed_url = urlparse(url)
    request_line = f"GET {parsed_url.path}?{parsed_url.query} HTTP/1.1"
    host_header = f"Host: {parsed_url.netloc}"

    # 构造请求报文
    request_message = f"{request_line}\n{host_header}\n\n"
    return request_message

url = "https://api.example.com/data?param=value"
request_message = construct_get_request(url)
print(request_message)