import{a3 as C,an as _,ai as M,y as w,a7 as b,$ as o,a8 as e,c as s,a1 as l,aa as i,ac as x,ak as p,b0 as B,a2 as a,af as d,a0 as v,ag as z}from"./index-847d5e3b.js";import{l as G}from"./logoSVG-f9f0064d.js";import{V as P}from"./VContainer-00d6b143.js";import{V as S,a as k}from"./VRow-4398ec7e.js";import{V as D}from"./VBreadcrumbs-dd52f4f6.js";const I=a("thead",null,[a("tr",null,[a("th",{class:"d-md-block d-none"},"ID"),a("th",null,"日期"),a("th",null,"活動紀錄")])],-1),L={class:"d-md-block d-none"},H={__name:"OrdersView",setup(N){const h=C();_([]);const u=_([]);(async()=>{try{const{data:n}=await M.get("/orders");u.push(...n.result),u.forEach(f=>{f.cart.forEach(r=>{const m={lat:parseFloat(r.Position.PositionLat),lng:parseFloat(r.Position.PositionLon)};r.position=m})})}catch(n){h({text:n.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}})();const y=w([{title:"首頁",disabled:!1,to:"/"},{title:"我的行程",disabled:!1,to:""}]),V={lat:24.15994867967149,lng:120.6668839584927},g={zoomControl:!1,mapTypeControl:!1,scaleControl:!0,streetViewControl:!1,rotateControl:!0,fullscreenControl:!1,zoom:8,clickableIcons:!0,minZoom:8,maxZoom:20,styles:[{featureType:"poi",stylers:[{visibility:"off"}]}]};return(n,f)=>{const r=b("GMapMarker"),m=b("GMapMap");return o(),e(i,null,[s(P,null,{default:l(()=>[s(S,null,{default:l(()=>[s(k,{cols:"12"},{default:l(()=>[s(D,{"bg-color":"transparant",items:y.value,class:"text-black position"},{title:l(({item:t})=>[x(p(t.title),1)]),_:1},8,["items"])]),_:1}),s(k,{cols:"12"},{default:l(()=>[s(B,null,{default:l(()=>[I,a("tbody",null,[(o(!0),e(i,null,d(u,t=>(o(),e("tr",{key:t._id},[a("td",L,p(t._id),1),a("td",null,p(new Date(t.date).toLocaleString()),1),a("td",null,[a("ul",null,[(o(!0),e(i,null,d(t.cart,c=>(o(),e("li",{key:c._id},p(c.productName),1))),128))])])]))),128))])]),_:1})]),_:1})]),_:1})]),_:1}),s(m,{center:V,options:g,zoom:n.zoom,"map-type-id":"roadmap",class:"mapHeight"},{default:l(()=>[(o(!0),e(i,null,d(u,t=>(o(),e("div",{key:t._id},[(o(!0),e(i,null,d(t==null?void 0:t.cart,c=>(o(),v(r,{icon:z(G),key:c.productID,position:c.position,clickable:!0,draggable:!1},null,8,["icon","position"]))),128))]))),128))]),_:1},8,["zoom"])],64)}}};export{H as default};