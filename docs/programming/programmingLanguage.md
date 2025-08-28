---
title: programming Language
description: 
created_at: 2021-12-09T00:27:40Z
updated_at: 2025-07-14T01:58:16Z
tags: [cs, programming]
---

## var

```c
int a = 1; // C 年份: 1972
```
```python
a = 1  # Python 年份: 1991
b: int = 2  # Python 3.6+ 显式类型注解 年份: 2016
global c = 3  # Python 3.8+ 全局变量  年份: 2019
```
```java
class Main {
    public static void main(String[] args) {
        int a = 1; // Java 年份: 1995
        // Java 10 引入的 var
        var b = 2; // 自动推断类型为 int 年份: 2017
        System.out.println(a + b);
    }
}
```
```js
a = 1; // JavaScript 年份: 1995
var b = 2; // ES5 年份: 2009
let c = 3; // ES6 年份: 2015
const d = 4; // ES6 年份: 2015
```
```ts
let a = 1; // TypeScript 类型推断 年份: 2012
let b: number = 2; // 显式类型注解 年份: 2012
const c: number = 3; // 常量 年份: 2012
```
```go
a := 1 // Go 类型推断 年份: 2009
var b int = 2 // 显式类型注解 年份: 2009
const c = 3 // 常量 年份: 2009
```
```rust
let a = 1; // Rust 类型推断 年份: 2010
let b: i32 = 2; // 显式类型注解 年份: 2010
const C: i32 = 3; // 常量 年份: 2010
```

### array
```c
int arr[5] = {1, 2, 3, 4, 5}; // C 数组 年份: 1972
```
```python
arr = [1, 2, 3, 4, 5]  # Python 列表 年份: 1991
```
```java
int[] arr = {1, 2, 3, 4, 5}; // Java 数组 年份: 1995
```
```js
let arr = [1, 2, 3, 4, 5]; // JavaScript 数组 年份: 1995
```
```ts
let arr = [1, 2, 3, 4, 5]; // TypeScript 数组 年份: 2012
```
```go
var arr = []int{1, 2, 3, 4, 5} // Go 切片 年份: 2009
```
```rust
let arr = [1, 2, 3, 4, 5]; // Rust 数组 年份: 2010
let vec = vec![1, 2, 3, 4, 5]; // Rust 向量 年份: 2010
```

## object-oriented programming {~1967}

- 符合人类思维模式

| 特性 | C++ | Java | C# | Python |
|------|-----|------|----|----|
| 多重继承 | 支持 | 不支持 | 不支持 | 支持 |
| 接口 | 抽象类模拟 | 可以提供默认方法 | 原生支持 | 协议 |
| 访问控制 | public/private/protected | public/private/protected/package | public/private/protected/internal | 约定（_前缀） |
| 垃圾回收 | 手动管理 | 自动 | 自动 | 自动 |
| 泛型 | 模板 | 类型擦除 | 真泛型 | 动态类型 |

### extends, inheritance

### abstract class {~1970}

- 用于提供部分实现 + 强制子类实现特定方法

```cpp
class Shape {
protected:
    int x, y;
    
public:
    virtual void draw() = 0;  // 纯虚函数
    void move(int dx, int dy) {
        x += dx;
        y += dy;
    }
};

class Circle : public Shape {
private:
    int radius;
    
public:
    void draw() override {
        // 绘制圆形的具体实现
    }
};
```

```java
abstract class FileHandler {
    protected String fileName;
    protected long fileSize;
    
    public FileHandler(String fileName) {
        this.fileName = fileName;
        this.fileSize = 0;
    }
    
    // 具体方法 - 通用逻辑
    protected void logOperation(String operation) {
        System.out.println("[" + fileName + "] " + operation);
    }
    
    public long getFileSize() {
        return fileSize;
    }
    
    // 抽象方法 - 强制实现
    public abstract boolean open();
    public abstract void close();
    public abstract byte[] read(int offset, int length);
    public abstract void write(byte[] data, int offset);
    
    // 模板方法 - 定义标准流程
    public final void processFile(byte[] data) {
        if (!open()) {
            throw new RuntimeException("Cannot open file: " + fileName);
        }
        
        try {
            logOperation("Processing started");
            write(data, 0);
            logOperation("Processing completed");
        } finally {
            close();
        }
    }
}

class LocalFileHandler extends FileHandler {
    public LocalFileHandler(String fileName) {
        super(fileName);
    }
    
    public boolean open() {
        logOperation("Opening local file");
        return true;
    }
    
    public void close() {
        logOperation("Closing local file");
    }
    
    public byte[] read(int offset, int length) {
        logOperation("Reading from local file");
        return new byte[length];
    }
    
    public void write(byte[] data, int offset) {
        logOperation("Writing to local file");
        this.fileSize = data.length;
    }
}

```

