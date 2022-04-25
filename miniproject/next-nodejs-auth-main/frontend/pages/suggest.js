import React, { } from "react";
import Layout from '../components/layout' ;
import Navbar from "../components/navbar";
import config from '../config/config';
import styles from "../styles/suggest.module.css";
import Head from 'next/head'
import Image from 'next/image' 
import Link from 'next/link'

const URL = `${config.URL}/rent`;
const suggest = () => {
  
  return (
    <Layout>
      <Head>
          <title>Suggest</title>
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
        <div className={styles.container1}>
          <div className={styles.title}>
          <marquee bgcolor="White" direction="lefe" scrollamount="8" width="100%">Nintendo switch game </marquee></div>
        </div>
        <div className={styles.intro}>
          <Image
            src="/4.jpg"
            alt="Picture"
            width={1200}
            height={325}
          />
        </div> 
        <div className={styles.about}><button className="mr-4 p-2 bg-red-400 hover:text-indigo-500 rounded-lg drop-shadow-lg"><Link href="/about"><a> <span> NEXT </span> </a></Link></button></div>
        
      </div>
    </Layout>
  );
};
export default suggest;