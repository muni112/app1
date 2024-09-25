import{r as l}from"./jsx-runtime-BMrMXMSG.js";import{t as z,s as D,a as A,b as H,d as Y}from"./use-is-after-initial-mount-cGY6M9HE.js";const q=l.createContext(null),U=l.createContext(null);function G(i){return z[i]}function J(){const i=l.useContext(q);if(!i)throw new Error("No theme was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");return i}function K(){const i=l.useContext(U);if(!i)throw new Error("No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");return i}function b(i,t,e){let n,s,c,a,r,u,h=0,I=!1,f=!1,w=!0;const v=!t&&t!==0;if(typeof i!="function")throw new TypeError("Expected a function");const m=t||0;typeof e=="object"&&(I=!!e.leading,f="maxWait"in e,c=f?Math.max(Number(e.maxWait)||0,m):void 0,w="trailing"in e?!!e.trailing:w);function p(o){const d=n,k=s;return n=void 0,s=void 0,h=o,a=i.apply(k,d),a}function g(o,d){return v?(cancelAnimationFrame(r),requestAnimationFrame(o)):setTimeout(o,d)}function E(o){if(v)return cancelAnimationFrame(o);clearTimeout(o)}function L(o){return h=o,r=g(y,m),I?p(o):a}function O(o){const d=o-u,k=o-h,B=m-d;return f&&c?Math.min(B,c-k):B}function N(o){const d=o-u,k=o-h;return u===void 0||d>=m||d<0||f&&c&&k>=c}function y(){const o=Date.now();if(N(o))return R(o);r=g(y,O(o))}function R(o){return r=void 0,w&&n?p(o):(n=s=void 0,a)}function W(){r!==void 0&&E(r),h=0,n=u=s=r=void 0}function F(){return r===void 0?a:R(Date.now())}function M(){return r!==void 0}function S(...o){const d=Date.now(),k=N(d);if(n=o,s=this,u=d,k){if(r===void 0)return L(u);if(f)return r=g(y,m),p(u)}return r===void 0&&(r=g(y,m)),a}return S.cancel=W,S.flush=F,S.pending=M,S}class T{static get zero(){return new T}constructor({top:t=0,left:e=0,width:n=0,height:s=0}={}){this.top=t,this.left=e,this.width=n,this.height=s}get center(){return{x:this.left+this.width/2,y:this.top+this.height/2}}}function x(i){if(!(i instanceof Element))return new T({width:window.innerWidth,height:window.innerHeight});const t=i.getBoundingClientRect();return new T({top:t.top,left:t.left,width:t.width,height:t.height})}const C=1e3/60;class V{constructor(t){this.stickyItems=[],this.stuckItems=[],this.container=null,this.topBarOffset=0,this.handleResize=b(()=>{this.manageStickyItems()},C,{leading:!0,trailing:!0,maxWait:C}),this.handleScroll=b(()=>{this.manageStickyItems()},C,{leading:!0,trailing:!0,maxWait:C}),t&&this.setContainer(t)}registerStickyItem(t){this.stickyItems.push(t)}unregisterStickyItem(t){const e=this.stickyItems.findIndex(({stickyNode:n})=>t===n);this.stickyItems.splice(e,1)}setContainer(t){this.container=t,P(t)&&this.setTopBarOffset(t),this.container.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleResize),this.manageStickyItems()}removeScrollListener(){this.container&&(this.container.removeEventListener("scroll",this.handleScroll),window.removeEventListener("resize",this.handleResize))}manageStickyItems(){if(this.stickyItems.length<=0)return;const t=this.container?$(this.container):0,e=x(this.container).top+this.topBarOffset;this.stickyItems.forEach(n=>{const{handlePositioning:s}=n,{sticky:c,top:a,left:r,width:u}=this.evaluateStickyItem(n,t,e);this.updateStuckItems(n,c),s(c,a,r,u)})}evaluateStickyItem(t,e,n){var g;const{stickyNode:s,placeHolderNode:c,boundingElement:a,offset:r,disableWhenStacked:u}=t;if(u&&D().matches)return{sticky:!1,top:0,left:0,width:"auto"};const h=r?this.getOffset(s)+parseInt(A.space["space-500"],10):this.getOffset(s),I=e+h,f=c.getBoundingClientRect().top-n+e,w=n+h,v=c.getBoundingClientRect().width,m=c.getBoundingClientRect().left;let p;if(a==null)p=I>=f;else{const E=s.getBoundingClientRect().height||((g=s.firstElementChild)==null?void 0:g.getBoundingClientRect().height)||0,L=a.getBoundingClientRect().bottom-E+e-n;p=I>=f&&I<L}return{sticky:p,top:w,left:m,width:v}}updateStuckItems(t,e){const{stickyNode:n}=t;e&&!this.isNodeStuck(n)?this.addStuckItem(t):!e&&this.isNodeStuck(n)&&this.removeStuckItem(t)}addStuckItem(t){this.stuckItems.push(t)}removeStuckItem(t){const{stickyNode:e}=t,n=this.stuckItems.findIndex(({stickyNode:s})=>e===s);this.stuckItems.splice(n,1)}getOffset(t){if(this.stuckItems.length===0)return 0;let e=0,n=0;const s=this.stuckItems.length,c=x(t);for(;n<s;){const a=this.stuckItems[n].stickyNode;if(a!==t){const r=x(a);j(c,r)||(e+=x(a).height)}else break;n++}return e}isNodeStuck(t){return this.stuckItems.findIndex(({stickyNode:n})=>t===n)>=0}setTopBarOffset(t){const e=t.querySelector(`:not(${H.selector}) ${Y.selector}`);this.topBarOffset=e?e.clientHeight:0}}function P(i){return i===document}function $(i){return P(i)?document.body.scrollTop||document.documentElement.scrollTop:i.scrollTop}function j(i,t){const e=i.left,n=i.left+i.width,s=t.left;return t.left+t.width<e||n<s}const Z=l.createContext(void 0),_=l.createContext(void 0);class tt extends l.PureComponent{componentDidMount(){this.attachListener()}componentDidUpdate({passive:t,...e}){this.detachListener(e),this.attachListener()}componentWillUnmount(){this.detachListener()}render(){return null}attachListener(){const{event:t,handler:e,capture:n,passive:s}=this.props;window.addEventListener(t,e,{capture:n,passive:s})}detachListener(t){const{event:e,handler:n,capture:s}=t||this.props;window.removeEventListener(e,n,s)}}const et=l.createContext(void 0),nt=l.createContext(void 0);export{tt as E,_ as M,et as P,T as R,V as S,U as T,nt as a,q as b,Z as c,b as d,x as e,J as f,G as g,K as u};
