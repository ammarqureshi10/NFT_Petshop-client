import React, { useContext, useState } from 'react'
import { DrizzleContext } from "@drizzle/react-plugin";
export const TokenOf = () => {
    const [tokenId,setTokenId] = useState();
    const [dataKey,setDataKey] = useState();
    const drizzleData = useContext(DrizzleContext.Context);
    console.log("drizzleData", drizzleData);
    const {drizzle,drizzleState} = drizzleData;

    // FOR tokenOwner
    function handleSubmit(e) {
        e.preventDefault();
        const contract = drizzle.contracts.MyNFT;
        const dataKey = contract.methods["ownerOf"].cacheCall(tokenId);
        setDataKey(dataKey);
    }
    const {MyNFT} = drizzleState.contracts;
    const response = MyNFT.ownerOf[dataKey];
    if(response){
        console.log("response",response);
    }

    // FOR tokenURI
    function handleTokenURI(e) {
        e.preventDefault();
        const contract = drizzle.contracts.MyNFT;
        const dataKey = contract.methods["tokenURI"].cacheCall(tokenId);
        setDataKey(dataKey)
    }
    //const {MyNFT} = drizzleState.contracts;
    const Response = MyNFT.tokenURI[dataKey];
    if(Response){
        console.log("response",Response);
    }
    return (
        <div>
            <h2>Owner By Token</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter TokenId..." onChange={(e)=> setTokenId(e.target.value)}/>
                <input type="submit"/>
            </form>
            {response ? `Owner of token ID ${tokenId} is ${response.value}` : null}
            <br/>
            <br/>
            <h2>Token URI</h2>
            <form onSubmit={handleTokenURI}>
                <input placeholder="Enter TokenId..." onChange={(e)=> setTokenId(e.target.value)}/>
                <input type="submit"/>
            </form>
            {Response ? `URI of token ID ${tokenId} is ${Response.value}` : null}
        </div>
    )
}
