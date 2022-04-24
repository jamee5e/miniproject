import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from "../styles/suggest.module.css";
import Image from 'next/image'
export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
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
        <Navbar className = {styles.Container}/>
        <h1 className="text-3xl font-bold underline" >Home page</h1>
        No login required!
    </div>
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