```python
```
```typescript
abstract class DatabaseConnection {
    protected connectionString: string;
    
    constructor(connStr: string) {
        this.connectionString = connStr;
    }
    
    // 共同实现 - 所有子类都能用
    protected log(message: string): void {
        console.log(`[DB] ${new Date().toISOString()}: ${message}`);
    }
    
    // 抽象方法 - 强制子类实现
    abstract connect(): Promise<boolean>;
    abstract disconnect(): Promise<void>;
    abstract executeQuery(query: string): Promise<any>;
    
    // 模板方法模式 - 定义算法骨架
    async executeWithTransaction(queries: string[]): Promise<void> {
        await this.connect();
        try {
            for (const query of queries) {
                await this.executeQuery(query);
            }
        } catch (error) {
            this.log(`Transaction failed: ${error}`);
            throw error;
        } finally {
            await this.disconnect();
        }
    }
}

class PostgreSQLConnection extends DatabaseConnection {
    async connect(): Promise<boolean> {
        this.log("Connecting to PostgreSQL...");
        // PostgreSQL 特定逻辑
        return true;
    }
    
    async disconnect(): Promise<void> {
        this.log("Disconnecting from PostgreSQL...");
    }
    
    async executeQuery(query: string): Promise<any> {
        this.log(`Executing: ${query}`);
        // PostgreSQL 特定逻辑
        return {};
    }
}
```
```rust
// Rust 没有传统的抽象类，但有 trait 提供类似功能
trait Shape {
    fn area(&self) -> f64;
    fn perimeter(&self) -> f64;
    
    // 默认实现 - 类似抽象类的具体方法
    fn describe(&self) -> String {
        format!("Shape with area {} and perimeter {}", 
                self.area(), self.perimeter())
    }
    
    // 可以有默认实现的方法
    fn scale(&mut self, factor: f64) {
        println!("Scaling shape by factor {}", factor);
    }
}

struct Circle {
    radius: f64,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
    
    fn perimeter(&self) -> f64 {
        2.0 * std::f64::consts::PI * self.radius
    }
}

struct Rectangle {
    width: f64,
    height: f64,
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }
    
    fn perimeter(&self) -> f64 {
        2.0 * (self.width + self.height)
    }
    
    // 重写默认实现
    fn describe(&self) -> String {
        format!("Rectangle {}x{} with area {}", 
                self.width, self.height, self.area())
    }
}
```

### interface(java:1990), trait(rust:2020), Protocol, implements

- 如果 abstract class 只包含抽象方法，就相当于接口, 为什么会诞生 interface 呢？
  1. 继承限制问题: 由于设计约束, 许多语言不允许多重继承, 接口强制无状态，避免复杂的继承关系, 可以更好地被优化
  2. 语义明确性: 继承表示 "is-a" 关系，而接口表示 "can-do" 关系

```typescript
// 抽象类：表示"是一个"(is-a)关系
abstract class Animal {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    abstract makeSound(): void;
    
    // 具体实现
    eat(): void {
        console.log(`${this.name} is eating`);
    }
}

// 接口：表示"能做什么"(can-do)关系
interface Flyable {
    fly(): void;
    altitude: number;
}

interface Swimmable {
    swim(): void;
    depth: number;
}

// 鸭子既是动物，又能飞又能游泳
class Duck extends Animal implements Flyable, Swimmable {
    altitude: number = 0;
    depth: number = 0;
    
    makeSound(): void {
        console.log("Quack!");
    }
    
    fly(): void {
        this.altitude = 100;
        console.log(`${this.name} is flying at ${this.altitude}m`);
    }
    
    swim(): void {
        this.depth = 2;
        console.log(`${this.name} is swimming at ${this.depth}m depth`);
    }
}
```
## function

