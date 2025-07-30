
const 第一个人 = {
  name: '小明',
  age: 18,
  print_info: function(){
    console.log(`姓名: ${this.name}, 年龄: ${this.age}`);
  }
}
第一个人.name
第一个人.age
第一个人.print_info // 姓名: 小明, 年龄: 18


// class 人():
//     def __init__(self, name, age=None):
//         self.name = name
//         self.age = age

//     def print_info(self):
//         print(f"姓名: {self.name}, 年龄: {self.age}")

// 第一个人 = 人("小明", 18) # self
// 第一个人.name
// 第一个人.age
// 第一个人.print_info() # 姓名: 小明, 年龄: None