import React, { useContext, useEffect, useState } from 'react'
import { DrizzleContext } from "@drizzle/react-plugin";
import {Context} from '../index';
import { BuyAndBurn } from './BuyAndBurn';
export const ReadString = () => {
    const val2 = useContext(Context);
    console.log("val2:", val2);
    const [stackId,setStackId] = useState();
    const [dataKey,setDataKey] = useState();
    const drizzleData = useContext(DrizzleContext.Context);
    const {drizzle,drizzleState} = drizzleData;

    const [newPrice,setNewPrice] = useState();

    const [account0,setAccount0] = useState();


    //const [res,setRes] = useState();

    //const [res,setRes] = useState();
     useEffect(async()=>{
         try{
            console.log("start");
            const contract = await drizzle.contracts.MyNFT;
            const DataKey = await contract.methods["getData"].cacheCall();
            setDataKey(DataKey);


            //setRes(res);
            const Account0 = drizzleState.accounts[0];
            setAccount0(Account0);
            //setRes(res);
            console.log("end");
        }catch(err){console.log("err",err)}
    },[])

    const {MyNFT} = drizzleState.contracts
            const res = MyNFT.getData[dataKey];
            console.log("res, ", res);

    
        const getTxStatus = () => {
            // get the transaction states from the drizzle state
            const { transactions, transactionStack } = drizzleState;
        
            // get the transaction hash using our saved `stackId`
            const txHash = transactionStack[stackId];
        
            // if transaction hash does not exist, don't display anything
            if (!txHash) return null;
        
            console.log("Transaction hash = ", txHash);
            // otherwise, return the transaction status
            return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
          };
          // change NFT price
          function handleChangePrice(e,id,newPrice) {
              e.preventDefault()
            const contract =  drizzle.contracts.MyNFT;
            const stackId = contract.methods["changePrice"].cacheSend(id, newPrice,{
                from: drizzleState.accounts[0]
            })
        }
        if(res && res.value ){
            return (
               <>
               <h2>Listed Pets</h2>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                      { res.value.map((obj,ind)=>(
                         obj.owner !== "0x0000000000000000000000000000000000000000" ? 
                        <div key={ind}  style={{borderStyle: "groove",width: "400px",height: "550px",display: "inline-block",margin: "20px",backgroundColor: "aquamarine" }}  >
                            <h6>{`Token# ${obj.id}`}</h6>
                            <h3>{`Name: ${obj.name}`}</h3>
                            <img src={obj.imgHash} alt="img" style={{width: "250px",height: "200px"}} /> 
                            <h4>{`Owner: ${obj.owner.substring(0, 7).concat("...",obj.owner.substring(38,42))}`}</h4>
                            {obj.owner ===  account0 ? 
                            <form >
                                <input placeholder="enter new price.." onChange={(e)=> setNewPrice(e.target.value)} />
                                 <button onClick={(e)=> handleChangePrice(e,obj.id, newPrice)}>Change NFT price</button> 
                             </form>
                              : null}
                            <h4>{`Price: ${obj.price} wei`}</h4>
                            <BuyAndBurn tokenId={obj.id}/>
                            <a target="_blank" rel="noreferrer" href={obj.petUri} >Details</a>
                        </div> : null
                    ))}
                     {getTxStatus()}
                </div>
                </>
                )
        } else return <h2>Loading...</h2>;
    

    }