- 使用函数和过程来组织代码
- 数据与操作分离
- 全局变量和函数的组合

```c
struct Point {
    int x, y;
};

void move_point(struct Point* p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}
```

### function syntax
```c
void function_name(int param1, float param2) {} // C 1972
```
```python
def function_name(param1: int, param2: float) -> None: # Python 1991, type hints 2016
    pass
```
```java
public class ClassName {
    public void functionName(int param1, float param2) {} // java 1995
}
```
```js
function functionName(param1, param2) {} // JavaScript 1995
// const functionName = (param1, param2) => {} // ES6
```
```ts
function functionName(param1: number, param2: number): void {} // TypeScript

const functionName = (param1: number, param2: number): void => {}

type FunctionName = (param1: number, param2: number) => void; // 定义类型
const functionName2: FunctionName = (param1, param2) => {}
```
```go
func functionName(param1 int, param2 float64) int {} // go 2009
```
```rust
fn function_name(param1: i32, param2: f64) -> i32 {} // rust 2010
```

## Type System

### static vs dynamic typing

### auto, 类型推导

### Generics, Templates (~1980s)

- 类型安全 vs 代码重用的矛盾

```c
// 早期C语言的痛点：为每种类型都要写重复代码
void sort_int(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void sort_float(float arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                float temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// 想要通用？只能用 void*，但失去了类型安全
void sort_generic(void* arr, int size, int elem_size, 
                  int (*compare)(const void*, const void*)) {
    // 复杂且容易出错的实现
}
```
泛型的解决方案:
```cpp
// C++ 模板：编译时多态
template<typename T>
void sort_template(T arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                T temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// 使用时：
int int_arr[] = {3, 1, 4, 1, 5};
sort_template(int_arr, 5);  // 编译器生成 sort_template<int>

float float_arr[] = {3.1, 1.4, 4.1, 1.5};
sort_template(float_arr, 4);  // 编译器生成 sort_template<float>
```


```typescript
// TypeScript 的高级泛型特性
// 条件类型
type ApiResponse<T> = T extends string 
    ? { message: T } 
    : { data: T };

// 映射类型
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 工具类型
interface User {
    id: number;
    name: string;
    email: string;
}

type PartialUser = Partial<User>;  // 所有属性都变为可选
// { id?: number; name?: string; email?: string; }

// 高阶类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getString(): string {
    return "hello";
}

type StringType = ReturnType<typeof getString>;  // string
```

## libraries, packages, modules

### header files
### namespace
### import/export

## ts

### ts_var

```ts
// 写法 1
interface UpdateData {
    name?: string;
    changelog?: string;
    version_type?: string;
    game_versions?: string[];
    loaders?: string[];
}
const fieldsToUpdate: Partial<UpdateData> = {
};
if (updateData.name !== undefined) fieldsToUpdate.name = updateData.name;
if (updateData.changelog !== undefined) fieldsToUpdate.changelog = updateData.changelog;
if (updateData.version_type !== undefined) fieldsToUpdate.version_type = updateData.version_type;
if (updateData.game_versions !== undefined) fieldsToUpdate.game_versions = updateData.game_versions;
if (updateData.loaders !== undefined) fieldsToUpdate.loaders = updateData.loaders;
// 写法 2
const fieldsToUpdate = {
    name: updateData?.name,
    changelog: updateData?.changelog,
    version_type: updateData?.version_type,
    game_versions: updateData?.game_versions,
    loaders: updateData?.loaders,
}
// 写法 2 的结果  
{
    name: "test",
    changelog: undefined,  // 属性存在但值为 undefined
    version_type: "release",
    game_versions: undefined,
    loaders: undefined
}
```

### ts_iterate
```ts
// for len
// 使用 for...of 遍历数组
const numbers = [1, 2, 3, 4, 5];
for (const num of numbers) {
    console.log(num);  // 输出每个数字
}

### ts/class
```ts
class MyClass {
    // 实例变量默认是 public
    instanceVar: string = "default";           // 等同于 public instanceVar
    
    // 实例方法默认是 public
    instanceMethod(): void {                   // 等同于 public instanceMethod()
        console.log("instance method");
    }
    
    // 静态变量默认是 public
    static staticVar: string = "static";       // 等同于 public static staticVar
    
