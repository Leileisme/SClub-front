import{p as T,at as k,bt as A,ba as S,h as K,ay as I,bu as O,a$ as U,o as y,B as $,a9 as R,bv as b,ax as B,a5 as F,a2 as L,$ as p,s as N,aG as j,bw as g,bx as w,v as V,aE as z,aB as G,by as E,bz as q}from"./index-55945f57.js";const H=T({id:String,...k(A({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:S}}),["absolute"])},"VMenu"),W=K()({name:"VMenu",props:H(),emits:{"update:modelValue":l=>!0},setup(l,P){let{slots:i}=P;const u=I(l,"modelValue"),{scopeId:x}=O(),h=U(),v=y(()=>l.id||`v-menu-${h}`),n=$(),a=R(b,null),c=B(0);F(b,{register(){++c.value},unregister(){--c.value},closeParents(){setTimeout(()=>{c.value||(u.value=!1,a==null||a.closeParents())},40)}});async function f(e){var s,r,d;const t=e.relatedTarget,o=e.target;await G(),u.value&&t!==o&&((s=n.value)!=null&&s.contentEl)&&((r=n.value)!=null&&r.globalTop)&&![document,n.value.contentEl].includes(o)&&!n.value.contentEl.contains(o)&&((d=E(n.value.contentEl)[0])==null||d.focus())}L(u,e=>{e?(a==null||a.register(),document.addEventListener("focusin",f,{once:!0})):(a==null||a.unregister(),document.removeEventListener("focusin",f))});function C(){a==null||a.closeParents()}function D(e){var t,o,s;l.disabled||e.key==="Tab"&&(q(E((t=n.value)==null?void 0:t.contentEl,!1),e.shiftKey?"prev":"next",d=>d.tabIndex>=0)||(u.value=!1,(s=(o=n.value)==null?void 0:o.activatorEl)==null||s.focus()))}function m(e){var o;if(l.disabled)return;const t=(o=n.value)==null?void 0:o.contentEl;t&&u.value?e.key==="ArrowDown"?(e.preventDefault(),g(t,"next")):e.key==="ArrowUp"&&(e.preventDefault(),g(t,"prev")):["ArrowDown","ArrowUp"].includes(e.key)&&(u.value=!0,e.preventDefault(),setTimeout(()=>setTimeout(()=>m(e))))}const M=y(()=>p({"aria-haspopup":"menu","aria-expanded":String(u.value),"aria-owns":v.value,onKeydown:m},l.activatorProps));return N(()=>{const e=w.filterProps(l);return V(w,p({ref:n,class:["v-menu",l.class],style:l.style},e,{modelValue:u.value,"onUpdate:modelValue":t=>u.value=t,absolute:!0,activatorProps:M.value,"onClick:outside":C,onKeydown:D},x),{activator:i.activator,default:function(){for(var t=arguments.length,o=new Array(t),s=0;s<t;s++)o[s]=arguments[s];return V(z,{root:"VMenu"},{default:()=>{var r;return[(r=i.default)==null?void 0:r.call(i,...o)]}})}})}),j({id:v,ΨopenChildren:c},n)}});export{W as V};
