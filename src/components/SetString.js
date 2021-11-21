import React, {useContext, useEffect, useState } from 'react'
import { DrizzleContext } from "@drizzle/react-plugin";
import ipfs from '../ipfs'
import { ReadString } from './ReadString';
export const SetString = () => {
    var imageBuffer;
    const [name,setName] = useState();
    const [price,setPrice] = useState();
    const [breed,setBreed] = useState();
    const [imageHash,setImageHash] = useState();
    const [age,setAge] = useState();
    const [loc,setLoc] = useState();

    const [petUri,setPetUri] = useState();
    const [stackId,setStackId] = useState();
    const drizzleData = useContext(DrizzleContext.Context);

    const {drizzle,drizzleState} = drizzleData;
    //console.log("accounts: ", drizzleState.accounts);

    var tokenUri;

      function call() {
      const data = JSON.stringify({
        name: name,
        price: price,
        breed: breed,
        image: imageHash,
        age: age,
        location: loc
      });

      ipfs.add(ipfs.Buffer(data)).then((cid)=>{
        tokenUri = `https://gateway.pinata.cloud/ipfs/${cid[0].hash}`
        setValue(tokenUri,name,price,imageHash);
      }).catch((error)=>{
        console.log("error",error)
      })
    }

    const setValue = async(tokenUri,name,price,imageHash) => {
        console.log("data in setValue: ",petUri);
        const contract = drizzle.contracts.MyNFT;
        const stackId =  await contract.methods["listPet"].cacheSend(tokenUri,name,price,imageHash,{
            from: drizzleState.accounts[0]
        });
        setStackId(stackId);
      }

    const handle = async(e) => {
        e.preventDefault()
        try {
          await call();
          //await setValue(petUri);
        }catch(err){console.log("err",err)}
    }
    
    const getTxStatus = () => {
        // get the transaction states from the drizzle state
        const { transactions, transactionStack } = drizzleState;
    
        // get the transaction hash using our saved `stackId`
        const txHash = transactionStack[stackId];
    
        // if transaction hash does not exist, don't display anything
        if (!txHash) return null;
    
        //console.log("Transaction hash = ", txHash);
        // otherwise, return the transaction status
        return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
      };

      function capture(e) {
        e.preventDefault();
        const file = e.target.files[0]
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = async ()=>{
          imageBuffer = Buffer(reader.result)
          console.log("buffer",imageBuffer)
        }
      }

      async function handleSubmit(e) {
        e.preventDefault();
        await ipfs.files.add(imageBuffer,(error,result)=>{
          if(error){
            console.log("error: ",error);
            return
          }
          console.log("result",result[0].hash);
          setImageHash(`https://gateway.pinata.cloud/ipfs/${result[0].hash}`);
        })
      }

    return (
        <div style={{backgroundColor: "bisque"}}>
          {/* Form1 Upload Image to IPFS and save image hash on "imageHash"*/}
        <h3>Upload Item Image</h3>
        <form onSubmit={handleSubmit}>
        <input type="file" onChange={capture}/>
        <input type="submit"/>
      </form>
      <br/>
      <form onSubmit={handle}>
    <input type="text" placeholder="name..." required onChange={(e)=> setName(e.target.value)}/><br/>
    <input type="number" placeholder="price..." required onChange={(e)=> setPrice(e.target.value)}/><br/>
    <input type="text" placeholder="breed..." required onChange={(e)=> setBreed(e.target.value)}/><br/>
    <input type="number" placeholder="age..." required onChange={(e)=> setAge(e.target.value)}/><br/>
    <input type="text" placeholder="location..." required onChange={(e)=> setLoc(e.target.value)}/><br/>           
    <button type="submit">Mint</button>
    </form>
            {getTxStatus()}
        </div>
    )
}



/*
Client side form for , filling petUri
- name
- age
- location
- breed
- price
- ImageHash (done by Form1)

<form>
</form>
*/