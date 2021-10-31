import axios from '../../src/index'

// axios({ url: '/extend/post', method: 'post', data: { msg: 'hi' } })
// axios.request({ url: '/extend/post', method: 'post', data: { msg: 'hello' } })
// axios.get('/extend/get')
// axios.options('/extend/options')
// axios.delete('/extend/delete')
// axios.head('/extend/head')
// axios.post('/extend/post', { msg: 'post' })
// axios.put('/extend/put', { msg: 'put' })
// axios.patch('/extend/patch', { msg: 'patch' })


// 函数重载 request 函数内部对传进来的参数进行了判断 可以传 (config) 或 (url，config)
axios({ url: '/extend/post', method: 'post', data: { msg: 'hi' } })
axios('/extend/post', { method: 'post', data: { msg: 'hello' } })





// 1：axios不支持泛型，res.data.后边就点不出来东西了。因为data的类型是any
// axios('/extend/post', { method: 'post', data: { msg: 'hello' } }).then(res => res.data.)


// 2：axios支持泛型
interface User { name: string; age: number }
interface ResponseData<T = any> { code: number; result: T; message: string }
// App应用方就可以在调用时传入泛型，就会有提示了：
axios<ResponseData<User>>('/extend/user').then(res => res.data.result.age)
axios<ResponseData<User>>('/extend/user').then(res => res.data.code)

