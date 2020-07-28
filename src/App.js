import React, { useEffect, useRef, useState } from 'react';

import * as ReactDOM from 'react-dom';
import Peer from 'simple-peer';


export default function App() {

  const giveRandom = () => {
    return Math.round(((Math.random() * 100 + 500)))
  }
  const [myMedia, setMyMedia] = useState()
  const [partnerMedia, setPartnerMedia] = useState()
  const [myPeer, setMyPeer] = useState()
  const [mySecret, setMySecret] = useState()
  const [partnerSecret, setPartnerSecret] = useState()

  const partnerSecretRef = useRef()
  const mySecretRef = useRef()
  const myAudio = useRef()
  const partnerAudio = useRef()

  useEffect(() => {


  }, [])


  return (
    <div className="app" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <h1>Your voice...</h1>
      <audio controls autoPlay ref={myAudio} />

      <h1>Partner voice...</h1>


      <audio controls autoPlay ref={partnerAudio} />


      <h2>Your Id</h2>
      <h4>{giveRandom()}</h4>

      <h2>Partner Id</h2>
      <h4>{giveRandom()}</h4>

      <textarea name="cread" id="" cols="30" rows="10" placeholder="Your creadentials" ref={mySecretRef} value={mySecret} onChange={() => {
        setMySecret(mySecret.current.value)
      }}></textarea>

      <textarea name="cread" id="" cols="30" rows="10" placeholder="Partner Creadentials" ref={partnerSecretRef} value={partnerSecret} onChange={() => { setPartnerSecret(partnerSecretRef.current.value) }}></textarea >
      <button onClick={() => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: myMedia

        })
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(audio => {
            myAudio.current.srcObject = audio
            setMyMedia(audio)
          })
          .catch(err => console.log(err))

        peer.on("signal", data => {
          console.log(data)
          setMySecret(JSON.stringify(data))
        })
        peer.on("stream", stream => {
          setPartnerMedia(stream)
          console.log("streaming--1")
          partnerAudio.current.srcObject = stream
        })

        setMyPeer(peer)

      }}>Call</button>
      <button onClick={() => {
        console.log(partnerSecret)
        myPeer.signal(partnerSecret)
      }}>Accept When partner accept call</button>
      <button style={{ marginBottom: "30px" }} onClick={() => {
        console.log("90")
        const peer1 = new Peer()
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(audio => {
            myAudio.current.srcObject = audio
            setMyMedia(audio)
          }).catch(err => console.log(err))
        peer1.signal(partnerSecret)
        peer1.on("signal", data => {
          setMySecret(JSON.stringify(data))
          console.log(data)
        })
        console.log("yee")
        peer1.on("stream", stream => {
          console.log("streaming")
          setPartnerMedia(stream)
          partnerAudio.current.srcObject = stream
        })

      }}>Accept</button>
    </div>
  )
}



