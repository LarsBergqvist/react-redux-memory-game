(this["webpackJsonpreact-redux-memory-game"]=this["webpackJsonpreact-redux-memory-game"]||[]).push([[0],{16:function(n,e,t){},22:function(n,e,t){"use strict";t.r(e);t(0);var r=t(2),i=t.n(r),c=(t(16),t(11)),a="FLIP_UP_CARD",s="SHUFFLE_CARDS",d="CHECK_UNMATCHED_PAIR",u="CHECK_MATCHED_PAIR",o="MARK_PAIR_AS_MATCHED",m="FLIP_DOWN_PAIR",l="INIT_GAME",j="GENERATE_PAIRS",h="SHOW_NUM_CARDS_SELECTION";function g(n){return{type:j,numPairs:n}}function f(n){return{type:l,numPairs:n}}function b(n,e){return{type:m,id1:n,id2:e}}function O(n,e){return{type:o,id1:n,id2:e}}function p(){return{type:d}}function C(){return{type:u}}function v(){return{type:s}}var N=t(9),I=t.n(N);function x(n){for(var e=[],t=1,r=1;r<=n;r++){var i={id:t,image:r,imageUp:!1,matched:!1},c={id:++t,image:r,imageUp:!1,matched:!1};e.push(i),e.push(c),t++}return e}function S(n,e){return e.find((function(e){return e.id===n}))}function k(n,e,t){return S(n,t).image===S(e,t).image}var _={turnNo:1,pairsFound:0,numClicksWithinTurn:0,firstId:void 0,secondId:void 0,gameComplete:!1,showNumCardsSelection:!1,cards:[]};function w(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0;switch(e.type){case a:return n.map((function(n){return e.id===n.id?Object.assign({},n,{imageUp:!0}):n}));case o:return n.map((function(n){return e.id1===n.id||e.id2===n.id?Object.assign({},n,{matched:!0}):n}));case m:return n.map((function(n){return e.id1===n.id||e.id2===n.id?Object.assign({},n,{imageUp:!1}):n}));case j:return x(e.numPairs);case s:var t=Object(c.a)(n);return t=I()(t);default:return n}}var E=function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:return Object.assign({},_,{showNumCardsSelection:!0});case j:return Object.assign({},_,{cards:w(_.cards,g(t.numPairs))});case l:var r=w(_.cards,g(t.numPairs));return Object.assign({},_,{showNumCardsSelection:!1,cards:w(r,v())});case d:return 2!==e.numClicksWithinTurn||k(e.firstId,e.secondId,e.cards)?e:Object.assign({},e,{numClicksWithinTurn:0,firstId:void 0,secondId:void 0,turnNo:e.turnNo+1,cards:w(e.cards,b(e.firstId,e.secondId))});case u:if(2===e.numClicksWithinTurn&&k(e.firstId,e.secondId,e.cards)){var i=e.pairsFound+1,c=!1;return i===e.cards.length/2&&(c=!0),Object.assign({},e,{pairsFound:i,turnNo:e.turnNo+1,numClicksWithinTurn:0,gameComplete:c,cards:w(e.cards,O(e.firstId,e.secondId))})}return e;case a:var o=S(t.id,e.cards);if(o.imageUp||o.matched)return e;if(2===e.numClicksWithinTurn){var m=n(e,C()),f=n(m,p());return Object.assign({},f,{firstId:t.id,numClicksWithinTurn:1},{cards:w(f.cards,t)})}var N=e.firstId,I=e.secondId;0===e.numClicksWithinTurn?N=t.id:I=t.id;var x=e.numClicksWithinTurn+1;return Object.assign({},e,{firstId:N,secondId:I,numClicksWithinTurn:x,cards:w(e.cards,t)});case s:return Object.assign({},e,{cards:w(e.cards,t)});default:return e}},T=t(3),A=t(4),P=t(10),y=(t(8),t(1)),F=function(n){var e="".concat(window.location.href,"/images/").concat(n.image,".jpg"),t="".concat(window.location.href,"/images/back.jpg"),r="card flip-card";n.matched&&(r+=" matched");var i=r+" animate";return Object(y.jsx)("div",{onClick:function(){n.matched||n.imageUp||n.onClick(n.id)},className:n.imageUp?i:r,children:Object(y.jsxs)("div",{className:"flip-card-inner",children:[Object(y.jsx)("div",{className:"flip-card-front",children:Object(y.jsx)("img",{src:"".concat(t),draggable:"false",alt:""})}),Object(y.jsx)("div",{className:"flip-card-back",children:Object(y.jsx)("img",{src:"".concat(e),draggable:"false",alt:""})})]})})},R=function(n){return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("div",{children:"Select number of cards for new game"}),Object(y.jsxs)("div",{className:"num-cards-button-container",children:[Object(y.jsx)("button",{onClick:function(){return n.onInitGame(3)},children:6}),Object(y.jsx)("button",{onClick:function(){return n.onInitGame(5)},children:10}),Object(y.jsx)("button",{onClick:function(){return n.onInitGame(10)},children:20})]})]})},U=function(n){return n.gameComplete?Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("div",{children:"GAME COMPLETE!"}),Object(y.jsxs)("div",{children:["You used ",n.turnNo-1," turns"]}),Object(y.jsx)("div",{children:Object(y.jsx)("button",{className:"game-button",onClick:n.onShowNumCardsSelection,children:"Play again?"})})]}):Object(y.jsxs)(y.Fragment,{children:[Object(y.jsxs)("div",{children:["Turn: ",n.turnNo,"   Pairs found: ",n.pairsFound]}),Object(y.jsx)("button",{className:"game-button",onClick:n.onShowNumCardsSelection,children:"Restart game"})]})},W=null,M=Object(T.b)((function(n){return{cards:n.cards,turnNo:n.turnNo,gameComplete:n.gameComplete,pairsFound:n.pairsFound,showNumCardsSelection:n.showNumCardsSelection}}),(function(n){return{onCardClicked:function(e){clearInterval(W),n(function(n){return{type:a,id:n}}(e)),n(C()),W=setTimeout((function(){n(p())}),4e3)},onShowNumCardsSelection:function(){n({type:h})},onInitGame:function(e){n(f(e))}}}))((function(n){var e=n.cards.map((function(e){return Object(y.jsx)(F,{id:e.id,image:e.image,imageUp:e.imageUp,matched:e.matched,onClick:n.onCardClicked},e.id)})),t=void 0;return t=n.showNumCardsSelection?Object(y.jsx)(R,{onInitGame:n.onInitGame}):Object(y.jsx)(U,{gameComplete:n.gameComplete,turnNo:n.turnNo,pairsFound:n.pairsFound,onShowNumCardsSelection:n.onShowNumCardsSelection}),Object(y.jsxs)("div",{className:"game",children:[Object(y.jsx)("header",{className:"game-header",children:Object(y.jsx)("div",{className:"game-title",children:"A Memory game in React with Redux"})}),Object(y.jsx)("div",{className:"game-status",children:t}),Object(y.jsx)("div",{className:"card-container",children:e})]})})),D=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||A.b,G=Object(A.c)(E,D(Object(A.a)(P.a)));G.dispatch(f(10)),i.a.render(Object(y.jsx)(T.a,{store:G,children:Object(y.jsx)(M,{})}),document.getElementById("root"))},8:function(n,e,t){}},[[22,1,2]]]);
//# sourceMappingURL=main.7199ec7c.chunk.js.map