import{p as O,ag as M,a as $,bE as Re,e as D,f as ye,h as L,bF as ge,A as pe,q as N,ax as z,o as b,b3 as se,aC as He,a2 as be,s as j,v as u,bl as oe,M as H,by as Me,aU as Oe,a_ as $e,g as Q,aV as Se,aa as Z,r as Le,t as F,$ as ke,bg as ie,m as Ge,b as Xe,c as Fe,aj as Ce,d as Ye,bG as We,bH as De,ah as je,aw as xe,i as qe,bI as Ke,k as Ue,l as Je,n as Ne,bJ as Qe,ay as Ze,ak as Ie,bK as et,ad as W,ai as Ve,bL as tt,bM as nt,aE as Y,ae as Pe,J as ue,a3 as ce,bN as we,B as re,a5 as at,P as ve,ab as lt,a9 as st,ac as ot,bf as it,w as de,aB as ut}from"./index-55945f57.js";import{u as ct}from"./ssrBoot-ab6ba0d9.js";function fe(e){const t=Math.abs(e);return Math.sign(e)*(t/((1/.501-2)*(1-t)+1))}function he(e){let{selectedElement:a,containerSize:t,contentSize:n,isRtl:o,currentScrollOffset:c,isHorizontal:l}=e;const r=l?a.clientWidth:a.clientHeight,s=l?a.offsetLeft:a.offsetTop,d=o&&l?n-s-r:s,m=t+c,y=r+d,C=r*.4;return d<=c?c=Math.max(d-C,0):m<=y&&(c=Math.min(c-(m-y-C),n-t)),c}function rt(e){let{selectedElement:a,containerSize:t,contentSize:n,isRtl:o,isHorizontal:c}=e;const l=c?a.clientWidth:a.clientHeight,r=c?a.offsetLeft:a.offsetTop,s=o&&c?n-r-l/2-t/2:r+l/2-t/2;return Math.min(n-t,Math.max(0,s))}const vt=Symbol.for("vuetify:v-slide-group"),Te=O({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:vt},nextIcon:{type:M,default:"$next"},prevIcon:{type:M,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...$(),...Re(),...D(),...ye({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),me=L()({name:"VSlideGroup",props:Te(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{isRtl:n}=ge(),{displayClasses:o,mobile:c}=pe(e),l=N(e,e.symbol),r=z(!1),s=z(0),d=z(0),m=z(0),y=b(()=>e.direction==="horizontal"),{resizeRef:C,contentRect:P}=se(),{resizeRef:f,contentRect:_}=se(),v=b(()=>l.selected.value.length?l.items.value.findIndex(i=>i.id===l.selected.value[0]):-1),V=b(()=>l.selected.value.length?l.items.value.findIndex(i=>i.id===l.selected.value[l.selected.value.length-1]):-1);if(He){let i=-1;be(()=>[l.selected.value,P.value,_.value,y.value],()=>{cancelAnimationFrame(i),i=requestAnimationFrame(()=>{if(P.value&&_.value){const h=y.value?"width":"height";d.value=P.value[h],m.value=_.value[h],r.value=d.value+1<m.value}if(v.value>=0&&f.value){const h=f.value.children[V.value];v.value===0||!r.value?s.value=0:e.centerActive?s.value=rt({selectedElement:h,containerSize:d.value,contentSize:m.value,isRtl:n.value,isHorizontal:y.value}):r.value&&(s.value=he({selectedElement:h,containerSize:d.value,contentSize:m.value,isRtl:n.value,currentScrollOffset:s.value,isHorizontal:y.value}))}})})}const A=z(!1);let w=0,g=0;function S(i){const h=y.value?"clientX":"clientY";g=(n.value&&y.value?-1:1)*s.value,w=i.touches[0][h],A.value=!0}function x(i){if(!r.value)return;const h=y.value?"clientX":"clientY",T=n.value&&y.value?-1:1;s.value=T*(g+w-i.touches[0][h])}function k(i){const h=m.value-d.value;s.value<0||!r.value?s.value=0:s.value>=h&&(s.value=h),A.value=!1}function B(){C.value&&(C.value[y.value?"scrollLeft":"scrollTop"]=0)}const E=z(!1);function q(i){if(E.value=!0,!(!r.value||!f.value)){for(const h of i.composedPath())for(const T of f.value.children)if(T===h){s.value=he({selectedElement:T,containerSize:d.value,contentSize:m.value,isRtl:n.value,currentScrollOffset:s.value,isHorizontal:y.value});return}}}function G(i){E.value=!1}function X(i){var h;!E.value&&!(i.relatedTarget&&((h=f.value)!=null&&h.contains(i.relatedTarget)))&&I()}function K(i){f.value&&(y.value?i.key==="ArrowRight"?I(n.value?"prev":"next"):i.key==="ArrowLeft"&&I(n.value?"next":"prev"):i.key==="ArrowDown"?I("next"):i.key==="ArrowUp"&&I("prev"),i.key==="Home"?I("first"):i.key==="End"&&I("last"))}function I(i){var h,T,ne,ae,le;if(f.value)if(!i)(h=Me(f.value)[0])==null||h.focus();else if(i==="next"){const p=(T=f.value.querySelector(":focus"))==null?void 0:T.nextElementSibling;p?p.focus():I("first")}else if(i==="prev"){const p=(ne=f.value.querySelector(":focus"))==null?void 0:ne.previousElementSibling;p?p.focus():I("last")}else i==="first"?(ae=f.value.firstElementChild)==null||ae.focus():i==="last"&&((le=f.value.lastElementChild)==null||le.focus())}function R(i){const h=s.value+(i==="prev"?-1:1)*d.value;s.value=Oe(h,0,m.value-d.value)}const Ee=b(()=>{let i=s.value>m.value-d.value?-(m.value-d.value)+fe(m.value-d.value-s.value):-s.value;s.value<=0&&(i=fe(-s.value));const h=n.value&&y.value?-1:1;return{transform:`translate${y.value?"X":"Y"}(${h*i}px)`,transition:A.value?"none":"",willChange:A.value?"transform":""}}),U=b(()=>({next:l.next,prev:l.prev,select:l.select,isSelected:l.isSelected})),J=b(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!c.value;case!0:return r.value||Math.abs(s.value)>0;case"mobile":return c.value||r.value||Math.abs(s.value)>0;default:return!c.value&&(r.value||Math.abs(s.value)>0)}}),ee=b(()=>Math.abs(s.value)>0),te=b(()=>m.value>Math.abs(s.value)+d.value);return j(()=>u(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!y.value,"v-slide-group--has-affixes":J.value,"v-slide-group--is-overflowing":r.value},o.value,e.class],style:e.style,tabindex:E.value||l.selected.value.length?-1:0,onFocus:X},{default:()=>{var i,h,T;return[J.value&&u("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!ee.value}],onClick:()=>ee.value&&R("prev")},[((i=t.prev)==null?void 0:i.call(t,U.value))??u(oe,null,{default:()=>[u(H,{icon:n.value?e.nextIcon:e.prevIcon},null)]})]),u("div",{key:"container",ref:C,class:"v-slide-group__container",onScroll:B},[u("div",{ref:f,class:"v-slide-group__content",style:Ee.value,onTouchstartPassive:S,onTouchmovePassive:x,onTouchendPassive:k,onFocusin:q,onFocusout:G,onKeydown:K},[(h=t.default)==null?void 0:h.call(t,U.value)])]),J.value&&u("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!te.value}],onClick:()=>te.value&&R("next")},[((T=t.next)==null?void 0:T.call(t,U.value))??u(oe,null,{default:()=>[u(H,{icon:n.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:l.selected,scrollTo:R,scrollOffset:s,focus:I}}}),_e=Symbol.for("vuetify:v-chip-group"),dt=O({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:$e},...Te(),...$(),...ye({selectedClass:"v-chip--selected"}),...D(),...Q(),...Se({variant:"tonal"})},"VChipGroup");L()({name:"VChipGroup",props:dt(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{themeClasses:n}=Z(e),{isSelected:o,select:c,next:l,prev:r,selected:s}=N(e,_e);return Le({VChip:{color:F(e,"color"),disabled:F(e,"disabled"),filter:F(e,"filter"),variant:F(e,"variant")}}),j(()=>{const d=me.filterProps(e);return u(me,ke(d,{class:["v-chip-group",{"v-chip-group--column":e.column},n.value,e.class],style:e.style}),{default:()=>{var m;return[(m=t.default)==null?void 0:m.call(t,{isSelected:o,select:c,next:l,prev:r,selected:s.value})]}})}),{}}});const ft=O({activeClass:String,appendAvatar:String,appendIcon:M,closable:Boolean,closeIcon:{type:M,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:M,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:ie(),onClickOnce:ie(),...Ge(),...$(),...Xe(),...Fe(),...Ce(),...Ye(),...We(),...De(),...D({tag:"span"}),...Q(),...Se({variant:"tonal"})},"VChip"),wt=L()({name:"VChip",directives:{Ripple:je},props:ft(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,a){let{attrs:t,emit:n,slots:o}=a;const{t:c}=xe(),{borderClasses:l}=qe(e),{colorClasses:r,colorStyles:s,variantClasses:d}=Ke(e),{densityClasses:m}=Ue(e),{elevationClasses:y}=Je(e),{roundedClasses:C}=Ne(e),{sizeClasses:P}=Qe(e),{themeClasses:f}=Z(e),_=Ze(e,"modelValue"),v=Ie(e,_e,!1),V=et(e,t),A=b(()=>e.link!==!1&&V.isLink.value),w=b(()=>!e.disabled&&e.link!==!1&&(!!v||e.link||V.isClickable.value)),g=b(()=>({"aria-label":c(e.closeLabel),onClick(k){k.stopPropagation(),_.value=!1,n("click:close",k)}}));function S(k){var B;n("click",k),w.value&&((B=V.navigate)==null||B.call(V,k),v==null||v.toggle())}function x(k){(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),S(k))}return()=>{const k=V.isLink.value?"a":e.tag,B=!!(e.appendIcon||e.appendAvatar),E=!!(B||o.append),q=!!(o.close||e.closable),G=!!(o.filter||e.filter)&&v,X=!!(e.prependIcon||e.prependAvatar),K=!!(X||o.prepend),I=!v||v.isSelected.value;return _.value&&W(u(k,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":w.value,"v-chip--filter":G,"v-chip--pill":e.pill},f.value,l.value,I?r.value:void 0,m.value,y.value,C.value,P.value,d.value,v==null?void 0:v.selectedClass.value,e.class],style:[I?s.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:V.href.value,tabindex:w.value?0:void 0,onClick:S,onKeydown:w.value&&!A.value&&x},{default:()=>{var R;return[tt(w.value,"v-chip"),G&&u(nt,{key:"filter"},{default:()=>[W(u("div",{class:"v-chip__filter"},[o.filter?u(Y,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},o.filter):u(H,{key:"filter-icon",icon:e.filterIcon},null)]),[[Pe,v.isSelected.value]])]}),K&&u("div",{key:"prepend",class:"v-chip__prepend"},[o.prepend?u(Y,{key:"prepend-defaults",disabled:!X,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},o.prepend):u(ue,null,[e.prependIcon&&u(H,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&u(ce,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),u("div",{class:"v-chip__content"},[((R=o.default)==null?void 0:R.call(o,{isSelected:v==null?void 0:v.isSelected.value,selectedClass:v==null?void 0:v.selectedClass.value,select:v==null?void 0:v.select,toggle:v==null?void 0:v.toggle,value:v==null?void 0:v.value.value,disabled:e.disabled}))??e.text]),E&&u("div",{key:"append",class:"v-chip__append"},[o.append?u(Y,{key:"append-defaults",disabled:!B,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},o.append):u(ue,null,[e.appendIcon&&u(H,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&u(ce,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),q&&u("button",ke({key:"close",class:"v-chip__close",type:"button"},g.value),[o.close?u(Y,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},o.close):u(H,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[Ve("ripple"),w.value&&e.ripple,null]])}}});const ht=e=>{const{touchstartX:a,touchendX:t,touchstartY:n,touchendY:o}=e,c=.5,l=16;e.offsetX=t-a,e.offsetY=o-n,Math.abs(e.offsetY)<c*Math.abs(e.offsetX)&&(e.left&&t<a-l&&e.left(e),e.right&&t>a+l&&e.right(e)),Math.abs(e.offsetX)<c*Math.abs(e.offsetY)&&(e.up&&o<n-l&&e.up(e),e.down&&o>n+l&&e.down(e))};function mt(e,a){var n;const t=e.changedTouches[0];a.touchstartX=t.clientX,a.touchstartY=t.clientY,(n=a.start)==null||n.call(a,{originalEvent:e,...a})}function yt(e,a){var n;const t=e.changedTouches[0];a.touchendX=t.clientX,a.touchendY=t.clientY,(n=a.end)==null||n.call(a,{originalEvent:e,...a}),ht(a)}function gt(e,a){var n;const t=e.changedTouches[0];a.touchmoveX=t.clientX,a.touchmoveY=t.clientY,(n=a.move)==null||n.call(a,{originalEvent:e,...a})}function bt(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const a={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:t=>mt(t,a),touchend:t=>yt(t,a),touchmove:t=>gt(t,a)}}function St(e,a){var r;const t=a.value,n=t!=null&&t.parent?e.parentElement:e,o=(t==null?void 0:t.options)??{passive:!0},c=(r=a.instance)==null?void 0:r.$.uid;if(!n||!c)return;const l=bt(a.value);n._touchHandlers=n._touchHandlers??Object.create(null),n._touchHandlers[c]=l,we(l).forEach(s=>{n.addEventListener(s,l[s],o)})}function kt(e,a){var c,l;const t=(c=a.value)!=null&&c.parent?e.parentElement:e,n=(l=a.instance)==null?void 0:l.$.uid;if(!(t!=null&&t._touchHandlers)||!n)return;const o=t._touchHandlers[n];we(o).forEach(r=>{t.removeEventListener(r,o[r])}),delete t._touchHandlers[n]}const ze={mounted:St,unmounted:kt},Ct=ze,Ae=Symbol.for("vuetify:v-window"),Be=Symbol.for("vuetify:v-window-group"),xt=O({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{type:[Boolean,String],default:"force"},...$(),...D(),...Q()},"VWindow"),Tt=L()({name:"VWindow",directives:{Touch:ze},props:xt(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{themeClasses:n}=Z(e),{isRtl:o}=ge(),{t:c}=xe(),l=N(e,Be),r=re(),s=b(()=>o.value?!e.reverse:e.reverse),d=z(!1),m=b(()=>{const g=e.direction==="vertical"?"y":"x",x=(s.value?!d.value:d.value)?"-reverse":"";return`v-window-${g}${x}-transition`}),y=z(0),C=re(void 0),P=b(()=>l.items.value.findIndex(g=>l.selected.value.includes(g.id)));be(P,(g,S)=>{const x=l.items.value.length,k=x-1;x<=2?d.value=g<S:g===k&&S===0?d.value=!0:g===0&&S===k?d.value=!1:d.value=g<S}),at(Ae,{transition:m,isReversed:d,transitionCount:y,transitionHeight:C,rootRef:r});const f=b(()=>e.continuous||P.value!==0),_=b(()=>e.continuous||P.value!==l.items.value.length-1);function v(){f.value&&l.prev()}function V(){_.value&&l.next()}const A=b(()=>{const g=[],S={icon:o.value?e.nextIcon:e.prevIcon,class:`v-window__${s.value?"right":"left"}`,onClick:l.prev,"aria-label":c("$vuetify.carousel.prev")};g.push(f.value?t.prev?t.prev({props:S}):u(ve,S,null):u("div",null,null));const x={icon:o.value?e.prevIcon:e.nextIcon,class:`v-window__${s.value?"left":"right"}`,onClick:l.next,"aria-label":c("$vuetify.carousel.next")};return g.push(_.value?t.next?t.next({props:x}):u(ve,x,null):u("div",null,null)),g}),w=b(()=>e.touch===!1?e.touch:{...{left:()=>{s.value?v():V()},right:()=>{s.value?V():v()},start:S=>{let{originalEvent:x}=S;x.stopPropagation()}},...e.touch===!0?{}:e.touch});return j(()=>W(u(e.tag,{ref:r,class:["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover"},n.value,e.class],style:e.style},{default:()=>{var g,S;return[u("div",{class:"v-window__container",style:{height:C.value}},[(g=t.default)==null?void 0:g.call(t,{group:l}),e.showArrows!==!1&&u("div",{class:"v-window__controls"},[A.value])]),(S=t.additional)==null?void 0:S.call(t,{group:l})]}}),[[Ve("touch"),w.value]])),{group:l}}}),It=O({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...$(),...Ce(),...lt()},"VWindowItem"),_t=L()({name:"VWindowItem",directives:{Touch:Ct},props:It(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:t}=a;const n=st(Ae),o=Ie(e,Be),{isBooted:c}=ct();if(!n||!o)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const l=z(!1),r=b(()=>c.value&&(n.isReversed.value?e.reverseTransition!==!1:e.transition!==!1));function s(){!l.value||!n||(l.value=!1,n.transitionCount.value>0&&(n.transitionCount.value-=1,n.transitionCount.value===0&&(n.transitionHeight.value=void 0)))}function d(){var f;l.value||!n||(l.value=!0,n.transitionCount.value===0&&(n.transitionHeight.value=de((f=n.rootRef.value)==null?void 0:f.clientHeight)),n.transitionCount.value+=1)}function m(){s()}function y(f){l.value&&ut(()=>{!r.value||!l.value||!n||(n.transitionHeight.value=de(f.clientHeight))})}const C=b(()=>{const f=n.isReversed.value?e.reverseTransition:e.transition;return r.value?{name:typeof f!="string"?n.transition.value:f,onBeforeEnter:d,onAfterEnter:s,onEnterCancelled:m,onBeforeLeave:d,onAfterLeave:s,onLeaveCancelled:m,onEnter:y}:!1}),{hasContent:P}=ot(e,o.isSelected);return j(()=>u(it,{transition:C.value,disabled:!c.value},{default:()=>{var f;return[W(u("div",{class:["v-window-item",o.selectedClass.value,e.class],style:e.style},[P.value&&((f=t.default)==null?void 0:f.call(t))]),[[Pe,o.isSelected.value]])]}})),{groupItem:o}}});export{Tt as V,_t as a,wt as b,me as c,Te as m};
