const s = document.createElement('SCRIPT');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = ()=>{s.remove()}