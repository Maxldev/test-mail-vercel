import Head from 'next/head'
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {message};
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        setMessage("");
      }
    });
  };

  return (
    <main>
      <Head>
        <title>Test mail</title>
      </Head>
      <form>
        <div>
          <label htmlFor="message">Message</label>
          <textarea rows="5" type="text" name="message" value={message} onChange={(e) => {setMessage(e.target.value);}}/>
        </div>
        <button type="submit" onClick={handleSubmit}>Envoyer le message</button>
      </form>
    </main>
  )
};