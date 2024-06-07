import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
const Main = () => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
          search +
          "&key=" +
          "&maxResults=40"
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err));
    }
  };
  const startDictation = () => {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      const recognition = new window.webkitSpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-IN";
      recognition.start();

      recognition.onresult = function (e) {
        setSearch(e.results[0][0].transcript);
        recognition.stop();
        axios
          .get(
            "https://www.googleapis.com/books/v1/volumes?q=" +
            e.results[0][0].transcript +
            "&key=" +
            "&maxResults=40"
          )
          .then((res) => setData(res.data.items))
          .catch((err) => console.log(err));



      };

      recognition.onerror = function (e) {
        recognition.stop();
      };
    }

  };



  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>
            A Room without Books is like
            <br /> a Body without a Soul.
          </h1>
        </div>
        <div className="row2">
          <h2 >Find Your Book</h2>
          <div className="search">
           
            <input
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={searchBook}
              style={{
                fontSize: '16px',
                borderRadius: '20px 20px 20px',
                border: '1px solid dark',
                width: '500px',
                padding: '10px',
                margin: '20px',
                backgroundColor: 'dark',
                height: '35px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
             <img
              onClick={startDictation}
              src="https://www.animatedimages.org/data/media/387/animated-microphone-image-0018.gif"
              alt="Microphone"
              style={{
                width: '50px',  // Adjust the width as needed
                height: '50px', // Adjust the height as needed
                margin:"-80px" // Adjust the margins as needed
              }}

            />



          </div>

{/* 
          <img src="./images/bg2.png" alt="" 
          style={{
            width: '300px',  // Adjust the width as needed
            height: '300px', // Adjust the height as needed
          }}
/> */}
        </div>

      </div>


      <div className="container">{<Card book={bookData} />}</div>
    </>

  );
};

export default Main;
