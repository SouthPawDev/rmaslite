export default function resizePage(resizable) {
  return new Promise((resolve, reject) => {
    if (resizable) {
      document.getElementsByClassName('App')[0].style.width = '100%'
      let c = document.getElementsByTagName('*')
      for (let i = 0; i < c.length; i++) {
        c.item(i).classList.add('resizable')
      }
      resolve()
    } else {
      document.getElementsByClassName('App')[0].style.width = '1680px'
      let c = document.getElementsByTagName('*')
      for (let i = 0; i < c.length; i++) {
        c.item(i).classList.remove('resizable')
      }
    }
    resolve()
  })
}
