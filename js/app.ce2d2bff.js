(function(e){function t(t){for(var n,i,s=t[0],o=t[1],c=t[2],d=0,m=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&m.push(a[i][0]),a[i]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);u&&u(t);while(m.length)m.shift()();return l.push.apply(l,c||[]),r()}function r(){for(var e,t=0;t<l.length;t++){for(var r=l[t],n=!0,s=1;s<r.length;s++){var o=r[s];0!==a[o]&&(n=!1)}n&&(l.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},l=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/game-memory/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],o=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=o;l.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app",class:{playing:e.isStartedGame},attrs:{id:"app"}},[r("header",{staticClass:"header"},[r("h1",{staticClass:"header__title"},[e._v("Игра Память")]),r("a",{staticClass:"link",attrs:{href:"https://github.com/ufaboy/game-memory"}},[e._v("Ссылка на проект")]),r("span",{staticClass:"timer"},[e._v(e._s(e.timerFormat(e.interval)))])]),r("main",{staticClass:"main"},[r("div",{staticClass:"field"},e._l(e.cellArray,(function(t,n){return r("div",{key:n,staticClass:"cell",class:{opened:!1===t.hide,closed:!0===t.hide},on:{click:function(t){return e.openCell(n)}}},[e._v(" "+e._s(t.hide?"":t.value)+" ")])})),0),r("section",{staticClass:"action-panel"},[r("label",{staticClass:"label"},[e._v("Привет я игра Memory, а как тебя зовут?")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.playerName,expression:"playerName"}],staticClass:"input",attrs:{type:"text",placeholder:"Choosen One",autofocus:""},domProps:{value:e.playerName},on:{input:function(t){t.target.composing||(e.playerName=t.target.value)}}}),r("button",{staticClass:"btn",on:{click:e.startGame}},[e._v(e._s(e.isStartedGame?"Стоп":"Старт"))])]),e.allCellsOpened?r("table",{staticClass:"table"},[r("caption",[e._v("Result Table")]),e._m(0),r("tbody",e._l(e.resultArray,(function(t,n){return r("tr",{key:"user-"+n},[r("td",[e._v(e._s(t.name))]),r("td",[e._v(e._s(e.timerFormat(t.time)))])])})),0)]):e._e()])])},l=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",{staticClass:"thead"},[r("tr",[r("th",[e._v("Name")]),r("th",[e._v("Time")])])])}],i=r("2909"),s=r("1da1"),o=r("5530"),c=(r("96cf"),r("c740"),r("a630"),r("3ca3"),r("99af"),r("2f62")),u={name:"App",components:{},data:function(){return{playerName:"",resetCellTimer:null,intervalId:null,interval:null,countSeconds:5,cellArray:[],firstCell:null,secondCell:null}},computed:Object(o["a"])(Object(o["a"])({allCellsOpened:function(){return-1===this.cellArray.findIndex((function(e){return e.hide}))}},Object(c["c"])(["isStartedGame"])),Object(c["b"])(["resultArray"])),created:function(){this.setNewRandomArray()},watch:{allCellsOpened:function(e){e&&(clearInterval(this.intervalId),this.$store.dispatch("setFinishGame",{name:this.playerName?this.playerName:"ноунейм",time:this.interval}))}},methods:{startGame:function(){var e=this;this.isStartedGame?this.resetGame():(this.setNewRandomArray(),this.interval=new Date(0),this.intervalId=setInterval((function(){return e.interval=new Date(e.interval.getTime()+1e3)}),1e3),this.$store.dispatch("setStartedGame"))},openCell:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t.isStartedGame&&!t.secondCell&&!t.allCellsOpened){r.next=2;break}return r.abrupt("return",!1);case 2:if(null!==t.firstCell){r.next=8;break}t.firstCell=e,t.cellArray[e].hide=!1,t.setTimer(e),r.next=16;break;case 8:if(null!==t.secondCell){r.next=15;break}clearTimeout(t.resetCellTimer),t.secondCell=e,t.cellArray[e].hide=!1,t.checkCells(t.firstCell,e),r.next=16;break;case 15:return r.abrupt("return",!1);case 16:case"end":return r.stop()}}),r)})))()},checkCells:function(e,t){var r=this,n=this.cellArray[e].value===this.cellArray[t].value;n?(this.firstCell=null,this.secondCell=null):setTimeout((function(){r.cellArray[e].hide=!0,r.cellArray[t].hide=!0,r.firstCell=null,r.secondCell=null,clearTimeout(r.resetCellTimer)}),1e3)},setTimer:function(e){var t=this;this.resetCellTimer=setTimeout((function(){t.cellArray[e].hide=!0,t.firstCell=null,t.secondCell=null}),1e3*this.countSeconds)},setNewRandomArray:function(){this.cellArray=this.calcRandomArray()},calcRandomArray:function(){for(var e=Array.from({length:18},(function(e,t){return{value:++t,hide:!0}})),t=[].concat(Object(i["a"])(e),Object(i["a"])(JSON.parse(JSON.stringify(e)))),r=t.length-1;r>0;r--){var n=Math.floor(Math.random()*(r+1)),a=[t[n],t[r]];t[r]=a[0],t[n]=a[1]}return t},resetGame:function(){clearInterval(this.intervalId),this.firstCell=null,this.interval=null,this.intervalId=null,this.secondCell=null,this.setNewRandomArray(),this.$store.commit("setStoppedGame")},timerFormat:function(e){return e?e.toLocaleTimeString("en-UK",{timeZone:"UTC",hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}):"00:00:00"}}},d=u,m=(r("5c0b"),r("2877")),f=Object(m["a"])(d,a,l,!1,null,null,null),p=f.exports;r("4e82");n["a"].use(c["a"]);var h=new c["a"].Store({state:{isStartedGame:!1,resultArray:[]},mutations:{setStartedGame:function(e){e.isStartedGame=!0},setStoppedGame:function(e){e.isStartedGame=!1},setUser:function(e,t){e.resultArray.push(t)}},actions:{setStartedGame:function(e){var t=e.commit;t("setStartedGame")},setFinishGame:function(e,t){var r=e.commit;r("setStoppedGame"),r("setUser",t)}},getters:{resultArray:function(e){return e.resultArray.sort((function(e,t){return e.time-t.time}))}}});n["a"].config.productionTip=!1,new n["a"]({store:h,render:function(e){return e(p)}}).$mount("#app")},"5c0b":function(e,t,r){"use strict";r("9c0c")},"9c0c":function(e,t,r){}});
//# sourceMappingURL=app.ce2d2bff.js.map