import React from "react";
import Layout from '../components/layout' ;
import Navbar from "../components/navbar";
import config from '../config/config';
import styles from "../styles/suggest.module.css";
import Head from 'next/head'
import Image from 'next/image' 
import Link from 'next/link'

const URL = `${config.URL}/laundry`;
const about = () => {
  
  return (
    <Layout>
      <Head>
          <title>About</title>
      </Head>

      <div className={styles.container}>
        <Navbar />
        <div className={styles.data}>
            <h2>Contact Me</h2>
            <div className={styles.datacontainer}><div className={styles.dataPic}>
                <Image
                    src = "/facebook.PNG"
                    alt="Picture"
                    width={50}
                    height={50}
                />
                <h1>Natthawut Sawaengjit</h1>
            </div> 
            <div className={styles.dataPic}>
                <Image
                    src="/line.PNG"
                    alt="Picture"
                    width={50}
                    height={50}
                />
                <h1>5935512006</h1>
            </div> 
            <div className={styles.dataPic}>
                <Image
                    src= "/call.PNG"
                    alt="Picture"
                    width={50}
                    height={50}
                />
                <h1>08x-xxx-xxx</h1>
            </div> 
        </div></div> 
        <div className={styles.about}><button className="mr-4 p-2 bg-red-400 hover:text-indigo-500 rounded-lg drop-shadow-lg"><Link href="/suggest"><a> <span> Previous </span> </a></Link></button></div>
      </div>
    </Layout>
  );
};
export default about;