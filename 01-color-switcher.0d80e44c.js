!function(){var e,t=document.querySelector("body"),n=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");n.addEventListener("click",(function(){e=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),n.disabled=!0,a.disabled=!1}),1e3)})),a.addEventListener("click",(function(){clearInterval(e),n.disabled=!1,a.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.0d80e44c.js.map