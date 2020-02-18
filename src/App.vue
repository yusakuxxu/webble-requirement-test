<template>
  <div id="app">
    <div class="section">
      <div class="logo-container">
        <img src="./assets/cocorokit.svg">
        <p class="subtitle">ココロキット対応確認ページ</p>
      </div>
      <CanUseWebBLE />
      <div class="powered-by">
        <p>Powered by Yukai Engineering Inc.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import CanUseWebBLE from './components/CanUseWebBLE.vue'

  export default {
    name: 'app',
    components: {
      CanUseWebBLE
    }
  }
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,500,700|Roboto:400,500,700&display=swap);

  #app {
    font-family: 'Noto Sans JP', 'NotoSansCJKjp', YuGothic, '游ゴシック', 'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'メイリオ', Meiryo, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    width: 100vw;
  }

  html,
  body {
    height: auto;
    width: auto;
    background-color: #42bed5;
  }

  p.subtitle {
    color: white;
  }

  .logo-container {
    height: 30%;
    width: auto;
    text-align: center;

    img {
      margin-bottom: 10px;

      @media (max-width: 480px) {
        max-width: 20%;
      }

      @media (min-width: 481px) and (max-width: 1024px) {
        max-width: 15%;
      }

      @media (min-width: 1025px) {
        max-width: 5%;
      }
    }
  }

  .powered-by {
    position: absolute;
    right: 30px;
    bottom: 30px;
    color: white;
  }
</style>