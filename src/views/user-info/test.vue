<template>
  <div class="sectionRight">
    <span class="numberInit" style="display: none">{{ num1 }}</span>
    <p class="numberGrow numberGrow1">{{ formatNum1 }}</p>
    <p class="sectionTxt">抵御攻击</p>
  </div>
</template>

<script>
export default {
  computed: {
    formatNum1 () {
      let num = this.animatedNum1
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
  },
  data () {
    return {
      num1: 0,
      animatedNum1: 0
    }
  },
  watch: {
    num1: function (newValue, oldValue) {
      var vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 5000)
        .onUpdate(function () {
          vm.animatedNum1 = this.tweeningNumber.toFixed(0)
          //toFixed(num):num代表小数点后几位
        })
        .start()
      animate()
    }
  },
  methods: {
    setAnimatedNum () {
      this.num1 = 3567892881
    },
    handleScroll () {
      let windowH = document.body.clientHeight
      let docSrollTop = $(document).scrollTop() //文档卷动值
      let clientH = $(window).height() //视窗大小
      let sectionTop = $(".sectionBody").offset().top //动态文字模块距离文档头部的距离
      let sectionH = $(".sectionBody").height()
      if ((docSrollTop + clientH - sectionTop) >= 0
        && (docSrollTop - sectionTop - sectionH) <= 0) {
        this.setAnimatedNum()
      }
    }
  },
  mounted () {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
</style>