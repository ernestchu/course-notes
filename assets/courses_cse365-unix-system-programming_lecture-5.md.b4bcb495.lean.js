import{_ as t,c as e,a as s,b as o,d as a,o as n}from"./app.eea76462.js";const p="/course-notes/assets/a-a-star.22556830.svg",l="/course-notes/assets/a-star-a.ccd63c61.svg",r="/course-notes/assets/floating-point.e4b80ea7.svg",O=JSON.parse('{"title":"Lecture 5","description":"","frontmatter":{},"headers":[{"level":2,"title":"The greps","slug":"the-greps","link":"#the-greps","children":[{"level":3,"title":"Important flags","slug":"important-flags","link":"#important-flags","children":[]}]},{"level":2,"title":"fgrep","slug":"fgrep","link":"#fgrep","children":[{"level":3,"title":"Limitation","slug":"limitation","link":"#limitation","children":[]}]},{"level":2,"title":"grep","slug":"grep","link":"#grep","children":[{"level":3,"title":"Regular expression (regex) symbols","slug":"regular-expression-regex-symbols","link":"#regular-expression-regex-symbols","children":[]},{"level":3,"title":"Exercise","slug":"exercise","link":"#exercise","children":[]}]},{"level":2,"title":"Regex vs. Wildcards","slug":"regex-vs-wildcards","link":"#regex-vs-wildcards","children":[{"level":3,"title":"The brackets []","slug":"the-brackets","link":"#the-brackets","children":[]},{"level":3,"title":"Exercise","slug":"exercise-1","link":"#exercise-1","children":[]},{"level":3,"title":"Time for wilcards","slug":"time-for-wilcards","link":"#time-for-wilcards","children":[]}]},{"level":2,"title":"More Regular Expression Syntax","slug":"more-regular-expression-syntax","link":"#more-regular-expression-syntax","children":[{"level":3,"title":"Repetition","slug":"repetition","link":"#repetition","children":[]},{"level":3,"title":"The end of a word","slug":"the-end-of-a-word","link":"#the-end-of-a-word","children":[]},{"level":3,"title":"The start of a word","slug":"the-start-of-a-word","link":"#the-start-of-a-word","children":[]},{"level":3,"title":"Group","slug":"group","link":"#group","children":[]},{"level":3,"title":"Backreference","slug":"backreference","link":"#backreference","children":[]},{"level":3,"title":"POSIX built-in patterns","slug":"posix-built-in-patterns","link":"#posix-built-in-patterns","children":[]}]},{"level":2,"title":"Extended Regular Expressions","slug":"extended-regular-expressions","link":"#extended-regular-expressions","children":[{"level":3,"title":"Compare grep and egrep","slug":"compare-grep-and-egrep","link":"#compare-grep-and-egrep","children":[]}]}],"relativePath":"courses/cse365-unix-system-programming/lecture-5.md"}'),c={name:"courses/cse365-unix-system-programming/lecture-5.md"},i=o("",50),d=s("thead",null,[s("tr",null,[s("th",null,"Expression"),s("th",null,"Description")])],-1),h=s("tr",null,[s("td",null,[s("code",null,"\\{x\\}")]),s("td",null,[a("Matches "),s("code",null,"x"),a(" repetitions of the preceding regex.")])],-1),y=s("tr",null,[s("td",null,[s("code",null,"\\{x,y\\}")]),s("td",null,[a("Matches "),s("code",null,"x"),a(" to "),s("code",null,"y"),a(" repetitions of the preceding regex.")])],-1),D=s("td",null,[s("code",null,"\\{,x\\}")],-1),C=a("Matches if the number of repetitions of the preceding regex "),A={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},g={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.312ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.76ex",height:"1.751ex",role:"img",focusable:"false",viewBox:"0 -636 778 774"},u=s("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[s("g",{"data-mml-node":"math"},[s("g",{"data-mml-node":"mo"},[s("path",{"data-c":"2264",d:"M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z",style:{"stroke-width":"3"}})])])],-1),F=[u],f=a(),m=s("code",null,"x",-1),b=a("."),x=s("td",null,[s("code",null,"\\{x,\\}")],-1),w=a("Matches if the number of repetitions of the preceding regex "),_={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},E={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.312ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.76ex",height:"1.751ex",role:"img",focusable:"false",viewBox:"0 -636 778 774"},v=s("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[s("g",{"data-mml-node":"math"},[s("g",{"data-mml-node":"mo"},[s("path",{"data-c":"2265",d:"M83 616Q83 624 89 630T99 636Q107 636 253 568T543 431T687 361Q694 356 694 346T687 331Q685 329 395 192L107 56H101Q83 58 83 76Q83 77 83 79Q82 86 98 95Q117 105 248 167Q326 204 378 228L626 346L360 472Q291 505 200 548Q112 589 98 597T83 616ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z",style:{"stroke-width":"3"}})])])],-1),k=[v],T=a(),q=s("code",null,"x",-1),z=a("."),S=s("tr",null,[s("td",null,[s("code",null,"\\>")]),s("td",null,[a("The preceding regex must end at the end of a "),s("strong",null,"word"),a(".")])],-1),Q=s("tr",null,[s("td",null,[s("code",null,"\\<")]),s("td",null,[a("The preceding regex must end at the start of a "),s("strong",null,"word"),a(".")])],-1),B=s("tr",null,[s("td",null,[s("code",null,"\\(...\\)")]),s("td",null,[a("Define a "),s("strong",null,"group"),a(" for a sub-portion of the regex. A group can be used before "),s("code",null,"*"),a(" or "),s("code",null,"\\{...\\}"),a(", which match the repetition of the entire group.")])],-1),I=s("tr",null,[s("td",null,[s("code",null,"\\1"),a(", "),s("code",null,"\\2"),a(", etc.")]),s("td",null,"Backreference. Identify a rematch to the earlier pattern. We'll see the detail below.")],-1),R=o("",54);function M(L,j,$,H,W,P){return n(),e("div",null,[i,s("table",null,[d,s("tbody",null,[h,y,s("tr",null,[D,s("td",null,[C,s("mjx-container",A,[(n(),e("svg",g,F))]),f,m,b])]),s("tr",null,[x,s("td",null,[w,s("mjx-container",_,[(n(),e("svg",E,k))]),T,q,z])]),S,Q,B,I])]),R])}const V=t(c,[["render",M]]);export{O as __pageData,V as default};
