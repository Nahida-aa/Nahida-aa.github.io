response_text = """HTTP/1.1 200 OK
Date: Fri, 04 Oct 2024 10:36:00 GMT
Server: Apache/2.4.41 (Ubuntu)
Content-Type: application/json
Content-Length: 204
Connection: close

{
  "status": "success",
  "message": "Data fetched successfully",
  "data": {
    "item": [
      {"id": 1, "value": "one"},
      {"id": 2, "value": "two"}
    ]
  }
}
"""

# 分割响应报文的头部和主体
header_text, body = response_text.split('\n\n', 1)

# 分割头部的每一行
header_lines = header_text.split('\n')

# 提取状态码
status_line = header_lines[0]
status_code = status_line.split(' ')[1]

# 提取Content-Type字段
content_type = None
for line in header_lines:
    if line.startswith('Content-Type'):
        content_type = line.split(': ')[1]
        break

print(f"状态码: {status_code}")
print(f"Content-Type: {content_type}")
print(f"响应体: {body}")