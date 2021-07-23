<template>
  <footer>
    <a href="#">© 2021 CATA</a>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
footer {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    outline: none;
    color: #686868;
  }
  img {
    margin-left: 10px;
  }
}
</style>
