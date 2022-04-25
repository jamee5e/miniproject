import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from "../styles/suggest.module.css";
import Image from 'next/image'
import axios from 'axios'
import config from '../config/config'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    const loginForm = () => (
        <div class="border-solid border-1 border-indigo-600 box-border h-15 w-30 p-2 border-4">
            <div>
                Username:
            </div>
            <div>
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div >
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

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
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
                <h1 className="mt-3 flex justify-center text-3xl font-bold underline">Login</h1>
                <div className="mt-3 flex justify-center">
                    Status:  {status}
                </div>
                <div className="mt-3 flex justify-center">
                  {loginForm()}  
                </div>
                
                <div className="mt-3 flex justify-center">
                    <button className=" mr-4 p-2 bg-red-400 hover:text-indigo-500 rounded-lg drop-shadow-lg " onClick={login}>Login</button>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
