import{_ as d,c as Q,a as T,b as e,d as a,o as t}from"./app.b33521bb.js";const s="/course-notes/assets/character.977791b3.svg",o="/course-notes/assets/concatenation.ee19945e.svg",r="/course-notes/assets/alternative.ac27dcbb.svg",m="/course-notes/assets/repetition.e04a4d50.svg",n="/course-notes/assets/example-1.8ea2e17a.svg",l="/course-notes/assets/example-2.e084e6a5.svg",h="/course-notes/assets/a-star-nfa.0411109e.svg",g="/course-notes/assets/a-star-dfa.9ea0b4d5.svg",i="/course-notes/assets/example-3-nfa.86b59214.svg",p="/course-notes/assets/example-3-dfa.6d364220.svg",c="/course-notes/assets/example-4-nfa.45292d62.svg",V="/course-notes/assets/example-4-dfa.b0dfd30a.svg",D2=JSON.parse('{"title":"From Regular Expressions to Automata","description":"","frontmatter":{},"headers":[{"level":2,"title":"From a Regular Expression to an NFA","slug":"from-a-regular-expression-to-an-nfa","link":"#from-a-regular-expression-to-an-nfa","children":[{"level":3,"title":"Example","slug":"example","link":"#example","children":[]}]},{"level":2,"title":"From an NFA to a DFA","slug":"from-an-nfa-to-a-dfa","link":"#from-an-nfa-to-a-dfa","children":[{"level":3,"title":"Example 1","slug":"example-1","link":"#example-1","children":[]},{"level":3,"title":"Example 2","slug":"example-2","link":"#example-2","children":[]}]}],"relativePath":"courses/cse360-design-and-implementation-of-compiler/lexical-analysis/from-regular-expressions-to-automata.md"}'),H={name:"courses/cse360-design-and-implementation-of-compiler/lexical-analysis/from-regular-expressions-to-automata.md"},L=e("",5),f=T("thead",null,[T("tr",null,[T("th",null,"Element"),T("th",null,"Example")])],-1),w=T("td",null,"Empty string",-1),M={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},Z={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.439ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.244ex",height:"2.009ex",role:"img",focusable:"false",viewBox:"0 -694 1433.7 888"},y=e("",1),k=[y],_=T("tr",null,[T("td",null,"Character"),T("td",null,"a")],-1),x=T("tr",null,[T("td",null,"Concatenation"),T("td",null,"AB")],-1),u=T("tr",null,[T("td",null,"Alternative"),T("td",null,"A|B")],-1),v=T("tr",null,[T("td",null,"Repetition"),T("td",null,"A*")],-1),C=e("",17),D=a("For each state "),A={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},B={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.023ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.061ex",height:"1.023ex",role:"img",focusable:"false",viewBox:"0 -442 469 452"},b=T("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[T("g",{"data-mml-node":"math"},[T("g",{"data-mml-node":"mi"},[T("path",{"data-c":"1D460",d:"M131 289Q131 321 147 354T203 415T300 442Q362 442 390 415T419 355Q419 323 402 308T364 292Q351 292 340 300T328 326Q328 342 337 354T354 372T367 378Q368 378 368 379Q368 382 361 388T336 399T297 405Q249 405 227 379T204 326Q204 301 223 291T278 274T330 259Q396 230 396 163Q396 135 385 107T352 51T289 7T195 -10Q118 -10 86 19T53 87Q53 126 74 143T118 160Q133 160 146 151T160 120Q160 94 142 76T111 58Q109 57 108 57T107 55Q108 52 115 47T146 34T201 27Q237 27 263 38T301 66T318 97T323 122Q323 150 302 164T254 181T195 196T148 231Q131 256 131 289Z",style:{"stroke-width":"3"}})])])],-1),S=[b],j=a(", the closure set "),N={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},E={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.394ex",height:"2.283ex",role:"img",focusable:"false",viewBox:"0 -759 1500 1009"},F=e("",1),I=[F],P=a(" is a set of NFA states reachable from NFA state "),R={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},J={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.023ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.061ex",height:"1.023ex",role:"img",focusable:"false",viewBox:"0 -442 469 452"},G=T("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[T("g",{"data-mml-node":"math"},[T("g",{"data-mml-node":"mi"},[T("path",{"data-c":"1D460",d:"M131 289Q131 321 147 354T203 415T300 442Q362 442 390 415T419 355Q419 323 402 308T364 292Q351 292 340 300T328 326Q328 342 337 354T354 372T367 378Q368 378 368 379Q368 382 361 388T336 399T297 405Q249 405 227 379T204 326Q204 301 223 291T278 274T330 259Q396 230 396 163Q396 135 385 107T352 51T289 7T195 -10Q118 -10 86 19T53 87Q53 126 74 143T118 160Q133 160 146 151T160 120Q160 94 142 76T111 58Q109 57 108 57T107 55Q108 52 115 47T146 34T201 27Q237 27 263 38T301 66T318 97T323 122Q323 150 302 164T254 181T195 196T148 231Q131 256 131 289Z",style:{"stroke-width":"3"}})])])],-1),$=[G],q=a(" on "),W={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},z={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"0.919ex",height:"1ex",role:"img",focusable:"false",viewBox:"0 -431 406 442"},O=T("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[T("g",{"data-mml-node":"math"},[T("g",{"data-mml-node":"mi"},[T("path",{"data-c":"1D716",d:"M227 -11Q149 -11 95 41T40 174Q40 262 87 322Q121 367 173 396T287 430Q289 431 329 431H367Q382 426 382 411Q382 385 341 385H325H312Q191 385 154 277L150 265H327Q340 256 340 246Q340 228 320 219H138V217Q128 187 128 143Q128 77 160 52T231 26Q258 26 284 36T326 57T343 68Q350 68 354 58T358 39Q358 36 357 35Q354 31 337 21T289 0T227 -11Z",style:{"stroke-width":"3"}})])])],-1),K=[O],U=a("-transitions alone."),X=T("p",null,[a("Consider the following NFA corresponding to the regular expression "),T("code",null,"a*"),a(" under Thompson\u2019s construction")],-1),Y=T("p",null,[T("img",{src:h,alt:"a-star-nfa"})],-1),T1=T("p",null,"In this NFA, we have",-1),Q1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},t1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"14.079ex",height:"2.79ex",role:"img",focusable:"false",viewBox:"0 -983 6222.9 1233"},a1=e("",1),e1=[a1],d1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},s1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"9.804ex",height:"2.79ex",role:"img",focusable:"false",viewBox:"0 -983 4333.6 1233"},o1=e("",1),r1=[o1],m1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},n1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"14.079ex",height:"2.787ex",role:"img",focusable:"false",viewBox:"0 -982 6222.9 1232"},l1=e("",1),h1=[l1],g1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},i1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"9.804ex",height:"2.814ex",role:"img",focusable:"false",viewBox:"0 -994 4333.6 1244"},p1=e("",1),c1=[p1],V1=a("As we can see, the closure set "),H1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},L1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.394ex",height:"2.283ex",role:"img",focusable:"false",viewBox:"0 -759 1500 1009"},f1=e("",1),w1=[f1],M1=a(" for state "),Z1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},y1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.023ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.061ex",height:"1.023ex",role:"img",focusable:"false",viewBox:"0 -442 469 452"},k1=T("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[T("g",{"data-mml-node":"math"},[T("g",{"data-mml-node":"mi"},[T("path",{"data-c":"1D460",d:"M131 289Q131 321 147 354T203 415T300 442Q362 442 390 415T419 355Q419 323 402 308T364 292Q351 292 340 300T328 326Q328 342 337 354T354 372T367 378Q368 378 368 379Q368 382 361 388T336 399T297 405Q249 405 227 379T204 326Q204 301 223 291T278 274T330 259Q396 230 396 163Q396 135 385 107T352 51T289 7T195 -10Q118 -10 86 19T53 87Q53 126 74 143T118 160Q133 160 146 151T160 120Q160 94 142 76T111 58Q109 57 108 57T107 55Q108 52 115 47T146 34T201 27Q237 27 263 38T301 66T318 97T323 122Q323 150 302 164T254 181T195 196T148 231Q131 256 131 289Z",style:{"stroke-width":"3"}})])])],-1),_1=[k1],x1=a(" must contains itself. Next, we shall find the transitions between these closure sets. We start from "),u1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},v1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"14.079ex",height:"2.79ex",role:"img",focusable:"false",viewBox:"0 -983 6222.9 1233"},C1=e("",1),D1=[C1],A1=a(", and we examine what states we can go to from state 1, 2 and 4 but not using "),B1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},b1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"0.919ex",height:"1ex",role:"img",focusable:"false",viewBox:"0 -431 406 442"},S1=T("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[T("g",{"data-mml-node":"math"},[T("g",{"data-mml-node":"mi"},[T("path",{"data-c":"1D716",d:"M227 -11Q149 -11 95 41T40 174Q40 262 87 322Q121 367 173 396T287 430Q289 431 329 431H367Q382 426 382 411Q382 385 341 385H325H312Q191 385 154 277L150 265H327Q340 256 340 246Q340 228 320 219H138V217Q128 187 128 143Q128 77 160 52T231 26Q258 26 284 36T326 57T343 68Q350 68 354 58T358 39Q358 36 357 35Q354 31 337 21T289 0T227 -11Z",style:{"stroke-width":"3"}})])])],-1),j1=[S1],N1=a("-transition. Here, there's only one transition, "),E1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},F1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.023ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.197ex",height:"1.02ex",role:"img",focusable:"false",viewBox:"0 -441 529 451"},I1=T("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[T("g",{"data-mml-node":"math"},[T("g",{"data-mml-node":"mi"},[T("path",{"data-c":"1D44E",d:"M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z",style:{"stroke-width":"3"}})])])],-1),P1=[I1],R1=a(", therefore"),J1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},G1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"14.581ex",height:"2.985ex",role:"img",focusable:"false",viewBox:"0 -1069.2 6444.9 1319.2"},$1=e("",1),q1=[$1],W1=a("And keep going with "),z1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},O1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"3.394ex",height:"2.787ex",role:"img",focusable:"false",viewBox:"0 -982 1500 1232"},K1=e("",1),U1=[K1],X1={class:"MathJax",jax:"SVG",style:{direction:"ltr"}},Y1={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"14.079ex",height:"2.787ex",role:"img",focusable:"false",viewBox:"0 -982 6222.9 1232"},T2=e("",1),Q2=[T2],t2=T("p",null,"By now, we've walk through all of the transitions and we get a DFA transition graph",-1),a2=T("p",null,[T("img",{src:g,alt:"a-star-dfa"})],-1),e2=T("h3",{id:"example-1",tabindex:"-1"},[a("Example 1 "),T("a",{class:"header-anchor",href:"#example-1","aria-hidden":"true"},"#")],-1),d2=T("p",null,"Let's look at a more complicated example",-1),s2=T("p",null,[T("img",{src:i,alt:"example-3-nfa"})],-1),o2=T("p",null,"Perform the same procedures as above",-1),r2={class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0"}},m2={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-4.921ex"},xmlns:"http://www.w3.org/2000/svg",width:"38.214ex",height:"10.973ex",role:"img",focusable:"false",viewBox:"0 -2675.1 16890.7 4850.3"},n2=e("",1),l2=[n2],h2=T("p",null,"Noted that if the new state contains a final state, then it becomes a final state as well.",-1),g2=T("p",null,[T("img",{src:p,alt:"example-3-dfa"})],-1),i2=T("h3",{id:"example-2",tabindex:"-1"},[a("Example 2 "),T("a",{class:"header-anchor",href:"#example-2","aria-hidden":"true"},"#")],-1),p2=T("p",null,"Consider the regular expression and the corresponding NFA transition graph",-1),c2=T("p",null,[T("code",null,"letter(letter|digit)*")],-1),V2=T("p",null,[T("img",{src:c,alt:"example-4-nfa"})],-1),H2={class:"MathJax",jax:"SVG",display:"true",style:{direction:"ltr",display:"block","text-align":"center",margin:"1em 0"}},L2={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-15.859ex"},xmlns:"http://www.w3.org/2000/svg",width:"49.803ex",height:"32.85ex",role:"img",focusable:"false",viewBox:"0 -7509.8 22012.9 14519.6"},f2=e("",1),w2=[f2],M2=T("p",null,[T("img",{src:V,alt:"example-4-dfa"})],-1);function Z2(y2,k2,_2,x2,u2,v2){return t(),Q("div",null,[L,T("table",null,[f,T("tbody",null,[T("tr",null,[w,T("td",null,[T("mjx-container",M,[(t(),Q("svg",Z,k))])])]),_,x,u,v])]),C,T("p",null,[D,T("mjx-container",A,[(t(),Q("svg",B,S))]),j,T("mjx-container",N,[(t(),Q("svg",E,I))]),P,T("mjx-container",R,[(t(),Q("svg",J,$))]),q,T("mjx-container",W,[(t(),Q("svg",z,K))]),U]),X,Y,T1,T("ul",null,[T("li",null,[T("mjx-container",Q1,[(t(),Q("svg",t1,e1))])]),T("li",null,[T("mjx-container",d1,[(t(),Q("svg",s1,r1))])]),T("li",null,[T("mjx-container",m1,[(t(),Q("svg",n1,h1))])]),T("li",null,[T("mjx-container",g1,[(t(),Q("svg",i1,c1))])])]),T("p",null,[V1,T("mjx-container",H1,[(t(),Q("svg",L1,w1))]),M1,T("mjx-container",Z1,[(t(),Q("svg",y1,_1))]),x1,T("mjx-container",u1,[(t(),Q("svg",v1,D1))]),A1,T("mjx-container",B1,[(t(),Q("svg",b1,j1))]),N1,T("mjx-container",E1,[(t(),Q("svg",F1,P1))]),R1]),T("p",null,[T("mjx-container",J1,[(t(),Q("svg",G1,q1))])]),T("p",null,[W1,T("mjx-container",z1,[(t(),Q("svg",O1,U1))])]),T("p",null,[T("mjx-container",X1,[(t(),Q("svg",Y1,Q2))])]),t2,a2,e2,d2,s2,o2,T("mjx-container",r2,[(t(),Q("svg",m2,l2))]),h2,g2,i2,p2,c2,V2,T("mjx-container",H2,[(t(),Q("svg",L2,w2))]),M2])}const A2=d(H,[["render",Z2]]);export{D2 as __pageData,A2 as default};