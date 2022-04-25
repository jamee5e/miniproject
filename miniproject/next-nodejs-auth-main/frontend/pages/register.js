
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/suggest.module.css'
import Navbar from '../components/navbar'
import Image from 'next/image'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <div class="border-solid border-2 border-indigo-600 box-border h-15 w-30 p-2 border-4">
            <div>
                Username:
            </div>
            <div>
                <input  type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Email:
            </div>
            <div>
                <input type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                Password:
            </div>
            <div>
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

        </div>
    )


    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <div>
        <Image
          src="/1.jpg"
          alt="Picture"
          width={900}
          height={200}
          sizes="(max-width: 500px) 100px"
        />
      </div>
            <div className={styles.container}>
                <Navbar />
                <h1 className="mt-3 flex justify-center text-3xl font-bold underline">Register</h1>
                <div className="mt-3 flex justify-center">
                    Status:  {status}
                </div>
                <div className="mt-3 flex justify-center">
                    {registerForm()}
                </div>
                <div className="mt-3 flex justify-center">
                    <button className="mr-4 p-2 bg-red-400 hover:text-indigo-500 rounded-lg drop-shadow-lg" onClick={register}>Register</button>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
