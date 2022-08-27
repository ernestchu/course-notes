import { sidebar } from './configs/index.js'
import mathjax3 from 'markdown-it-mathjax3'

module.exports = {
  lang: 'en-US',
  title: 'Ernie\'s course notes',
  description: 'Thank you for visiting my course notes',
  base: '/course-notes/',
  themeConfig: {
    sidebar: sidebar,
    nav: [
      { text: 'CSE350', link: '/courses/cse350-computer-network/' },
      { text: 'CSE365', link: '/courses/cse365-unix-system-programming/' },
      { text: 'CSE360', link: '/courses/cse360-design-and-implementation-of-compiler/' },
      { text: 'CSE491', link: '/courses/cse491-network-application-programming/' },
    ]
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('mjx-')
      }
    }
  }
}
