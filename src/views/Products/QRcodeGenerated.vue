<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
          <header class="jumbotron">
            <div class="container">

              <h1 class="text-center">
              QR Code Generator
              </h1>
            </div>
          </header>
          <section class="container">
            <b-row>
            <b-col sm="6">
                <form action="" id="form">
                  <div class="mb-3">
                    <label style="color: red;float: left;"><span style="color: red">* </span>Add Your Domain</label>
                    <b-form-input
                      v-model="domain"
                      placeholder="Enter Your Domain"
                          required

                    ></b-form-input>
                  </div>
                  <label for="input-text" style="display: none;">Enter some text below to generate QR code:</label>
                    <input type="text" style="display: none;" class="form-control" placeholder="Enter any text" name="input-text" required autocomplete="off" id="input-text" oninput="setCustomValidity('')">
                  <div class="text-center">
                  <button type="submit" v-on:click="onChange()" class="btn btn-primary mt-3 align-center qr-coder-submit">Submit</button>
                  </div>
                </form>
              </b-col>
              <b-col sm="6">
                <section class="qr-coder" >
                  <div id="printMe">
                    <img  style="height: 30rem;" id="qr-code" src="" alt="" class="mx-auto d-block image-qrcoder">
                    <canvas id="img-canvas" class="d-none" width="150" height="150"></canvas>
                  </div>
                  <div class="d-none export-div justify-content-around"   id="result">
                    <p id="qr-code-for" style="display: none;" class="mr-auto"></p>
                    <a type="button" class="btn btn-primary export-qrcode" id="download">
                      Export
                    </a>
                    <a type="button" @click="print" class="btn btn-primary export-qrcode" id="download">
                      Print
                    </a>
                  </div>
                </section>
              </b-col>
            </b-row>
            </section>
  
      </b-col>
    </b-row>
    </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
export default {
  name: 'GenerateQRcode',
  components: {  },
  created () {
    //
  },
  mounted () {
    core.index()
    const textEl = document.getElementById('input-text');
    const formEl = document.getElementById('form');
    const qrCodeEl = document.getElementById('qr-code');
    const qrCodeForEl = document.getElementById('qr-code-for');
    const resultEl = document.getElementById('result');
    const downloadBtn = document.getElementById('download');
    const canvasEl = document.getElementById("img-canvas");
    const ctx = canvasEl.getContext("2d");
    const MIME_TYPE = "image/png";

    const URL = "https://quickchart.io/qr?text=";

    window.onload = function() {
      textEl.focus();
    };

    form.addEventListener('submit', generateQRCode);

    function generateQRCode(e) {
      //reset qr code
      qrCodeEl.src = '';
      qrCodeEl.alt = '';
      qrCodeForEl.innerHTML = '';
      resultEl.classList.remove('d-flex');
      resultEl.classList.add('d-none');
      //prevent default
      e.preventDefault();
      if(textEl.value == "" || textEl.value == null) return;
      let reg = new RegExp(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g);
      let res = reg.test(textEl.value);
      if(res == true) {
        textEl.setCustomValidity("Invalid field value.");
        textEl.reportValidity();
        return;
      }
      let input = encodeURI(textEl.value);
      //create qr code
      let qrcodeUrl = URL+input;
      //set qr code and heading
      qrCodeForEl.innerHTML = `QR Code Generated for: <strong>${textEl.value}</strong>`;
      resultEl.classList.remove('d-none');
      resultEl.classList.add('d-flex');
      downloadBtn.addEventListener("click", download);
      qrCodeEl.src = qrcodeUrl;
      qrCodeEl.alt = textEl.value ;
      qrCodeEl.setAttribute('crossorigin', 'anonymous')
      //clear input
      textEl.value = null;
      //focus input
      textEl.focus();
    }

    function download() {
      let random = (Math.random() * 10000).toString(36).substring(0) 

      ctx.drawImage(qrCodeEl, 0, 0);
      var imgBase64 = canvasEl.toDataURL();
      var imgURL = "data:image/" + imgBase64;
      var dlLink = document.createElement('a');
      dlLink.download = random + random + random + '.png';
      dlLink.href = imgURL;
      dlLink.dataset.downloadurl = [MIME_TYPE,      dlLink.download, dlLink.href].join(':');
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
  }
  },
  watch: {
    currentPage: {
      handler: function () {
        //
      }
    }
  },
  data () {
    return {
      domain:'',
    }
  },
  methods: {
    onChange(){
      document.getElementById('input-text').value = this.domain +'/product/show/' + this.$route.params.id
    },
    async print () {
      // Pass the element id here
      await this.$htmlToPaper('printMe');
    }
  }
}
</script>
<style>
.custom-btn mr-2 {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-url {
  width: 4rem !important;
  height: 4rem !important;
}
.add {
  margin-bottom: 1rem !important;
}
.submit-button {
  margin: 0.5rem !important;
}
.submit-form {
  float: right;
}
.delete-btn {
  margin-left: 1rem !important;
}
.form-delete {
  margin-left: 11rem;
}
.qr-coder{
  background: #e9ecef;
  color: white;
  height: 30rem;
  border-radius: 1rem;
}
.qr-coder-submit{
    width: 12rem;
    font-size: 1.2rem;
}
.export-qrcode{
    width: 12rem;
    font-size: 1.2rem;
}
.export-div{
  margin-top: 2rem;
  /* margin-left: 11rem; */
}
.image-qrcoder{
  padding: 15%;
}
.mb-3{
  margin-left: 1rem;
} 
</style>
