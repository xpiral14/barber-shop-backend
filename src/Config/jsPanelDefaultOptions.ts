/* eslint-disable @typescript-eslint/no-empty-function */
export default {
  id: 'abc',
  theme: 'primary',
  headerTitle: 'Default Title',
  position: 'center-top 0 20%',
  contentSize: {
    width: `${Math.round(window.innerWidth / 1.2)}px`,
    height: '300px'
  },
  contentOverflow: 'auto',
  onwindowresize: false,
  content: (panel : any) => {
    const div = document.createElement('div')
    const newId = `${panel.id}-node`
    div.id = newId
    panel.content.append(div)
  },
  callback: (panel: any) => {
    panel.content.style.padding = '10px'
    const maxHeight = window.innerHeight - (window.innerHeight * 30) / 100
    panel.content.style.maxHeight = `${maxHeight}px`
    panel.content.style.maxWidth = `${window.innerWidth - 20}px`
  },
  onclosed: () => {},
  closeOnEscape: true
}
  