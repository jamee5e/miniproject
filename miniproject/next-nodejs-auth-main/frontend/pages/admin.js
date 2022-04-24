import React, { useState, useEffect } from "react";
import axios from "axios";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
import config from '../config/config'
import styles from "../styles/admin.module.css";
import Image from 'next/image'
import Head from 'next/head'


const URL = `${config.URL}/rent`;

const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [customers, setCustomers] = useState({});
  const [CustomerID, setCustomerID] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
  //  if(localStorage.getItem('token') != null) {
    getCustomers();
    profileUser();
  //  }
  }, []);

  const profileUser = async () => {
    try {
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCustomer = async (id) => {
    const result = await axios.get(`${URL}/${id}`)
    console.log('customers ID: ', result.data)
    setCustomer(result.data)
    setCustomerID(result.data.CustomerID)
    setName(result.data.name)
    setSurname(result.data.surname)
    setStatus(result.data.status)
    setPrice(result.data.price)
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

  const deleteCustomer = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getCustomers();
  };

  const updateCustomer = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
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
            <div className={styles.edit_button}>
              <button className={styles.button_get}
                onClick={() => getCustomer(item.id)}
              >
                Get
              </button>
              <button className={styles.button_update}
                onClick={() => updateCustomer(item.id)}
              >
                Update
              </button>
              <button className={styles.button_delete}
                onClick={() => deleteCustomer(item.id)}
              >
                Delete
              </button>
            </div>
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
        <title>Admin</title>
      </Head>
      <div>
        <Image
          src="/laundry.png"
          alt="Picture"
          width={900}
          height={200}
          sizes="(max-width: 500px) 100px"
        />
      </div>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.fontTitle}><h1>For Admin Edit Data</h1></div>
        <div className={styles.form}>
          <tr>
            <th>
              <div className={styles.form_add}>
                <h2>Add customers</h2>
                <div className={styles.adminPage}>
                  <div><b>CustomerID: </b></div>
                  <div>
                    <input
                      type="text"
                      name="CustomerID"
                      value={CustomerID}
                      onChange={(e) => setCustomerID(e.target.value)}
                    ></input>
                  </div>

                  <div><b>Name:</b></div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>

                  <div><b>Surname:</b></div>
                  <div>
                    <input
                      type="text"
                      name="surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    ></input>
                  </div>

                  <div><b>Status:</b></div>
                  <div>
                    <input
                      type="text"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    ></input>
                  </div>

                  <div><b>Price:</b></div>
                  <div>
                    <input
                      type="number"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                  </div>
                </div>

                <button className={styles.button_add} onClick={() => addCustomer(CustomerID, name, surname, status, price)}>
                  Add
                </button>
              </div>
            </th>
            <div className={styles.form_add1}>
              <div className={styles.textstatusID}><h2>STATUS</h2></div>
              <div>
                <button className={styles.statusID} onClick={() => setStatus("Rent 3 day")}>
                Rent 3 day
              </button> <br />
                <button className={styles.statusID} onClick={() => setStatus("Rent 7 day")}>
                Rent 7 day
              </button> <br />
                <button className={styles.statusID} onClick={() => setStatus("Rent 15 day")}>
                Rent 15 day
              </button> <br />
                <button className={styles.statusID} onClick={() => setStatus("Rent 21 day")}>
                Rent 21 day
              </button> <br />
                <button className={styles.statusFinished} onClick={() => setStatus("Rent 30 day")}>
                Rent 30 day
              </button>
              </div></div>
          </tr>
        </div>
        <div className={styles.list}>{showCustomers()}</div>
      </div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
