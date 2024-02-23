import{p as M,at as O,bt as U,h as G,az as X,B as w,o as V,s as R,P as z,v,J as Y,$ as T,aG as q,bu as J,bv as W,b as K,e as L,ay as Q,k as Z,j as p,t as n,r as ee,w as te,bw as ae}from"./index-2c84da56.js";import{m as se,c as E}from"./VWindowItem-97aeaf4e.js";const _=Symbol.for("vuetify:v-tabs"),oe=M({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...O(U({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),le=G()({name:"VTab",props:oe(),setup(e,t){let{slots:s,attrs:f}=t;const{textColorClasses:x,textColorStyles:h}=X(e,"sliderColor"),r=w(),g=w(),a=V(()=>e.direction==="horizontal"),o=V(()=>{var i,l;return((l=(i=r.value)==null?void 0:i.group)==null?void 0:l.isSelected.value)??!1});function D(i){var k,B;let{value:l}=i;if(l){const S=(B=(k=r.value)==null?void 0:k.$el.parentElement)==null?void 0:B.querySelector(".v-tab--selected .v-tab__slider"),C=g.value;if(!S||!C)return;const j=getComputedStyle(S).color,d=S.getBoundingClientRect(),c=C.getBoundingClientRect(),m=a.value?"x":"y",y=a.value?"X":"Y",P=a.value?"right":"bottom",u=a.value?"width":"height",A=d[m],F=c[m],b=A>F?d[P]-c[P]:d[m]-c[m],H=Math.sign(b)>0?a.value?"right":"bottom":Math.sign(b)<0?a.value?"left":"top":"center",I=(Math.abs(b)+(Math.sign(b)<0?d[u]:c[u]))/Math.max(d[u],c[u])||0,N=d[u]/c[u]||0,$=1.5;J(C,{backgroundColor:[j,"currentcolor"],transform:[`translate${y}(${b}px) scale${y}(${N})`,`translate${y}(${b/$}px) scale${y}(${(I-1)/$+1})`,"none"],transformOrigin:Array(3).fill(H)},{duration:225,easing:W})}}return R(()=>{const i=z.filterProps(e);return v(z,T({symbol:_,ref:r,class:["v-tab",e.class],style:e.style,tabindex:o.value?0:-1,role:"tab","aria-selected":String(o.value),active:!1},i,f,{block:e.fixed,maxWidth:e.fixed?300:void 0,"onGroup:selected":D}),{...s,default:()=>{var l;return v(Y,null,[((l=s.default)==null?void 0:l.call(s))??e.text,!e.hideSlider&&v("div",{ref:g,class:["v-tab__slider",x.value],style:h.value},null)])}})}),q({},r)}});function ne(e){return e?e.map(t=>ae(t)?t:{text:t,value:t}):[]}const re=M({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...se({mandatory:"force"}),...K(),...L()},"VTabs"),ue=G()({name:"VTabs",props:re(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:s}=t;const f=Q(e,"modelValue"),x=V(()=>ne(e.items)),{densityClasses:h}=Z(e),{backgroundColorClasses:r,backgroundColorStyles:g}=p(n(e,"bgColor"));return ee({VTab:{color:n(e,"color"),direction:n(e,"direction"),stacked:n(e,"stacked"),fixed:n(e,"fixedTabs"),sliderColor:n(e,"sliderColor"),hideSlider:n(e,"hideSlider")}}),R(()=>{const a=E.filterProps(e);return v(E,T(a,{modelValue:f.value,"onUpdate:modelValue":o=>f.value=o,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},h.value,r.value,e.class],style:[{"--v-tabs-height":te(e.height)},g.value,e.style],role:"tablist",symbol:_}),{default:()=>[s.default?s.default():x.value.map(o=>v(le,T(o,{key:o.text}),null))]})}),{}}});export{ue as V,le as a};