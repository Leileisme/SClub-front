import{y as H,z as U,Q as Y,A as g,o as h,B as S,a8 as v,S as x,C as B,D as n,H as K,E as I,F as s,K as k,J as G,X as b,v as a,O as E,G as A,P as w,a9 as Z,a7 as $,Z as z,aa as F,ab as X,M as j}from"./index-da7f7eb4.js";import{_ as J}from"./EventSetList-a22cb848.js";import{u as Q}from"./mitt-43e253ae.js";import{V as q,a as W}from"./VAppBarTitle-70df4e54.js";import{V as ee}from"./VContainer-b965c37c.js";import"./VDivider-34b8293d.js";import"./VListItem-816a63c5.js";import"./ssrBoot-e901857e.js";const ce={__name:"EventId",setup(te){const{apiAuth:d}=b(),p=H(),m=U(),R=Y(),c=Q(),{xs:O}=g(),C=h(()=>O.value),D=()=>{p.go(-1)};c.on("updateEvent",async()=>{await i(),c.emit("updateEventOk")});const e=S({TITLE:"",DATE:"",CITY:"",ADD:"",ADD_REMARK:"",IS_PUBLIC:"",CATEGORY:[],PRE_SALE:"",ON_SITE_SALE:"",SCORE_VALUES:"",DESCRIPTION:"",IMAGE:"",HOST:[],CO_ORGANIZER:[],TICKET:[],LIKES:[],KEEPS:[],REACH:"",IS_EDIT:"",POST:[],PHOTO:[],YEAR:"",MONTH:"",DAY:"",MINUTE_START:"",MINUTE_END:"",HOUR_START:"",HOUR_END:"",YY_MM_DD:""});v("routeEvent",e);const i=async()=>{var u,o;try{const{data:t}=await d.get("/events/"+m.params.id),[l,r,_]=t.result.DATE.split(" "),[f,N,P]=l.split("/"),[L,M]=[r.slice(0,2),r.slice(2)],[V,y]=[_.slice(0,2),_.slice(2)];e.value.TITLE=t.result.TITLE,e.value.DATE=t.result.DATE,e.value.CITY=t.result.CITY,e.value.ADD=t.result.ADD,e.value.ADD_REMARK=t.result.ADD_REMARK,e.value.IS_PUBLIC=t.result.IS_PUBLIC,e.value.CATEGORY=t.result.CATEGORY,e.value.PRE_SALE=t.result.PRE_SALE,e.value.ON_SITE_SALE=t.result.ON_SITE_SALE,e.value.SCORE_VALUES=t.result.SCORE_VALUES,e.value.DESCRIPTION=t.result.DESCRIPTION,e.value.IMAGE=t.result.IMAGE,e.value.HOST=t.result.HOST,e.value.CO_ORGANIZER=t.result.CO_ORGANIZER,e.value.TICKET=t.result.TICKET,e.value.LIKES=t.result.LIKES,e.value.KEEPS=t.result.KEEPS,e.value.REACH=t.result.REACH,e.value.IS_EDIT=t.result.IS_EDIT,e.value.POST=t.result.POST,e.value.PHOTO=t.result.PHOTO,e.value.YEAR=f,e.value.MONTH=N.padStart(2,"0"),e.value.DAY=P.padStart(2,"0"),e.value.MINUTE_START=M.padStart(2,"0"),e.value.MINUTE_END=y.padStart(2,"0"),e.value.HOUR_START=L.padStart(2,"0"),e.value.HOUR_END=V.padStart(2,"0"),e.value.YY_MM_DD=l,document.title=`SClub | ${e.value.TITLE}`}catch(t){console.log(t);const l=((o=(u=t==null?void 0:t.response)==null?void 0:u.data)==null?void 0:o.message)||"發生錯誤，請稍後再試";R({text:l,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}},T=S("");return x(async()=>{T.value=await i(),v("routeEvent",T)}),(u,o)=>{const t=B("RouterView");return n(),K(G,null,[C.value?(n(),I(q,{key:0},{default:s(()=>[a(ee,{class:"align-center justify-space-around d-flex"},{default:s(()=>[a(E,{icon:"mdi-chevron-left",style:{"font-size":"1.4rem"},onClick:D}),a(W,{class:"text-h5"},{default:s(()=>[A(w(e.value.TITLE),1)]),_:1}),a(Z,{"max-width":"400px"},{activator:s(({props:l})=>[a(E,$(l,{icon:"mdi-menu",style:{"font-size":"1.25rem"}}),null,16)]),default:s(({isActive:l})=>[a(z,{style:{"border-radius":"15px"}},{default:s(()=>[a(F,{class:"text-center"},{default:s(()=>[a(J,{isMobile:""})]),_:1}),a(X),a(E,{text:"Close Dialog",flat:!0,onClick:r=>l.value=!1,style:{position:"absolute",right:"0",top:"0"}},{default:s(()=>[a(j,null,{default:s(()=>[A("mdi-close")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:1})]),_:1})]),_:1})):k("",!0),(n(),I(t,{key:u.$route.fullPath}))],64)}}};export{ce as default};