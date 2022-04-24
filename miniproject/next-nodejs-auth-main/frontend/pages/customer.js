import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import styles from "../styles/customer.module.css";
import Image from 'next/image'
import Head from 'next/head'
import config from '../config/config'
export default function CustomerPage({ token }) {
  const URL = `${config.URL}/rent`;

  const [user, setUser] = useState({});
  const [customers, setCustomers] = useState({});
  const [CustomerID, setCustomerID] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [status, setStatus] = useState("Waiting");
  const [price, setPrice] = useState(0);
  const [customer, setCustomer] = useState({});
  const Gm1 = ["Super Mario Party", "Just Dancec 2020", "Worms W.M.D", "Minecraft"]
  const Gm1Price = 100
  const Gm2 = ["Just Dancec 2019", "Overcooked! 2", "Pokémon™ Legends: Arceus", "Hollow Knight"]
  const Gm2Price = 100
  const Gm3 = ["The Legend of Zelda™", "Moving Out", "DOOM 3", "Stardew Valley"]
  const Gm3Price = 100
  const Gm4 = ["Resident Evil 6", "Resident Evil 5", "Super Mario Odyssey™", "Mortal Kombat 11"]
  const Gm4Price = 100
  const Gm5 = ["Assassin's Creed® III", "NBA 2K20", "Super Smash Bros", "Animal Crossing™"]
  const Gm5Price = 100
  const Gm6 = ["MONSTER HUNTER RISE", "Pokémon™ Sword", "Fitness Boxing", "Ben 10"]
  const Gm6Price = 100

  useEffect(() => {
    (async () => {
      await getCustomers();
    })()
  }, []);

  const rendersome = (Groupm, Price) => {
    return Groupm.map((name) => {

      if (customers && customers.length) {
        const result = customers.find((ans) => {
          return ans.CustomerID == name
        })
        console.log(result)
        if (result == undefined) {
          return (
            <button  className={styles.button_ID} onClick={() => { setCustomerID(name); setPrice(Price) }}>
              {name}
            </button>
          )
        } else {
          return (
            <button  className={styles.button_ID} style={{ backgroundColor: "FireBrick" }} disabled={true}>{name}</button>
          )
        }
      }
    })
  }

  const getCustomers = async () => {
    let result = await axios.get(URL);
    setCustomers(result.data.list);
  };

  const addCustomer = async () => {
    let result = await axios.post(URL, {
      CustomerID,
      name,
      surname,
      status,
      price,
    });
    console.log(result);
    getCustomers();
  };

  const showCustomers = () => {
    if (customers && customers.length) {
      return customers.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div><b>CustomerID:</b> {item.CustomerID}</div>
            <div><b>Name:</b> {item.name}</div>
            <div><b>Surname:</b> {item.surname}</div>
            <div><b>Status:</b> <q>{item.status}</q></div>
            <div><b>Price:</b> {item.price}</div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };

  return (
    <div>
      <Head>
        <title>Customer</title>
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
        <div className={styles.fontTitle}><h1>For Customer Add Data </h1></div>

        <div className={styles.form}>
          <tr>
            <th>
              <div className={styles.form_add}>
                <h2>Add your Data</h2>
                CustomerID:
                <input
                  type="text"
                  disabled="disabled"
                  name="CustomerID"
                  value={CustomerID}
                  onChange={(e) => setCustomerID(e.target.value)}>
                </input>
                Name:
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}>
                </input>
                Surname:
                <input
                  type="text"
                  name="surname"
                  onChange={(e) => setSurname(e.target.value)}>
                </input>
                Status:
                <input className={styles.text}
                  type="text"
                  name="status"
                  disabled="disabled"
                  value="Waiting"
                  onChange={(e) => setStatus(e.target.value)}>
                </input>
                Price:
                <input
                  type="number"
                  name="price"
                  disabled="disabled"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}>
                </input>
                <button className="mr-4 p-2 bg-red-400 hover:text-indigo-500 rounded-lg drop-shadow-lg"
                  onClick={() => addCustomer(CustomerID, name, surname, status, price)}>
                  Add
                </button>
                <div className={styles.textConfirm}><h5>Please Wait Admin confirm...</h5> </div>
              </div>
            </th>

            <div className={styles.form_add1}>
              <div>{rendersome(Gm1, Gm1Price)}</div>

              <div>{rendersome(Gm2, Gm2Price)}</div>

              <div>{rendersome(Gm3, Gm3Price)}</div>

              <div>{rendersome(Gm4, Gm4Price)}</div>

              <div>{rendersome(Gm5, Gm5Price)}</div>

              <div>{rendersome(Gm6, Gm6Price)}</div>
            </div>
          </tr>
        </div>

        <tr>
          <div className={styles.list}>{showCustomers()}</div>
        </tr>

      </div>
    </div>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
