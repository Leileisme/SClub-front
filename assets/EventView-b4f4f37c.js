import{x as _,y as v,B as e,a2 as p,A as m,o as s,C as R,D as g,E as f}from"./index-2c84da56.js";import{_ as d}from"./_plugin-vue_export-helper-c27b6911.js";const h={__name:"EventView",setup(x){_();const t=v(),r=e(t.currentRoute.value.name==="personal"),u=e(t.currentRoute.value.name==="login"),n=e(t.currentRoute.value.name==="register");e(t.currentRoute.value.name==="event"),p(()=>t.currentRoute.value.name,o=>{r.value=o==="personal",u.value=o==="login",n.value=o==="register"});const{sm:a,xs:c}=m(),l=s(()=>c.value);return s(()=>a.value),e(!0),e(!0),s(()=>l.value?"height:auto":" align-items: center;"),s(()=>[{text:"票券",icon:"mdi-menu",show:""}]),(o,w)=>{const i=R("RouterView");return g(),f(i,{key:o.$route.fullPath})}}},E=d(h,[["__scopeId","data-v-346e996a"]]);export{E as default};