import React, { useContext, useEffect, useState } from 'react'
import {DrizzleContext} from "@drizzle/react-plugin";

export const BuyAndBurn = ({tokenId}) => {
    const [contract,setContract] = useState();
    const [dataKey,setDataKey] = useState();
    const [newPrice,setNewPrice] = useState();
    const drizzleData = useContext(DrizzleContext.Context);
    const {drizzle,drizzleState} = drizzleData;

    useEffect(()=> {
        const contract = drizzle.contracts.MyNFT;
        setContract(contract);

        const dataKey = contract.methods["ownerOf"].cacheCall(tokenId);
        setDataKey(dataKey);

    },[])
    const {MyNFT} = drizzleState.contracts;
    const response = MyNFT.ownerOf[dataKey];

    function handleBuy(e) {
        e.preventDefault();
        console.log("tokenId",tokenId);
        const stackId = contract.methods["buyPet"].cacheSend(tokenId,{
            from: drizzleState.accounts[0],
            value: 10000
        });
    }

    function handleBurn(e) {
        e.preventDefault();
        const stackId = contract.methods["burnNFT"].cacheSend(tokenId,{
            from: drizzleState.accounts[0]
        })
    }

    return (
        <div>
            {
            response && response.value == drizzleState.accounts[0] ?
            <button onClick={(e)=> handleBurn(e)}>Burn NFT</button>
             : 
            <button onClick={(e)=> handleBuy(e)}>Buy NFT</button>
            }
        </div>
    )
}
