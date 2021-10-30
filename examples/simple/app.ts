import axios from '../../src/index'

// // 处理get请求 url参数
// axios({ method: 'get', url: '/base/get', params: { foo: ['bar', 'baz'] } })
// axios({ method: 'get', url: '/base/get', params: { foo: { bar: 'baz' } } })
// axios({ method: 'get', url: '/base/get', params: { date: new Date() } })
// axios({ method: 'get', url: '/base/get', params: { foo: '@:$, ' } })
// axios({ method: 'get', url: '/base/get', params: { foo: 'bar', baz: null } })
// axios({ method: 'get', url: '/base/get#hash', params: { foo: 'bar' } })
// axios({ method: 'get', url: '/base/get?foo=bar', params: { bar: 'baz' } })

// // 处理post请求data为对象时的转化
// axios({ method: 'post', url: '/base/post', data: { a: 1, b: 2 } })
// axios({ method: 'post', url: '/base/buffer', data: new Int32Array([21, 31]) })

// // 处理header
// axios({ method: 'post', url: '/base/post', data: { a: 1, b: 2 } })
// axios({ method: 'post', url: '/base/post', headers: { 'content-type': 'application/json;charset=UTF-8' }, data: { a: 1, b: 2 } })
// axios({ method: 'post', url: '/base/post', data: new URLSearchParams('q=URLUtils.searchParams&topic=api') })

// 获取响应数据
axios({ method: 'post', url: '/base/post', data: { a: 1, b: 2 } }).then(res => { console.log(res) })
axios({ method: 'post', url: '/base/post', responseType: 'json', data: { a: 3, b: 4 } }).then(res => { console.log(res) })
