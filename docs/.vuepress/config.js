const mathjax3 = require('markdown-it-mathjax3')

module.exports = {
  lang: 'en-US',
  title: 'Ernie\'s course notes',
  description: 'Thank you for visiting my course notes',
  base: '/course-notes/',
  themeConfig: {
    repo: 'ernestchu/course-notes',
    editLink: true,
    editLinkText: 'Edit this page on GitHub',
    docsDir: 'docs',
    lastUpdated: true,
    contributorsText: 'Authors',
    navbar: [
      {
        text: 'CSE350 Computer Network',
        link: '/courses/cse350-computer-network/'
      },
      { 
        text: 'CSE365 Unix System Programming',
        link: '/courses/cse365-unix-system-programming/'
      },
      {
        text: 'CSE360 Design and Implementation of Compiler',
        link: '/courses/cse360-design-and-implementation-of-compiler/'
      },
      { 
        text: 'CSE491 Network Application Programming',
        link: '/courses/cse491-network-application-programming/'
      }
    ],
  },
  // extendsMarkdown: (md) => {
  //   md.use(mathjax3)
  // },
  // bundlerConfig: {
  //   vuePluginOptions: {
  //     template: {
  //       compilerOptions: {
  //         isCustomElement: tag => tag.startsWith('mjx-')
  //       }
  //     }
  //   }
  // }
}
