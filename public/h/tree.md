```html
<template>
  <view>
    <input />
    <input />
  </view>
  <view>
    <input />
    <input >
      <div ></div>
    </input>
    <input />
  </view>
</template>

<style scoped lang="scss">
view {
  display: block;
  input {
    display: block;
  }
}

div {
  display: block;
}
</style>
```

```mermaid
graph LR
  A[template] --> B[view]
  B --> C[input]
  B --> D[input]
  A --> E[view]
  E --> F[input]
  E --> G[input]
  G --> H[div]
  E --> I[input]
```