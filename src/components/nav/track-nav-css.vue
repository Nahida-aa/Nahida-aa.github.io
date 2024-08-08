


<template>
  <div class="cont">

    <a class="item item1 checked" href="#">1</a>

    <a class="item item2" href="#">2</a> <!-- 动态滑动2 checked -->

    <a class="item item3" href="#">3</a> <!-- 动态滑动3 checked -->

    <div class="slide"></div>

  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: unset;
}

.cont {
  width: 270px;
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  background-color: rgb(172, 216, 255);

  .item {
    position: relative;
    z-index: 1;
    width: 80px;
    height: 50px;
    margin: 5px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item1:hover ~ .slide {
    transform: translateX(0px);
  }

  .item2:hover ~ .slide {
    transform: translateX(90px);
  }

  .item3:hover ~ .slide {
    transform: translateX(180px);
  }

  .slide {
    position: absolute;
    z-index: 0;
    width: 80px;
    height: 50px;
    margin: 5px;
    border-radius: 8px;
    background-color: rgba(0, 132, 255, 0.509);
    transition: all 0.3s linear;
    transform: translateX(0px); // 动态滑动2: 90px; 动态滑动3: 180px
  }
}

.checked {
  background-color: rgba(59, 59, 179, 0.475);
}
</style>