import{r as a,n as e,l as t,w as l,g as c,o as s,a as u,c as n,j as i,F as d,b as o,t as r,f,p as _,q as v,k}from"./index-CO1QFl_H.js";import{_ as p}from"./_plugin-vue_export-helper.BCo6x5W8.js";const q=p({__name:"cart",setup(p){const q=a([{id:"1",name:"小米",price:100,quantity:1,checked:!1},{id:"2",name:"华为",price:200,quantity:1,checked:!1}]);function y(a){console.log(a),q.value.forEach((e=>{e.checked=a.detail.value.includes(e.id)}))}const h=a(0),m=a(0);return e(q,(()=>{h.value=q.value.filter((a=>a.checked)).reduce(((a,e)=>a+e.quantity),0),m.value=q.value.filter((a=>a.checked)).reduce(((a,e)=>a+e.price*e.quantity),0)}),{deep:!0}),(a,e)=>{const p=v,x=f,C=c,b=k,g=_;return s(),t(C,{class:"container"},{default:l((()=>[u(g,{onChange:y},{default:l((()=>[(s(!0),n(d,null,i(q.value,((a,e)=>(s(),t(C,{class:"item",key:a.id},{default:l((()=>[u(p,{class:"checkbox",value:a.id,checked:a.checked},null,8,["value","checked"]),u(C,{class:"info"},{default:l((()=>[u(x,{class:"name"},{default:l((()=>[o(r(a.name),1)])),_:2},1024),u(x,{class:"price"},{default:l((()=>[o("￥"+r(a.price),1)])),_:2},1024)])),_:2},1024),u(C,{class:"quantity-control"},{default:l((()=>[u(b,{class:"quantity-btn",onClick:a=>(a=>{q.value[a].quantity>1&&q.value[a].quantity--})(e)},{default:l((()=>[o("-")])),_:2},1032,["onClick"]),u(x,{class:"quantity"},{default:l((()=>[o(r(a.quantity),1)])),_:2},1024),u(b,{class:"quantity-btn",onClick:a=>(a=>{q.value[a].quantity++})(e)},{default:l((()=>[o("+")])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)))),128))])),_:1}),u(C,{class:"card"},{default:l((()=>[u(x,{class:"total-text"},{default:l((()=>[o(" 选中 "+r(h.value)+" 件商品 总价：￥"+r(m.value)+" 元 ",1)])),_:1})])),_:1}),o(" "+r(q.value),1)])),_:1})}}},[["__scopeId","data-v-381e9165"]]);export{q as default};