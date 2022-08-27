import{_ as e,c as s,o as a,b as t}from"./app.b33521bb.js";const g=JSON.parse('{"title":"Lecture 1","description":"","frontmatter":{},"headers":[{"level":2,"title":"The Unix Philosophy","slug":"the-unix-philosophy","link":"#the-unix-philosophy","children":[{"level":3,"title":"Introducing Unix commands","slug":"introducing-unix-commands","link":"#introducing-unix-commands","children":[]}]},{"level":2,"title":"Viewing Files","slug":"viewing-files","link":"#viewing-files","children":[{"level":3,"title":"Useful but less important commands","slug":"useful-but-less-important-commands","link":"#useful-but-less-important-commands","children":[]}]},{"level":2,"title":"Navigating in Unix","slug":"navigating-in-unix","link":"#navigating-in-unix","children":[{"level":3,"title":"Absolute & Relative addressing","slug":"absolute-relative-addressing","link":"#absolute-relative-addressing","children":[]}]},{"level":2,"title":"File Creation and Deletion","slug":"file-creation-and-deletion","link":"#file-creation-and-deletion","children":[]},{"level":2,"title":"Wildcards","slug":"wildcards","link":"#wildcards","children":[{"level":3,"title":"Exercise","slug":"exercise","link":"#exercise","children":[]}]},{"level":2,"title":"Managing Files and Directories","slug":"managing-files-and-directories","link":"#managing-files-and-directories","children":[{"level":3,"title":"ln","slug":"ln","link":"#ln","children":[]},{"level":3,"title":"chmod","slug":"chmod","link":"#chmod","children":[]},{"level":3,"title":"diff","slug":"diff","link":"#diff","children":[]}]}],"relativePath":"courses/cse365-unix-system-programming/lecture-1.md"}'),n={name:"courses/cse365-unix-system-programming/lecture-1.md"},o=t(`<h1 id="lecture-1" tabindex="-1">Lecture 1 <a class="header-anchor" href="#lecture-1" aria-hidden="true">#</a></h1><h2 id="the-unix-philosophy" tabindex="-1">The Unix Philosophy <a class="header-anchor" href="#the-unix-philosophy" aria-hidden="true">#</a></h2><ul><li>Provide tools that do one thing <strong>well</strong></li><li>Let you combine these simple tools into a more powerful Unix commands</li><li>Treat all communication as being via <strong>files</strong></li><li>A file is modeled as a <strong>character stream</strong>, for example <ul><li>The keyboard input &amp; screen output</li><li>Input from or output to a file by <strong>redirection</strong> or <strong>pipeline</strong></li></ul></li></ul><h3 id="introducing-unix-commands" tabindex="-1">Introducing Unix commands <a class="header-anchor" href="#introducing-unix-commands" aria-hidden="true">#</a></h3><p>Commands consist of</p><ul><li>A name</li><li>Optional flags</li><li>Arguments</li></ul><p>For example: Flag <code>-n</code> display files with line numbers.</p><table><thead><tr><th>Name</th><th>Flag</th><th>Argument</th></tr></thead><tbody><tr><td><code>cat</code></td><td><code>-n</code></td><td><code>filename</code></td></tr></tbody></table><h4 id="for-any-command-you-can-easily-find-the-usage-with-flags-and-arguments-by" tabindex="-1">For any command, you can easily find the usage with flags and arguments by <a class="header-anchor" href="#for-any-command-you-can-easily-find-the-usage-with-flags-and-arguments-by" aria-hidden="true">#</a></h4><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">man </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">command name</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><h2 id="viewing-files" tabindex="-1">Viewing Files <a class="header-anchor" href="#viewing-files" aria-hidden="true">#</a></h2><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>cat [filename]</code></td><td>Display a file on screen</td></tr><tr><td><code>cat -n [filename]</code></td><td>Display a file with line numbers</td></tr><tr><td><code>less [filename]</code></td><td>Display a file as a book (you can scroll back &amp; forth)</td></tr><tr><td><code>head -n [filename]</code></td><td>Display the first n lines</td></tr><tr><td><code>tail -n [filename]</code></td><td>Display the last n lines</td></tr><tr><td><code>paste [filename]</code></td><td><code>cat</code> concatenates <strong>vertically</strong> while <code>paste</code> pastes <strong>horizontally</strong></td></tr></tbody></table><h3 id="useful-but-less-important-commands" tabindex="-1">Useful but less important commands <a class="header-anchor" href="#useful-but-less-important-commands" aria-hidden="true">#</a></h3><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>tac [filename]</code></td><td><code>cat</code> file upside-down (<code>cat</code>-&gt;<code>tac</code>)</td></tr><tr><td><code>rev [filename]</code></td><td><code>cat</code> file horizontally reversed</td></tr><tr><td><code>fold [filename]</code></td><td>Fold long lines for finite width output device</td></tr></tbody></table><h2 id="navigating-in-unix" tabindex="-1">Navigating in Unix <a class="header-anchor" href="#navigating-in-unix" aria-hidden="true">#</a></h2><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>ls</code></td><td>list files and directories in a directory</td></tr><tr><td><code>cd [directory]</code></td><td>change current directory</td></tr><tr><td><code>pwd</code></td><td>print working directory</td></tr></tbody></table><h3 id="absolute-relative-addressing" tabindex="-1">Absolute &amp; Relative addressing <a class="header-anchor" href="#absolute-relative-addressing" aria-hidden="true">#</a></h3><p>For example</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">/ </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 bin</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 etc</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 home</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0 \u251C\u2500\u2500 alice</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0 \u2502\xA0\xA0 \u251C\u2500\u2500 document </span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0 \u2502\xA0\xA0 \u251C\u2500\u2500 download</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0 \u2502\xA0\xA0 \u251C\u2500\u2500 image</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0 \u2502\xA0\xA0 \u2514\u2500\u2500 video</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0 \u2514\u2500\u2500 bob</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0     \u251C\u2500\u2500 document</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0     \u251C\u2500\u2500 download</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0     \u251C\u2500\u2500 image</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502\xA0\xA0     \u2514\u2500\u2500 video</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 tmp</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500\u2500 usr</span></span>
<span class="line"></span></code></pre></div><p>If we are currently under the directory <code>alice</code> and want to change to the directory the star noted, we can use</p><table><thead><tr><th>Absolute Path</th><th>Relative Path</th></tr></thead><tbody><tr><td><code>cd /home/alice/document</code></td><td><code>cd document</code></td></tr></tbody></table><p>Also, if I logged in as Alice, <code>/home/alice</code> equals <code>~alice</code> and <code>~</code>. So I can go to alice&#39;s document from anywhere by <code>cd ~/document</code>, which is an absolute path.</p><p>If we are at the directory <code>alice</code> and want to go to bob&#39;s document, we can use <code>cd ../bob/document</code>. Because <code>..</code> means the parent directory (<code>.</code> means the current one, that why we used <code>./</code> to execute executable under the current directory)</p><p>Or we can simply just use <code>cd ~bob/document</code></p><h2 id="file-creation-and-deletion" tabindex="-1">File Creation and Deletion <a class="header-anchor" href="#file-creation-and-deletion" aria-hidden="true">#</a></h2><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>cp [src] [dst]</code></td><td>copy files</td></tr><tr><td><code>mv [src] [dst]</code></td><td>move files</td></tr><tr><td><code>rm</code></td><td>remove files</td></tr><tr><td><code>mkdir</code></td><td>create directory</td></tr><tr><td><code>rm -r</code></td><td>remove files recursively (remove directory)</td></tr></tbody></table><p>If you use <code>cp</code> or <code>mv</code> with more than two arguments, the last one must be a directory and rest of the files will be copied into that directory with the name intact</p><h2 id="wildcards" tabindex="-1">Wildcards <a class="header-anchor" href="#wildcards" aria-hidden="true">#</a></h2><ul><li><code>*</code> can replace any strings with arbitrary length</li><li><code>?</code> can replace exactly one charator.</li></ul><p>For example</p><table><thead><tr><th>name</th><th>effect</th></tr></thead><tbody><tr><td><code>a*</code></td><td>all files starting with <code>a</code></td></tr><tr><td><code>*a*</code></td><td>all files with <code>a</code> in their names</td></tr><tr><td><code>*.cpp</code></td><td>all files with <code>.cpp</code> extension</td></tr><tr><td><code>?????</code></td><td>all files with 5-charater names</td></tr></tbody></table><p>You can use them with a set or a range as well</p><table><thead><tr><th>name</th><th>effect</th></tr></thead><tbody><tr><td><code>[abc]*</code></td><td>all files with the name contains <code>a</code>, <code>b</code> or <code>c</code></td></tr><tr><td><code>[a-c]*</code></td><td>same as above</td></tr><tr><td><code>[^a-c]</code></td><td>all files with the name <strong>not</strong> contains <code>a</code>, <code>b</code> or <code>c</code></td></tr><tr><td><code>[ab^c]</code></td><td>all files with the name contains <code>a</code>, <code>b</code>, <code>^</code> or <code>c</code></td></tr></tbody></table><div class="warning custom-block"><p class="custom-block-title">Remarks</p><ul><li>You might think that the order w.r.t the range is based on ASCII but it&#39;s not.</li><li>It depends on the shell. Some shell would allow you to do <code>a-B</code> but not <code>A-b</code>.</li><li>The inverse <code>^</code> only works if it is the first character, otherwise it would be treated as a key.</li></ul></div><h3 id="exercise" tabindex="-1">Exercise <a class="header-anchor" href="#exercise" aria-hidden="true">#</a></h3><p>Assume</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">% ls -l</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 user  group  0 Feb 23 23:24 file1</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 user  group  0 Feb 23 23:24 file2</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 user  group  0 Feb 23 23:24 zfile</span></span>
<span class="line"></span></code></pre></div><p>Perform</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">cp </span><span style="color:#89DDFF;">*</span></span>
<span class="line"></span></code></pre></div><p><strong>Problem:</strong> What&#39;s the effect?</p><div class="tip custom-block"><p class="custom-block-title">Answer</p><p>Error, because what <code>*</code> expands into will be <code>file1 file2 zfile</code>, but zfile is not a directory hence can&#39;t perform the copy.</p></div><p>Assume</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">% ls -l</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 user  group   0 Feb 23 23:38 file1</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 user  group   0 Feb 23 23:38 file2</span></span>
<span class="line"><span style="color:#A6ACCD;">drwxr-xr-x@ 2 user  group  64 Feb 23 23:38 zdir</span></span>
<span class="line"></span></code></pre></div><p>Perform</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">cp </span><span style="color:#89DDFF;">*</span></span>
<span class="line"></span></code></pre></div><p><strong>Problem:</strong> What&#39;s the effect?</p><div class="tip custom-block"><p class="custom-block-title">Answer</p><p><code>file1</code> and <code>file2</code> will be copy into <code>zdir</code>, like below</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 file1</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 file2</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500\u2500 zdir</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u251C\u2500\u2500 file1</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u2514\u2500\u2500 file2</span></span>
<span class="line"></span></code></pre></div></div><h2 id="managing-files-and-directories" tabindex="-1">Managing Files and Directories <a class="header-anchor" href="#managing-files-and-directories" aria-hidden="true">#</a></h2><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>ln -s</code></td><td>create a symbolic link</td></tr><tr><td><code>chmod</code></td><td>change file permissions</td></tr><tr><td><code>find . -name</code></td><td>search for a file recursively</td></tr><tr><td><code>diff</code></td><td>compare two files</td></tr><tr><td><code>fgrep</code></td><td>fixed string search</td></tr></tbody></table><h3 id="ln" tabindex="-1">ln <a class="header-anchor" href="#ln" aria-hidden="true">#</a></h3><p>Symbolic link:</p><ul><li>Is a neew i-node pointing to the file&#39;s data block</li><li>Deleting a symbolic link will not effect the original file</li><li>Deleting or renaming the file a symbolic link points to will leave you with a link that points to nothin, a.k.a a hanging link</li><li>Symbolic links can span across file system(disk partitions)</li><li>Works with files and directories</li></ul><h3 id="chmod" tabindex="-1">chmod <a class="header-anchor" href="#chmod" aria-hidden="true">#</a></h3><p>Recall</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 user  group   0 Feb 23 23:38 file1</span></span>
<span class="line"></span></code></pre></div><p><code>rw-r--r--</code> among it represents the permission of <strong>UGO</strong>, user, group and others, respectively. Here, everyone can read, only user can write and nobody can execute it.</p><p>To be clear, if all of the permissions are enabled, it will be <code>rwxrwxrwx</code>.</p><p>The owner of the file, <code>user</code> here, can use <code>chmod</code> to modify the permissions. <code>chmod</code> can be followed by <code>[identities]+/-[permissions]</code>.</p><p>To enable all the permissions for everyone, use</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">chmod ugo+rwx </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><p>or don&#39;t specify the identities, which is the same as <code>ugo</code></p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">chmod +rwx </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><p>To disable readability from group and others, use</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">chmod go-r </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div><p>If you are familiar with the encoding, <code>[1, 2, 4]</code> are for <code>[x, w, r]</code>, respectively. So <code>rwx</code> will be <code>7</code>, <code>rw</code> will be <code>6</code>, etc.</p><p>To enable all the permissions for everyone and to disable readability from group and others, use</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">chmod 777 </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod 733 </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><h3 id="diff" tabindex="-1">diff <a class="header-anchor" href="#diff" aria-hidden="true">#</a></h3><p><code>diff</code> takes two text files and shows their differences. It&#39;s super useful when your professor keeps modifying an announced assignment whose instrucions are so long and monotonous. Then <code>diff</code> would be a good friend of yours keeping you from reading the entire instructions over again.</p><h4 id="useful-flags" tabindex="-1">Useful flags <a class="header-anchor" href="#useful-flags" aria-hidden="true">#</a></h4><table><thead><tr><th>Flag</th><th>Description</th></tr></thead><tbody><tr><td><code>-c</code></td><td>To display changes in <strong>c</strong>ontext</td></tr><tr><td><code>-q</code></td><td>Be <strong>q</strong>uiet, just print whether the files have differences</td></tr><tr><td><code>-y</code></td><td>Side b<strong>y</strong> side comparison</td></tr><tr><td><code>-W=num</code></td><td>Set the display <strong>w</strong>idth, useful with <code>-y</code></td></tr></tbody></table>`,71),l=[o];function d(i,c,r,p,h,u){return a(),s("div",null,l)}const f=e(n,[["render",d]]);export{g as __pageData,f as default};