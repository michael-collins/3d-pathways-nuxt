import{_ as b}from"./nuxt-link.D5FZ2DP6.js";import{g as f,h as x,v as w,i as _,o as l,c as d,F as v,r as g,a as e,t as k,b as o,w as n,d as a}from"./entry.2mDF8niq.js";import{_ as y}from"./_plugin-vue_export-helper.DlAUqK2U.js";const B=()=>f("color-mode").value,$=e("option",{disabled:"",selected:""},"Theme",-1),D={__name:"toggleDarkButton",setup(m){const r=B(),i=["system","light","dark","cupcake","bumblebee","emerald","corporate","synthwave","retro","cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade","night","coffee","winter","dim","nord","sunset"];return(p,c)=>x((l(),d("select",{class:"select w-full max-w-xs","onUpdate:modelValue":c[0]||(c[0]=t=>_(r).preference=t)},[$,(l(),d(v,null,g(i,t=>e("option",{key:t},k(t),1)),64))],512)),[[w,_(r).preference]])}},u=D,M={name:"nav-bar",components:{toggleDarkButton:u}},A={class:"navbar bg-base-100"},V={class:"navbar-start"},C={class:"dropdown"},N=e("div",{tabindex:"0",role:"button",class:"btn btn-ghost md:hidden"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h8m-8 6h16"})])],-1),S={tabindex:"0",class:"menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"},z={class:"flex-1 hidden md:flex"},F={class:"menu menu-horizontal px-1"},H={class:"text-primary"},T={class:"text-secondary"},j={class:"navbar-end"};function q(m,r,i,p,c,t){const s=b,h=u;return l(),d("div",A,[e("div",V,[e("div",C,[N,e("ul",S,[e("li",null,[o(s,{to:"/"},{default:n(()=>[a("Home")]),_:1})]),e("li",null,[o(s,{to:"/About"},{default:n(()=>[a("About")]),_:1})])])]),e("div",z,[e("ul",F,[e("li",H,[o(s,{to:"/"},{default:n(()=>[a("Home")]),_:1})]),e("li",T,[o(s,{to:"/About"},{default:n(()=>[a("About")]),_:1})])])])]),e("div",j,[o(h)])])}const G=y(M,[["render",q]]);export{G as _};