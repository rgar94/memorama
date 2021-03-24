/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${i}`),n="$lit$";class o{constructor(t,e){this.parts=[],this.element=e;const i=[],o=[],l=document.createTreeWalker(e.content,133,null,!1);let c=0,p=-1,u=0;const{strings:m,values:{length:y}}=t;for(;u<y;){const t=l.nextNode();if(null!==t){if(p++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)a(e[t].name,n)&&i++;for(;i-- >0;){const e=m[u],s=h.exec(e)[2],i=s.toLowerCase()+n,o=t.getAttribute(i);t.removeAttribute(i);const a=o.split(r);this.parts.push({type:"attribute",index:p,name:s,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),l.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,o=e.split(r),l=o.length-1;for(let e=0;e<l;e++){let i,r=o[e];if(""===r)i=d();else{const t=h.exec(r);null!==t&&a(t[2],n)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-n.length)+t[3]),i=document.createTextNode(r)}s.insertBefore(i,t),this.parts.push({type:"node",index:++p})}""===o[l]?(s.insertBefore(d(),t),i.push(t)):t.data=o[l],u+=l}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&p!==c||(p++,e.insertBefore(d(),t)),c=p,this.parts.push({type:"node",index:p}),null===t.nextSibling?t.data="":(i.push(t),p--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=o.pop()}for(const t of i)t.parentNode.removeChild(t)}}const a=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},l=t=>-1!==t.index,d=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function c(t,e){const{element:{content:s},parts:i}=t,r=document.createTreeWalker(s,133,null,!1);let n=u(i),o=i[n],a=-1,l=0;const d=[];let h=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(d.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,n=u(i,n),o=i[n]}d.forEach((t=>t.parentNode.removeChild(t)))}const p=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},u=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(l(e))return s}return-1},m=new WeakMap,y=t=>"function"==typeof t&&m.has(t),_={},g={};class f{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let n,o=0,a=0,d=r.nextNode();for(;o<i.length;)if(n=i[o],l(n)){for(;a<n.index;)a++,"TEMPLATE"===d.nodeName&&(s.push(d),r.currentNode=d.content),null===(d=r.nextNode())&&(r.currentNode=s.pop(),d=r.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(d.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),S=` ${s} `;class b{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",r=!1;for(let o=0;o<t;o++){const t=this.strings[o],a=t.lastIndexOf("\x3c!--");r=(a>-1||r)&&-1===t.indexOf("--\x3e",a+1);const l=h.exec(t);e+=null===l?t+(r?S:i):t.substr(0,l.index)+l[1]+l[2]+n+l[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==v&&(e=v.createHTML(e)),t.innerHTML=e,t}}const w=t=>null===t||!("object"==typeof t||"function"==typeof t),x=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class P{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new C(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!x(t))return t}let i="";for(let r=0;r<e;r++){i+=t[r];const e=s[r];if(void 0!==e){const t=e.value;if(w(t)||!x(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===_||w(t)&&t===this.value||(this.value=t,y(t)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const t=this.value;this.value=_,t(this)}this.value!==_&&this.committer.commit()}}class N{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}const t=this.__pendingValue;t!==_&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof b?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):x(t)?this.__commitIterable(t):t===g?(this.value=g,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof f&&this.value.template===e)this.value.update(t.values);else{const s=new f(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const r of t)s=e[i],void 0===s&&(s=new N(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(r),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class A{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=_}}class E extends P{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends C{}let V=!1;(()=>{try{const t={get capture(){return V=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class k{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=O(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=_}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const O=t=>t&&(V?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function U(t){let e=M.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const r=t.strings.join(s);return i=e.keyString.get(r),void 0===i&&(i=new o(t,t.getTemplateElement()),e.keyString.set(r,i)),e.stringsArray.set(t.strings,i),i}const M=new Map,L=new WeakMap,R=new class{handleAttributeExpressions(t,e,s,i){const r=e[0];return"."===r?new E(t,e.slice(1),s).parts:"@"===r?[new k(t,e.slice(1),i.eventContext)]:"?"===r?[new A(t,e.slice(1),s)]:new P(t,e,s).parts}handleTextExpression(t){return new N(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(t,...e)=>new b(t,e,"html",R),$=(t,e)=>`${t}--${e}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const z=t=>e=>{const i=$(e.type,t);let r=M.get(i);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},M.set(i,r));let n=r.stringsArray.get(e.strings);if(void 0!==n)return n;const a=e.strings.join(s);if(n=r.keyString.get(a),void 0===n){const s=e.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(s,t),n=new o(e,s),r.keyString.set(a,n)}return r.stringsArray.set(e.strings,n),n},q=["html","svg"],F=new Set;window.JSCompiler_renameProperty=(t,e)=>t;const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},W=(t,e)=>e!==t&&(e==e||t==t),B={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:W};class D extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=B){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdateInternal(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||B}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=W){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||H,r="function"==typeof i?i:i.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||H.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=B){const i=this.constructor,r=i._attributeNameForProperty(t,s);if(void 0!==r){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const r=this.constructor;s=s||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}D.finalized=!0;const J=Element.prototype;J.msMatchesSelector||J.webkitMatchesSelector;const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class Q{constructor(t,e){if(e!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const X=(t,...e)=>{const s=e.reduce(((e,s,i)=>e+(t=>{if(t instanceof Q)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1]),t[0]);return new Q(s,K)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Y={};class Z extends D{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight(((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t)),s),s=e(t,new Set),i=[];s.forEach((t=>i.unshift(t))),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!G){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new Q(String(e),K)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Y&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return Y}}Z.finalized=!0,Z.render=(t,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const r=i.scopeName,n=L.has(s),o=j&&11===s.nodeType&&!!s.host,a=o&&!F.has(r),l=a?document.createDocumentFragment():s;if(((t,s,i)=>{let r=L.get(s);void 0===r&&(e(s,s.firstChild),L.set(s,r=new N(Object.assign({templateFactory:U},i))),r.appendInto(s)),r.setValue(t),r.commit()})(t,l,Object.assign({templateFactory:z(r)},i)),a){const t=L.get(l);L.delete(l);((t,e,s)=>{F.add(t);const i=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<n;t++){const e=r[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{q.forEach((e=>{const s=M.get($(e,t));void 0!==s&&s.keyString.forEach((t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{s.add(t)})),c(t,s)}))}))})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:r}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,133,null,!1);let o=u(r),a=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===s&&(a=p(e),s.parentNode.insertBefore(e,s));-1!==o&&r[o].index===l;){if(a>0){for(;-1!==o;)r[o].index+=a,o=u(r,o);return}o=u(r,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),c(s,t)}})(r,l,t.value instanceof f?t.value.template:void 0),e(s,s.firstChild),s.appendChild(l),L.set(s,t)}!n&&o&&window.ShadyCSS.styleElement(s.host)};class tt{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach((e=>t+=e+" ")),this.element.setAttribute("class",t)}}}const et=new WeakMap,st=(it=t=>e=>{if(!(e instanceof C)||e instanceof T||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:s}=e,{element:i}=s;let r=et.get(e);void 0===r&&(i.setAttribute("class",s.strings.join(" ")),et.set(e,r=new Set));const n=i.classList||new tt(i);r.forEach((e=>{e in t||(n.remove(e),r.delete(e))}));for(const e in t){const s=t[e];s!=r.has(e)&&(s?(n.add(e),r.add(e)):(n.remove(e),r.delete(e)))}"function"==typeof n.commit&&n.commit()},(...t)=>{const e=it(...t);return m.set(e,!0),e});var it;window.customElements.define("scoreboard-scs",class extends Z{static get styles(){return X`
      #score {
        height: 200px;
        display: inline;
        font-size: 20px;
      }

      .player1 {
        display: inline;
        padding: 10px;
        border: 2px solid #cbbd05;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }

      .player2 {
        display: inline;
        padding: 10px;
        margin-left: 200px;
        border: 2px solid #cbbd05;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }

      .score1 {
        width: 100px;
        padding: 10px;
        display: inline;
        border: 2px solid #cbbd05;
        background-color: #6e383e;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }

      .score2 {
        width: 100px;
        font-size: 20px;
        padding: 10px;
        display: inline;
        border: 2px solid #cbbd05;
        background-color: #6e383e;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }

      h2 {
        display: inline;
      }

      .turn1 .player1 {
        background-color: #5e8c1a;
        box-shadow: 0 0 30px 20px #f3db8f;
      }

      .turn2 .player2 {
        background-color: #5e8c1a;
        box-shadow: 0 0 30px 20px #f3db8f;
      }
    `}static get properties(){return{turn:{type:Number}}}constructor(){super(),this.turn=1}render(){return I`
      <div id='score' class='turn${this.turn}'>
        <div class='player1'>
          <h2>Player 1</h2>
        </div>
        <slot name="player1" class='score1'></slot>
      </div>
      <div id='score' class='turn${this.turn}'>
        <div class='player2'>
          <h2>Player 2</h2>
        </div><slot name="player2" class='score2'></slot>
        </div>
      </div>
      `}}),window.customElements.define("card-scs",class extends Z{static get styles(){return X`
      button {
        height: 100px;
        width: 100px;
        border: 2px solid #cbbd05;
        border-radius: 20px;
        background-color: #5e8c1a;
        font-size: 40px;
      }

      button:hover {
        box-shadow: 0 0 30px #00aeff;
      }

      #value {
        font-size: 1em;
        cursor: not-allowed;
      }

      .hide {
        display: none;
      }
    `}static get properties(){return{symbol:{type:Array},isPlayed:{type:Boolean},valueClass:Object,unknownClass:Object,hideClass:Object}}__onClick(){this.isPlayed=!0,this.valueClass={hide:!this.isPlayed},this.unknownClass={hide:this.isPlayed}}constructor(){super(),this.isPlayed=!1,this.valueClass={hide:!this.isPlayed}}updated(){this.addEventListener("incorrect",(()=>{this.isPlayed=!1,this.valueClass={hide:!this.isPlayed},this.unknownClass={hide:this.isPlayed}})),this.addEventListener("correct",(()=>{this.hideClass={hide:!0}}))}render(){return I`
      <div>
        <button @click="${this.__onClick}" class="${st(this.hideClass)}">
          <div id="unknown" class="${st(this.unknownClass)}">❔</div>
          <div id="value" class="${st(this.valueClass)}">
            ${this.symbol}
          </div>
        </button>
      </div>
      <slot></slot>
    `}}),window.customElements.define("memorama-game",class extends Z{static get styles(){return X`
      :host {
        color: #f5f5f5;
      }

      h1 {
        text-align: center;
      }

      .board {
        height: fit-content;
        min-height: 500px;
        width: 900px;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px 160px;
        font-size: 50px;
        background-image: url('https://i.ebayimg.com/00/s/Njg5WDEwMjQ=/z/RoYAAOSwPK5Zga-X/$_57.JPG?set_id=8800005007');
        background-size: cover;
        padding: 30px;
        border-radius: 20px;
        margin-top: 20px;
      }

      .score {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      .center {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}static get properties(){return{cardArray:{type:Array,value:[]},turn:{type:Number},score:{type:Object},opened:{type:Array},cardList:{type:Array},currentIndex:{type:Number},temporaryValue:{type:String},randomIndex:{type:Number}}}__randomizer(){this.__sortCards(),this.cardArray=this.cardList.map((t=>({value:t,isOpen:!1})))}__sortCards(){for(this.currentIndex=this.cardList.length;0!==this.currentIndex;)this.randomIndex=Math.floor(Math.random()*this.currentIndex),this.currentIndex-=1,this.temporaryValue=this.cardList[this.currentIndex],this.cardList[this.currentIndex]=this.cardList[this.randomIndex],this.cardList[this.randomIndex]=this.temporaryValue;return this.cardList}__startGame(){this.__randomizer(),this.turn=1,this.score={1:0,2:0},this.opened=[]}__deleteCards(t){setTimeout((()=>{this.opened[0].target.dispatchEvent(new Event(t)),this.opened[1].target.dispatchEvent(new Event(t)),this.opened=[]}),1e3)}__validPlay(){this.opened[0].symbol===this.opened[1].symbol?(this.score[this.turn]+=1,this.__deleteCards("correct"),this.score[1]+this.score[2]===this.cardList.length/2&&(this.score[1]>this.score[2]?(this.message="Player 1 wins",this.winner="P1 Wins"):this.score[1]<this.score[2]?(this.message="Player 2 wins",this.winner="P2 wins"):(this.message="Draw",this.winner="Draw"))):(this.__deleteCards("incorrect"),setTimeout((()=>{this.turn=1===this.turn?2:1}),1e3))}__openCard(t){this.opened.length>=0&&this.opened.length<=2&&(this.opened.push({symbol:t.target.symbol,target:t.target}),2===this.opened.length&&this.__validPlay())}__difficulty(t){"easy"===t?this.cardList=["🐲","🐲","🐔","🐔","🐼","🐼","🐰","🐰"]:"medium"===t?this.cardList=["🐲","🐲","🐔","🐔","🐼","🐼","🐰","🐰","🦝","🦝","🐯","🐯","🦊","🦊","🦁","🦁","🐱","🐱","🐺","🐺"]:"hard"===t&&(this.cardList=["🐲","🐲","🐔","🐔","🐼","🐼","🐰","🐰","🦝","🦝","🐯","🐯","🦊","🦊","🦁","🦁","🐱","🐱","🐺","🐺","🐧","🐧","🦋","🦋","🐞","🐞","🐌","🐌"])}constructor(){super(),this.__difficulty("medium"),this.__startGame(),this.message="Ready to play memorama?",this.winner=""}render(){return I`
      <header>
        <h1>${this.message}</h1>
      </header>
      <div class="center">
        <scoreboard-scs turn=${this.turn}>
          <span slot="player1">${this.score[1]}</span>
          <span slot="player2">${this.score[2]}</span>
        </scoreboard-scs>
        <div class="board">
          ${this.cardArray.map((t=>I`
              <card-scs
                .symbol="${t.value}"
                @click="${this.__openCard}"
              ></card-scs>
            `))}
        </div>
      </div>
    `}}),document.body.appendChild(function(){const t=document.createElement("memorama-game");return t.setAttribute("title","Memorama"),t}())})();