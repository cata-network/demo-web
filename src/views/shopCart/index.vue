<template>
  <div id="app">

    <div id="container">
      <section id="balloon" class="page">

        <section id="drawBalloon" class="page">

          <div id="draw-wrap">
            <canvas id="canvas" width="520" height="520"></canvas>
            <div id="wire" ></div>
          </div>

          <ul id="colors">
            <li>0050a1</li>
            <li>02a1e3</li>
            <li>abdced</li>
            <li>ef790b</li>
            <li>f8bc28</li>
            <li>96c730</li>
            <li>d3e6ba</li>
            <li>f79ab5</li>
            <li>e1147f</li>
            <li>ffff00</li>
            <li>a1488e</li>
            <li>ee0000</li>
            <li>4d9b46</li>
            <li>ffffff</li>
          </ul>
        </section>

      </section>
    </div>

    <div id="oparea">
      <el-button type="success" @click="export_img()" class="button1" :disabled="button_finish"> Save </el-button>
      <br/>
      <el-button type="primary" @click="select_img()" class="button1">New templet</el-button>
    </div>


  </div>


</template>

<script>


export default {
  name: "shop-cart",
  data() {
    return {
      button_finish:0,
      templet_info:{},
      email:localStorage.getItem('email'),
      token:localStorage.getItem('token'),
      tag:"Natural Vientiane", //默认图片的tag和标题
      title:"Seamless design of hand painted rose",
      templet_id:"xuntu_1"
    }
  },
  mounted() {
    //加载完成
    //this.createPlayer();//顺序执行
    // 获取数据
    //this.fetchData(this.source);
    console.log("myCanvas", "hello worlds");

    $(function() {
      var chooseColor;
      var myCanvas = document.getElementById("canvas");
      console.log("myCanvas", myCanvas);
      var ctx = myCanvas.getContext("2d");


      var image = new Image();
      //image.crossOrigin = "Anonymous";
      image.setAttribute('crossOrigin', 'Anonymous');

      image.onload = function() {
        ctx.drawImage(image, 0, 0)
      };

      //image.src = "https://chia1-1300721637.cos.ap-shanghai.myqcloud.com/img/sample/e5b74707ac3d6d9bd9b2d7719871d445.jpeg";
      //image.src = "https://chia1-1300721637.cos.ap-shanghai.myqcloud.com/img/snap_bin/xuntu_489783.jpg"
      image.src = 'https://chia1-1300721637.cos.ap-shanghai.myqcloud.com/img/sample/cat1.jpg'
      $("#wire").on("click", function(e) {
        if (!chooseColor) {
          alert("Please select one color to fill");
          return false
        }
        e = e.originalEvent || e;
        var wireOffset = $(this).offset();
        var left = Math.floor(e.pageX - wireOffset.left);
        var top = Math.floor(e.pageY - wireOffset.top);
        var imgData = ctx.getImageData(left, top, 1, 1);
        var colorArr = imgData.data;
        if (colorArr[0] === 0 && colorArr[1] === 0 && colorArr[2] === 0 && colorArr[3] === 0) {
          alert("Can't fill in this point");
          return false
        }
        //判断是否点在线条上
        if(colorArr[0] < 50 && colorArr[1] < 50 && colorArr[2] < 50 && colorArr[3] === 255){
          alert("Can't fill in line");
          return false
        }
        var fillColor = hexToRgb(chooseColor).split(",");
        fillColor.push(255);
        floodFillLinear(myCanvas, left, top, fillColor, 80);
      });



      $("#colors").on("click", "li:not(.checked)", function() {
        $(this).addClass("checked").siblings(".checked").removeClass("checked");
        chooseColor = $(this).html()
      });

    });
  },
  methods: {
    export_img() {
      this.button_finish = 1; //button禁用


      console.log("export image");
      var canvas = document.querySelector('#canvas');
      var strDataURI = canvas.toDataURL();//base64图片内容
      //console.log("image data", strDataURI);

      //上传图片
      var fileData = new FormData();
      fileData.append("email", this.email);
      fileData.append("pic", strDataURI);
      fileData.append("tag", this.tag);
      fileData.append("title", this.title);
      fileData.append("templet_id", this.templet_id);



      axios
              .post('http://rest.cata.show/user_operation/upload_pic', fileData)
              .then((res)=>{
                        console.log(res.data)
                        this.button_finish = 0; //button1启用

                        //线上提示符
                        this.$message({
                          'message':'Upload success! You could find your pic in "My work" tab',
                          type: 'success'});
                      }
              )


    },

    select_img() {
      var myCanvas = document.querySelector('#canvas');
      var ctx = myCanvas.getContext("2d");

      var image = new Image();
      image.setAttribute('crossOrigin', 'Anonymous');

      image.onload = function() {
        ctx.drawImage(image, 0, 0)
      };
      axios
              .get('http://rest.cata.show/Img_templet/get_random_img')
              .then((res)=>{
                        //console.log(res.data)
                        this.templet_info = res.data.result[0];
                        image.src = this.templet_info.snap_bin;
                        this.tag = this.templet_info.new_tag_en;
                        this.title = this.templet_info.title_en;
                        this.templet_id = this.templet_info.pic_id;


                      }
              )

    },

}
}
</script>


