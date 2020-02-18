<template>
  <div class="section webble-test">
    <div class="container main">
      <button class="button btn-check" @click="useWebBLE()">ここを押して確認する</button>
      <div id="message" class="subtitle">{{ this.message }}</div>

      <div v-show="isnot_available" class="container">
        <table class="table">
          <tbody>
            <tr>
              <td></td>
              <td>ご利用の環境</td>
              <td>ご対応方法・備考</td>
            </tr>
            <tr>
              <td>ブラウザ</td>
              <td v-bind:style="{ backgroundColor: check_browser(browser_name)}">{{ browser_name }}</td>
              <td>
                <p v-show="this.device === 'pc'">Google Chromeをご利用ください（<a target="_blank" rel="noopener noreferrer"
                    href="https://www.google.com/chrome/">Google Chrome サイト</a>）</p>
              </td>
            </tr>
            <tr v-show="browser_name === 'Chrome'">
              <td>Chromeのバージョン</td>
              <td v-bind:style="{ backgroundColor: check_version(browser_version)}">{{ browser_version }}</td>
              <td>
                <p v-show="this.device === 'pc'">Google Chromeをアップデートしてください。</p>
              </td>
            </tr>
            <tr>
              <td>OS</td>
              <td v-bind:style="{ backgroundColor: check_os(os_name, os_version)}">{{ os_name + " " + os_version }}</td>
              <td>
                <div v-if="this.os_name === 'Windows'">
                  <p v-if="this.os_version === '10'">2017年7月以降にアップデートをしている必要があります。<br>(Version: 1907以降)</p>
                  <p v-else>申し訳ありません。<br>Windows10以前のOS(7, 8.1, XP等)は対応しておりません。</p>
                </div>
                <div v-else-if="this.os_name === 'Android'">
                  <p v-show="parseInt(this.os_version, 10) < 6">Android OSはバージョン6以上のデバイスを利用してください。</p>
                </div>
                <div v-else-if="this.os_name === 'Mac OS'">
                  <p></p>
                </div>
                <div v-else>
                  <p>申し訳ありません。ご利用のOSの対応状況はお客様ご自身でお調べください。<br>
                    ココロキットはWeb Bluetooth APIという技術を使用しております。<br>
                    （<a target="_blank" rel="noopener noreferrer"
                      href="https://github.com/WebBluetoothCG/web-bluetooth/blob/master/implementation-status.md">Web
                      Bluetooth API公式サイト（英語）</a>）</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import UAParser from 'ua-parser-js'

  export default {
    name: "CanUserWebBLE",
    data: function () {
      return {
        message: "",
        isnot_available: false,
        after_check: false,
        ua: Object,
        device: ""
      }
    },
    created: function () {
      this.ua = UAParser();
      if (typeof this.ua.device.type === "undefined") {
        this.device = "pc";
      } else {
        this.device = "mobile";
      }
    },
    computed: {
      browser_name: function () {
        return this.ua.browser.name;
      },
      browser_version: function () {
        if (this.ua.browser.name === "Chrome") {
          return this.ua.browser.version;
        }
        return "";
      },
      os_name: function () {
        return this.ua.os.name;
      },
      os_version: function () {
        return this.ua.os.version;
      }
    },
    methods: {
      useWebBLE() {
        try {
          if (typeof navigator.bluetooth.requestDevice === "function") {
            this.message = "ココロキットに対応しております！";
          }
        } catch (error) {
          this.message = "申し訳ありません。対応した環境";
          this.isnot_available = true;
        }
      },
      check_browser(browser_name) {
        if (browser_name != "") {
          if (browser_name == "Chrome") {
            return "#00D1B2";
          }
          return "#FF3860"; //else
        }
      },
      check_version(browser_version) {
        if (browser_version != "") {
          if (Number(browser_version.slice(0, 2)) > 56) {
            return "#00D1B2"
          }
          return "#FF3860"
        }
        return "#fff";
      },
      check_os(os_name, os_version) {
        if (os_name != "" && os_version != "") {
          if (os_name == "Windows") {
            if (Number(os_version) < 10) {
              return "#FF3860";
            }
            return "#FFDD57";
          }

          if (os_name == "Mac OS") {
            return "#00D1B2";
          }

          if (os_name == "Android") {
            return "#00D1B2";
          }

          // default
          return "#D3D3D3"
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .section {
    height: 100%;
    width: 100%;
    background-color: #42bed5;
  }

  .subtitle {
    color: white;
  }

  .webble-test {
    text-align: center;
  }

  .btn-check {
    color: black;
    -webkit-text-fill-color: black;
    font-size: 1.5em;
    box-shadow: 0px 0px 10px 5px #CCC;
    border-radius: 5px;
    margin: 20px;
  }

  table {
    margin-left: auto;
    margin-right: auto;
  }

  .main {
    margin-bottom: 20px;
  }
</style>