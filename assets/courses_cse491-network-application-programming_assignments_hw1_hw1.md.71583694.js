import{_ as s,c as n,o as a,b as t}from"./app.eea76462.js";const e="/course-notes/assets/screenshot.40988b7e.png",y=JSON.parse('{"title":"Homework 1","description":"","frontmatter":{},"headers":[{"level":2,"title":"Introduction","slug":"introduction","link":"#introduction","children":[]},{"level":2,"title":"HTTPS","slug":"https","link":"#https","children":[]},{"level":2,"title":"SSH","slug":"ssh","link":"#ssh","children":[]},{"level":2,"title":"UDP","slug":"udp","link":"#udp","children":[]},{"level":2,"title":"Screen Shot","slug":"screen-shot","link":"#screen-shot","children":[]}],"relativePath":"courses/cse491-network-application-programming/assignments/hw1/hw1.md"}'),o={name:"courses/cse491-network-application-programming/assignments/hw1/hw1.md"},p=t(`<h1 id="homework-1" tabindex="-1">Homework 1 <a class="header-anchor" href="#homework-1" aria-hidden="true">#</a></h1><h5 id="cse491-network-application-programming-sping-2021" tabindex="-1">CSE491 Network Application Programming, Sping 2021 <a class="header-anchor" href="#cse491-network-application-programming-sping-2021" aria-hidden="true">#</a></h5><h5 id="instructor-you-chiun-wang" tabindex="-1">Instructor: You-Chiun Wang <a class="header-anchor" href="#instructor-you-chiun-wang" aria-hidden="true">#</a></h5><h5 id="author-b073040018-\u6731\u52AD\u74BF" tabindex="-1">Author: B073040018 \u6731\u52AD\u74BF <a class="header-anchor" href="#author-b073040018-\u6731\u52AD\u74BF" aria-hidden="true">#</a></h5><h5 id="national-sun-yat-sen-university" tabindex="-1">National Sun Yat-sen University <a class="header-anchor" href="#national-sun-yat-sen-university" aria-hidden="true">#</a></h5><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h2><table><thead><tr><th>Environments</th><th></th></tr></thead><tbody><tr><td>Device</td><td>MackBook Pro (15-inch, 2017)</td></tr><tr><td>Operating system</td><td>macOS Big Sur 11.2.3</td></tr><tr><td>Location</td><td>Info-Libaray Building 3F, NSYSU</td></tr><tr><td>Wi-Fi SSID</td><td>TANetRoaming</td></tr></tbody></table><p>First, inspect the Internet interfaces on my computer</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">networksetup -listallhardwareports</span></span>
<span class="line"></span></code></pre></div><p>I got ports for Wi-Fi, Bluetooth PAN, and many Thunderbolt ports since I don&#39;t have Ethernet port on my device but four Thunderbolt ports in the form of USB Type-C.</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">Hardware Port: Wi-Fi</span></span>
<span class="line"><span style="color:#A6ACCD;">Device: en0</span></span>
<span class="line"><span style="color:#A6ACCD;">Ethernet Address: 8c:85:90:67:f8:e6</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Hardware Port: Bluetooth PAN</span></span>
<span class="line"><span style="color:#A6ACCD;">Device: en6</span></span>
<span class="line"><span style="color:#A6ACCD;">Ethernet Address: 8c:85:90:63:29:04</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Hardware Port: Thunderbolt 1</span></span>
<span class="line"><span style="color:#A6ACCD;">Device: en1</span></span>
<span class="line"><span style="color:#A6ACCD;">Ethernet Address: 82:da:01:04:08:01</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>Other Tunderbolt ports are truncated</p></blockquote><p>I&#39;m using Wi-Fi so I&#39;ll focus on only en0. Also, I&#39;ll filter out the connections with Apple&#39;s server, with which my computer constantly exchange data with, by <code>not host 17.248</code>. For example</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">tcpdump -ien0 not host 17.248</span></span>
<span class="line"></span></code></pre></div><h2 id="https" tabindex="-1">HTTPS <a class="header-anchor" href="#https" aria-hidden="true">#</a></h2><p>Let&#39;s first watch a YouTube Video on the browser and listen for packets through port 443. I assume YouTube would use TCP since it presents high quality videos. When a connection is established in TCP, we may observe <strong>SYN</strong> and <strong>ACK</strong>. Let&#39;s look at the TCP header.</p><table><tr><th colspan="16">0</th><th colspan="16">15</th></tr><tr><td colspan="16">source port number</td><td colspan="16">destination port number</td></tr><tr><td colspan="32">32-bit sequence number</td></tr><tr><td colspan="32">32-bit acknowledgement number</td></tr><tr><td colspan="4">header length</td><td colspan="6">6-bit reserved</td><td colspan="1">U</td><td colspan="1">A</td><td colspan="1">P</td><td colspan="1">R</td><td colspan="1">S</td><td colspan="1">F</td><td colspan="16">window size</td></tr><tr><td colspan="16">TCP checksum</td><td colspan="16">urgent pointer</td></tr></table><p>Assume we store the header in an array <code>tcp</code> with <code>sizeof(tcp)</code> equals 1 byte. Then the flags are located at <code>tcp[13]</code> (little endian). We can check if a packet is a</p><ul><li><strong>ACK</strong> by <code>tcp[13] &amp; (1&lt;&lt;4) != 0</code></li><li><strong>SYN</strong> by <code>tcp[13] &amp; (1&lt;&lt;1) != 0</code>.</li></ul><p>Therefore, try this command and start playing YouTube</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">tcpdump -ien0 -c4 -q </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tcp[13] &amp; 2 != 0</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> and port 443 and not host 17.248</span></span>
<span class="line"></span></code></pre></div><p>where <code>-c4</code> specifies showing only 10 next records, and <code>-q</code> gives us a shorter output. We than get</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">19:28:23.269026 IP 172.20.18.78.64089 &gt; cache.google.com.https: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">19:28:23.269670 IP 172.20.18.78.64090 &gt; cache.google.com.https: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">19:28:23.271292 IP cache.google.com.https &gt; 172.20.18.78.64089: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">19:28:23.274418 IP cache.google.com.https &gt; 172.20.18.78.64090: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Cool! Four SYN packets were captured within 0.01 second. Both of my computer and the server from Google were sending packets, that probabily means a handshaking. Let&#39;s invite ACK to join the party!</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">tcpdump -ien0 -q -c10 </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tcp[13] &amp; 18 != 0</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> and port 443 and not host 17.248</span></span>
<span class="line"></span></code></pre></div><p>We got</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.64328 &gt; tsa03s06-in-f22.1e100.net.https: tcp 123</span></span>
<span class="line"><span style="color:#A6ACCD;">IP tsa03s06-in-f22.1e100.net.https &gt; 172.20.18.78.64328: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">IP tsa03s06-in-f22.1e100.net.https &gt; 172.20.18.78.64328: tcp 113</span></span>
<span class="line"><span style="color:#A6ACCD;">IP tsa03s06-in-f22.1e100.net.https &gt; 172.20.18.78.64328: tcp 1418</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.64328 &gt; tsa03s06-in-f22.1e100.net.https: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">IP tsa03s06-in-f22.1e100.net.https &gt; 172.20.18.78.64328: tcp 1418</span></span>
<span class="line"><span style="color:#A6ACCD;">IP tsa03s06-in-f22.1e100.net.https &gt; 172.20.18.78.64328: tcp 1418</span></span>
<span class="line"><span style="color:#A6ACCD;">IP tsa03s06-in-f22.1e100.net.https &gt; 172.20.18.78.64328: tcp 1418</span></span>
<span class="line"><span style="color:#A6ACCD;">IP tsa03s06-in-f22.1e100.net.https &gt; 172.20.18.78.64328: tcp 1418</span></span>
<span class="line"><span style="color:#A6ACCD;">IP tsa03s06-in-f22.1e100.net.https &gt; 172.20.18.78.64328: tcp 1418</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>Timestamps are truncated</p></blockquote><p>There&#39;re many packets with size of <strong>1418</strong>, I can somehow assure that they are <strong>DATA</strong> segments. Two of them have size of <strong>0</strong>, judging from above where we only capture SYN, I think then&#39;re SYN packets. Finally, two of them are in between the SYNs but have size of around <strong>120</strong>, I think they are <strong>ACK</strong> packets without data payload.</p><blockquote><p>If you look up the address <code>tsa03s06-in-f22.1e100.net</code>, you&#39;ll find it&#39;s also of Google&#39;s</p></blockquote><h2 id="ssh" tabindex="-1">SSH <a class="header-anchor" href="#ssh" aria-hidden="true">#</a></h2><p>Next up, let&#39;s login to <strong><a href="http://ptt.cc" target="_blank" rel="noreferrer">ptt.cc</a></strong> via ssh. It&#39;s TCP also.</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">ssh bbsu@ptt.cc</span></span>
<span class="line"></span></code></pre></div><p>Since ssh uses port 22. We would listen for packets through port 22. This time, we catch all types of packets.</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">tcpdump -ien0 -q -c10 port 22 </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Because this port isn&#39;t as busy as HTTPS, we got a much cleaner output</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.64512 &gt; 140.112.172.1.ssh: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 140.112.172.1.ssh &gt; 172.20.18.78.64512: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.64512 &gt; 140.112.172.1.ssh: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.64512 &gt; 140.112.172.1.ssh: tcp 21</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 140.112.172.1.ssh &gt; 172.20.18.78.64512: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 140.112.172.1.ssh &gt; 172.20.18.78.64512: tcp 40</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.64512 &gt; 140.112.172.1.ssh: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.64512 &gt; 140.112.172.1.ssh: tcp 1392</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 140.112.172.1.ssh &gt; 172.20.18.78.64512: tcp 1072</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.64512 &gt; 140.112.172.1.ssh: tcp 0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>Timestamps are truncated</p></blockquote><p><code>140.112</code>, It&#39;s NTU of course! With the experiment above, we can now analyze these packets more easily. First, our computer sends a <strong>SYN</strong> and the server from NTU sends a ACK of SYN. Oh no, it seems that our inference above was wrong. Based on what we&#39;ve learned in class, the first three packets are usually for three-way handshaking, thus both SYN and ACK with no data are of size <strong>0</strong>.</p><h2 id="udp" tabindex="-1">UDP <a class="header-anchor" href="#udp" aria-hidden="true">#</a></h2><p>With most of the applications using TCP, I wonder how can I find a application using UDP. Well, let&#39;s just directly listen on packets using UDP.</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">tcpdump -ien0 -q -c10 udp</span></span>
<span class="line"></span></code></pre></div><p>Got</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.57834 &gt; dns.nsysu.edu.tw.domain: UDP, length 32</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.54530 &gt; dns.nsysu.edu.tw.domain: UDP, length 32</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.61543 &gt; dns.nsysu.edu.tw.domain: UDP, length 43</span></span>
<span class="line"><span style="color:#A6ACCD;">IP dns.nsysu.edu.tw.domain &gt; 172.20.18.78.57834: UDP, length 82</span></span>
<span class="line"><span style="color:#A6ACCD;">IP dns.nsysu.edu.tw.domain &gt; 172.20.18.78.54530: UDP, length 296</span></span>
<span class="line"><span style="color:#A6ACCD;">IP dns.nsysu.edu.tw.domain &gt; 172.20.18.78.61543: UDP, length 166</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.53708 &gt; 239.255.255.250.ssdp: UDP, length 174</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.33063 &gt; 239.255.255.250.ssdp: UDP, length 174</span></span>
<span class="line"><span style="color:#A6ACCD;">IP 172.20.18.78.53555 &gt; dns.nsysu.edu.tw.domain: UDP, length 46</span></span>
<span class="line"><span style="color:#A6ACCD;">IP dns.nsysu.edu.tw.domain &gt; 172.20.18.78.53555: UDP, length 103</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>Timestamps are truncated</p></blockquote><p>Turn out, <strong>DNS</strong> uses UDP, and it constently synchrnized with my computer. We know that DNS has a hierarchy and since I&#39;m under the Wi-Fi of NSYSU, the closest DNS server is located in the campus network. I also noticed that UDP typically uses ports with higher value around 50000-60000.</p><p>The other interesting thing is the <strong>ssdp</strong> suffix. It seems to be a protocol under <strong>UPnP</strong>. And it&#39;s <strong>dangerous</strong> according to many forum. Is there anything I need to worry?</p><h2 id="screen-shot" tabindex="-1">Screen Shot <a class="header-anchor" href="#screen-shot" aria-hidden="true">#</a></h2><p><img src="`+e+'" alt="screenshot"></p>',49),l=[p];function c(r,i,d,h,u,g){return a(),n("div",null,l)}const C=s(o,[["render",c]]);export{y as __pageData,C as default};
