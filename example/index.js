import amfetch from '../lib/amfetch'

amfetch({
  method: 'get',
  url: 'http://www.baidu.com'
}).then(res => {
  console.log(res)
}, e => {
  console.log(e)
})