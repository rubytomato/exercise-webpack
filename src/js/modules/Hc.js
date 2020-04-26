import axios from 'axios'

const getUser = async (id) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  const user = res.data

  const template = `
    <span>
      ${user.name}
      <br/>
      ${user.email}
      <br/>
      ${user.phone}
    </span>
  `
  return template
}

export default { getUser }
