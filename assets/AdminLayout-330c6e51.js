import{a4 as _,a5 as f,a7 as V,$ as o,a8 as n,c as t,a1 as a,aa as r,ae as s,ab as i,ag as l,aA as g,af as h}from"./index-b4d815b6.js";import{V as v,a as w}from"./VNavigationDrawer-d2ebc249.js";const y={__name:"AdminLayout",setup(L){const u=_(),{avatar:c,account:d}=f(u),p=[{to:"/admin/products",title:"商品管理",icon:"mdi-shopping"},{to:"/admin/orders",title:"訂單管理",icon:"mdi-format-list-numbered"},{to:"/",title:"回首頁",icon:"mdi-home"}];return(k,x)=>{const m=V("RouterView");return o(),n(r,null,[t(v,{permanent:""},{default:a(()=>[t(s,null,{default:a(()=>[t(i,{"prepend-avatar":l(c),title:l(d)},null,8,["prepend-avatar","title"])]),_:1}),t(g),t(s,null,{default:a(()=>[(o(),n(r,null,h(p,e=>t(i,{key:e.to,to:e.to,title:e.title,"prepend-icon":e.icon},null,8,["to","title","prepend-icon"])),64))]),_:1})]),_:1}),t(w,null,{default:a(()=>[t(m)]),_:1})],64)}}};export{y as default};