<style lang="css" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
    display: flex;
  }

  #drawBalloon{
    background:url(/public/bg.jpg) no-repeat 0 0;
  }

  #container {
    width:650px;
    /*margin:0 auto;*/
    position:relative;
    overflow-x:hidden;
    font-size:1.2em;
    height:760px;
  }

  #oparea {
    width:100px;
    /*margin:0 auto;*/
    position:relative;
    font-size:1.2em;
    /*height:760px;*/
    margin-top: 580px;
    margin-left: 30px;
  }

  .button1 {
    width:130px;
    height:40px;
    margin-top: 10px;
  }

  .page{
    width:100%;
    min-height:100%;
    position: absolute;
    top: 0;
    left:0;
    -webkit-transform: translate3d(0,0,0); /*激活GPU 3D加速*/
    transform: translate3d(0,0,0);
    -webkit-backface-visibility:hidden;
    backface-visibility:hidden;
    -webkit-transform-style:preserve-3d;
    transform-style:preserve-3d;
  }

  #draw-wrap {
    width:520px;
    height:520px;
    position:absolute;
    top:10px;
    left:60px;
  }


  #canvas, #wire {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
  }

  /* 添彩 */
  #colors {
    background-color:#fff;
    border-radius:29px;
    padding:8px;
    position:absolute;
    left:30px;
    top:540px;
    width:560px;
    z-index:10;
  }
  #colors > li {
    width:64px;
    height:64px;
    margin:8px 6px;
    border-radius:50%;
    float:left;
    overflow:hidden;
    text-indent:-9999px;
  }
  #colors > li:nth-child(1) {
    background:#0050a1;
  }
  #colors > li:nth-child(2) {
    background:#02a1e3;
  }
  #colors > li:nth-child(3) {
    background:#abdced;
  }
  #colors > li:nth-child(4) {
    background:#ef790b;
  }
  #colors > li:nth-child(5) {
    background:#f8bc28;
  }
  #colors > li:nth-child(6) {
    background:#96c730;
  }
  #colors > li:nth-child(7) {
    background:#d3e6ba;
  }
  #colors > li:nth-child(8) {
    background:#f79ab5;
  }
  #colors > li:nth-child(9) {
    background:#e1147f;
  }
  #colors > li:nth-child(10) {
    background:#ffff00;
  }
  #colors > li:nth-child(11) {
    background:#a1488e;
  }
  #colors > li:nth-child(12) {
    background:#ee0000;
  }
  #colors > li:nth-child(13) {
    background:#4d9b46;
  }
  #colors > li:nth-child(14) {
    background:#ffffff;
    border:solid 3px #0050a1;
  }
  #colors > li.checked {
    background-image:url(/public/color_checked.png);
    background-repeat:no-repeat;
    background-position:0 0;
  }


</style>
