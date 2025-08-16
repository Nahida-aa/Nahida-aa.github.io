
function App1 (name:string, version:string) {

  const self = {
    name: name,
    version: version,
    toString: () => `${name} ${version}`,
  };

  return self
}

type APP = {
  name: string,
  version: string,
  toString: () => string,
  吃饭: () => void,
}

const App2 = (name:string, version:string) => {
  let self:APP = {
    name: name,
    version: version,
    toString: () => `${name} ${version}`,
    吃饭: 吃饭,
  }

  function 吃饭 () {
    console.log(`${self.name} 吃饭`);
  };

  return self
}
class App3 {
  constructor(
    public name: string,
    public version: string,
  ) {}
  
  toString() {
    return `${this.name} ${this.version}`;
  }
  吃饭() {
    console.log(`${this.name} 吃饭`);
  }
}

const app = App2('安安', '0.1.0');

console.log(app)

const appString = app.toString();
// console.log(appString);
app.吃饭();


// let
// var
// const 
