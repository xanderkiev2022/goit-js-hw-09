const e=document.querySelector("body"),t=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");let a;t.addEventListener("click",(function(){a=setInterval((()=>{e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,t.disabled=!0,d.disabled=!1}),1e3)})),d.addEventListener("click",(function(){clearInterval(a),t.disabled=!1,d.disabled=!0}));
//# sourceMappingURL=01-color-switcher.350cde4d.js.map
