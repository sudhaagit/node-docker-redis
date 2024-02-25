const express = require('express')

const redis = require('redis')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 9000 // Redis Api

const REDIS_PORT = process.env.REDIS_PORT || 6379
const client = redis.createClient(REDIS_PORT)
app.use(cors())

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'



////////////////

client.on('connect', () => console.log(`Redis is connected on port ${REDIS_PORT}`))
client.on("error", (error) => console.error(error))

// for(var i = 0; i < jsonObj.length; i++)
// {
//   alert(jsonObj[i]['price']);
// }

// app.get('/api/v1/users/:username', (req, res) => {
//   try {
//     const username = req.params.username
//
//     client.get(username, async (err, cache_data) => {
//
//       if (cache_data) {
//         const parsedata = JSON.parse(cache_data)
//         console.log('get values  ' + parsedata[0]['email'])
//         return res.status(200).send({
//           message: `Retrieved ${username} data from the cache`,
//           users: JSON.parse(cache_data)
//
//         })
//       } else {
//         const api = await axios.get(`https://jsonplaceholder.typicode.com/users/?username=${username}`)
//         client.setex(username, 1440, JSON.stringify(api.data))
//         return res.status(200).send({
//           message: `Retrieved ${username}  data from the server`,
//           users: api.data
//         })
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// })

app.get('/api/v1/news/:us', (req, res) => {
  try {
    const us = req.params.us;
    if (us === 'us') {
      client.get(us, async (err, cache_data) => {

        if (cache_data) {
          const parsedata = JSON.parse(cache_data)
          //console.log('get values  ' + parsedata[0]['email'])
          //console.log('get values  ' + parsedata.articles[0].author)
          return res.status(200).send({
            message: `Retrieved US data from the cache`,
            users: JSON.parse(cache_data)

          })
        } else {
          const api = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=1&apiKey=4463400343c94307a995ef39858caaaf`)
          client.setex(us, 1440, JSON.stringify(api.data))
          return res.status(200).send({
            message: `Retrieved US data from the server`,
            users: api.data
          })
        }
      })
    } else if (us === 'usmore') {
      client.get(us, async (err, cache_data) => {
        if (cache_data) {
          const parsedata = JSON.parse(cache_data)
          //console.log('get values  ' + parsedata[0]['email'])
          //console.log('get values  ' + parsedata.articles[0].author)
          return res.status(200).send({
            message: `Retrieved US data from the cache`,
            users: JSON.parse(cache_data)

          })
        } else {
          const api = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=2&apiKey=4463400343c94307a995ef39858caaaf`)
          client.setex(us, 1440, JSON.stringify(api.data))
          return res.status(200).send({
            message: `Retrieved US data from the server`,
            users: api.data
          })
        }
      })
    } else if (us === 'tech') {
      client.get(us, async (err, cache_data) => {
        if (cache_data) {
          const parsedata = JSON.parse(cache_data)
          //console.log('get values  ' + parsedata[0]['email'])
          //console.log('get values  ' + parsedata.articles[0].author)
          return res.status(200).send({
            message: `Retrieved Tech data from the cache`,
            users: JSON.parse(cache_data)

          })
        } else {
          const api = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=10&page=1&apiKey=4463400343c94307a995ef39858caaaf`)
          client.setex(us, 1440, JSON.stringify(api.data))
          return res.status(200).send({
            message: `Retrieved Tech data from the server`,
            users: api.data
          })
        }
      })
    } else if (us === 'techmore') {
      client.get(us, async (err, cache_data) => {
        if (cache_data) {
          const parsedata = JSON.parse(cache_data)
          //console.log('get values  ' + parsedata[0]['email'])
          //console.log('get values  ' + parsedata.articles[0].author)
          return res.status(200).send({
            message: `Retrieved Tech-more data from the cache`,
            users: JSON.parse(cache_data)

          })
        } else {
          const api = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=10&page=2&apiKey=4463400343c94307a995ef39858caaaf`)
          client.setex(us, 1440, JSON.stringify(api.data))
          return res.status(200).send({
            message: `Retrieved Tech-more data from the server`,
            users: api.data
          })
        }
      })
    }

  }
    catch
    (error) {
    console.log(error)
  }
})

// app.get('/api/v1/news/:usmore', (req, res) => {
//   try {
//     const usmore = req.params.usmore
//
//     client.get(usmore, async (err, cache_data) => {
//
//       if (cache_data) {
//         const parsedata = JSON.parse(cache_data)
//         //console.log('get values  ' + parsedata[0]['email'])
//         console.log('get values  ' + parsedata.articles[0].author)
//         return res.status(200).send({
//           message: `Retrieved USmore data from the cache`,
//           users: JSON.parse(cache_data)
//
//         })
//       } else {
//         const api = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=2&apiKey=4463400343c94307a995ef39858caaaf`)
//         client.setex(usmore, 1440, JSON.stringify(api.data))
//         return res.status(200).send({
//           message: `Retrieved USmore data from the server`,
//           users: api.data
//         })
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// })

// Start the server
// app1.listen(PORT1, () => {
//   console.log(`EmailServer running on port ${PORT1}`);
// });
app.listen(PORT, () => console.log(`RedisServer running on port ${PORT}`))

module.exports = app;