    // 静态方法默认是 public
    static staticMethod(): void {              // 等同于 public static staticMethod()
        console.log("static method");
    }
    
    // 显式声明其他修饰符
    private privateVar: number = 0;
    protected protectedVar: boolean = true;
    
    private privateMethod(): void {
        console.log("private method");
    }
    
    protected protectedMethod(): void {
        console.log("protected method");
    }
    
    private static privateStaticVar: string = "private static";
    protected static protectedStaticVar: string = "protected static";
    
    private static privateStaticMethod(): void {
        console.log("private static method");
    }
    
    protected static protectedStaticMethod(): void {
        console.log("protected static method");
    }
}

// 使用示例
const instance = new MyClass();

// 可以访问（默认 public）
console.log(instance.instanceVar);        // ✅ 可以访问
instance.instanceMethod();                // ✅ 可以访问
console.log(MyClass.staticVar);           // ✅ 可以访问
MyClass.staticMethod();                   // ✅ 可以访问

// 不能访问（private）
// console.log(instance.privateVar);      // ❌ 编译错误
// instance.privateMethod();              // ❌ 编译错误
// console.log(MyClass.privateStaticVar); // ❌ 编译错误
// MyClass.privateStaticMethod();         // ❌ 编译错误

// 继承示例
class ChildClass extends MyClass {
    constructor() {
        super();
        
        // 可以访问 public 和 protected
        console.log(this.instanceVar);     // ✅ public
        console.log(this.protectedVar);    // ✅ protected
        
        // 可以访问 protected static
        console.log(ChildClass.protectedStaticVar);  // ✅ protected static
        
        // 不能访问 private
        // console.log(this.privateVar);   // ❌ 编译错误
    }
}
```
#### ts/访问控制
- public（默认）：类内部、子类、类外部都可以访问
- protected：类内部和子类可以访问，类外部不可以访问
- private：只有类内部可以访问，子类和类外部都不可以访问

### ts/enum
枚举的最佳实践
1. 优先使用字符串枚举：更易读，更安全
2. 使用 const 枚举：性能更好，编译时内联
3. 枚举命名：使用 PascalCase，成员使用 PascalCase
4. 避免混合枚举：保持类型一致性
```typescript
// 推荐的使用方式: erasableSyntaxOnly: false 时的一种简化语法
const enum APIEndpoint {
    Users = "/api/users",
    Posts = "/api/posts",
    Comments = "/api/comments"
}

// 在 switch 语句中使用
function handleAPICall(endpoint: APIEndpoint) {
    switch (endpoint) {
        case APIEndpoint.Users:
            return fetchUsers();
        case APIEndpoint.Posts:
            return fetchPosts();
        case APIEndpoint.Comments:
            return fetchComments();
        default:
            throw new Error(`Unknown endpoint: ${endpoint}`);
    }
}
```
枚举在 TypeScript 中是组织常量和提供类型安全的强大工具

### ts_type
```typescript
// 修改 type 的 字段的 type
type User = {
    id: number;
    name: string;
    email: string;
};
type UserWithAge = Omit<User, 'email'> & { age: number }; // 去掉 email 字段并添加 age 字段
```

## java

### java/class

#### java/enum

```java
public enum PackType {
	CLIENT_RESOURCES("assets"),
	SERVER_DATA("data");

	private final String directory;

	private PackType(final String string2) {
		this.directory = string2;
	}

	public String getDirectory() {
		return this.directory;
	}
}
// e.g
PackType clientPack = PackType.CLIENT_RESOURCES;
String dir = clientPack.getDirectory(); // 返回 "assets"

PackType serverPack = PackType.SERVER_DATA;
String dir2 = serverPack.getDirectory(); // 返回 "data"
```

#### java/record

Java 14 作为预览功能引入，Java 16 正式发布的一种特殊类型，用于创建不可变的数据载体类
```java
// 传统的数据类写法
public class Person {
    private final String name;
    private final int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && Objects.equals(name, person.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// 使用 record 的简化写法
public record Person(String name, int age) {}
```
1. 自动生成的功能：
  - 构造函数
  - getter 方法（不是 getName()，而是 name()）
  - equals() 和 hashCode() 方法
  - toString() 方法
2. 不可变性：
  - 所有字段都是 final
  - 没有 setter 方法
3. 紧凑语法：
  - 大幅减少样板代码
