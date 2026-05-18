# web

Web 是指万维网（World Wide Web），它是一个由互联网上的服务器和客户端组成的全球信息系统。用户可以通过浏览器访问和浏览网页，网页通常使用 HTML、CSS 和 JavaScript 等技术来构建。Web 技术使得信息共享、电子商务、社交网络等成为可能。

## MVC

Model View Controller 是一种设计模式，用于将应用程序分为三个主要组成部分：模型、视图和控制器。

- 模型（Model）是应用程序的主要组成部分，用于处理应用程序的数据逻辑。
- 视图（View）是应用程序的用户界面，用于显示数据。
- 控制器（Controller）是应用程序的业务逻辑，用于处理用户输入。

MVT 是 Django 中的 MVC 模式的变种，其中：

- 模型（Model）是应用程序的数据模型，用于处理数据逻辑。
- 视图（View）是应用程序的用户界面，用于显示数据。
- 模板（Template）是应用程序的用户界面，用于显示数据。

MVVM 是一种设计模式，用于将应用程序分为三个主要组成部分：模型、视图和视图模型。

- 模型（Model）是应用程序的数据模型，用于处理数据逻辑。
- 视图（View）是应用程序的用户界面，用于显示数据。
- 视图模型（ViewModel）是应用程序的业务逻辑，用于处理用户输入。

### Restful API

RESTful API 是一种设计风格，用于构建 Web 服务。

- REST 是 Representational State Transfer 的缩写，是一种设计风格，用于构建 Web 服务。

## Django

my-portfolio-backend
├── manage.py                // Django 管理脚本
├── myportfolio
│   ├── __init__.py
│   ├── settings.py          // Django 设置
│   ├── urls.py              // URL 路由
│   ├── wsgi.py              // WSGI 入口
│   └── asgi.py              // ASGI 入口
├── api
│   ├── __init__.py
│   ├── views.py             // API 视图
│   ├── models.py            // 数据模型
│   ├── serializers.py       // 数据序列化
│   └── urls.py              // API 路由
├── ml
│   ├── __init__.py
│   ├── model.py             // 机器学习模型
│   └── utils.py             // 机器学习辅助函数
├── markdown
│   ├── __init__.py
│   └── render.py            // Markdown 渲染逻辑
├── code_storage
│   ├── __init__.py
│   └── storage.py           // 代码存储逻辑
└── requirements.txt         // 项目依赖

[myportfolio/settings.py](myportfolio/settings.py) 是 Django 项目的设置文件，包含了项目的配置信息。

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'api',
    'ml',
    'markdown',
    'code_storage',
    ...
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase',
        'USER': 'mydatabaseuser',
        'PASSWORD': 'mypassword',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

[api/views.py](api/views.py) 是 Django 项目的 API 视图文件，包含了 API 视图逻辑。

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MyModel
from .serializers import MyModelSerializer

class MyModelView(APIView):
    def get(self, request):
        items = MyModel.objects.all()
        serializer = MyModelSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MyModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

[ml/model.py](ml/model.py) 是 Django 项目的机器学习模型文件，包含了机器学习模型逻辑。

```python
import tensorflow as tf

def load_model():
    model = tf.keras.models.load_model('path/to/your/model')
    return model

def predict(data):
    model = load_model()
    prediction = model.predict(data)
    return prediction
```

[markdown/render.py](markdown/render.py) 是 Django 项目的 Markdown 渲染文件，包含了 Markdown 渲染逻辑。

```python
import markdown

def render_markdown(text):
    return markdown.markdown(text)
```

[code_storage/storage.py](code_storage/storage.py) 是 Django 项目的代码存储文件，包含了代码存储逻辑。

```python
from django.db import models

class CodeSnippet(models.Model):
    title = models.CharField(max_length=100)
    code = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

def save_code_snippet(title, code):
    snippet = CodeSnippet(title=title, code=code)
    snippet.save()
    return snippet
```
