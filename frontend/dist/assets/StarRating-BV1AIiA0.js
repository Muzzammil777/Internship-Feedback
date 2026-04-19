import{c as u,m as p}from"./createLucideIcon-D1Pa3dJC.js";import{r as f,j as t}from"./index-DH7Vjmy0.js";import{S as x}from"./star-BQy7duFy.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],b=u("send",d);function v({value:i,onChange:a,readonly:e=!1,size:c="md"}){const[l,o]=f.useState(0),r={sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8"},n=s=>{!e&&a&&a(s)};return t.jsx("div",{className:"flex gap-1",children:[1,2,3,4,5].map(s=>{const m=s<=(l||i);return t.jsx(p.button,{type:"button",whileHover:e?{}:{scale:1.2},whileTap:e?{}:{scale:.9},onClick:()=>n(s),onMouseEnter:()=>!e&&o(s),onMouseLeave:()=>!e&&o(0),disabled:e,className:`${e?"cursor-default":"cursor-pointer"} transition-all`,children:t.jsx(x,{className:`${r[c]} transition-all ${m?"fill-amber-400 text-amber-400":"text-gray-300"}`})},s)})})}export{v as S,b as a};
