<template>
<div id="app">
    <Index/>
</div>
</template>

<script>
import Index from './components/Index.vue'


export default {
  name: 'app',
   components: {
    Index
  }
}
</script>

<style lang="scss">
$bgcolor:#000;
$wrap-bgcolor:#171A23;
$txt-color:#BFC0C4;

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

html,body{
    margin: 0;
    padding: 0;
    background: $bgcolor;
    -webkit-text-size-adjust:none;
}

ol, ul {
	list-style: none;
    margin: 0;
    padding: 0;
}



#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $txt-color;
  width: 500px;
}



@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_993279_cmtc5qmouu.eot?t=1546274059535'); /* IE9*/
  src: url('//at.alicdn.com/t/font_993279_cmtc5qmouu.eot?t=1546274059535#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('//at.alicdn.com/t/font_993279_cmtc5qmouu.ttf?t=1546274059535') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_993279_cmtc5qmouu.svg?t=1546274059535#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-iconset0174:before { content: "\e649"; }

.icon-Screen-Rotation:before { content: "\eb0a"; }



</style>
