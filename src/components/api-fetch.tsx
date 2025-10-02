/* 
? how do i fetch an API
? how do i know where to find the syntax
? where do i store the API response?
TODO: make the API return simple data first before trying something big
! testing extension lol
*/

import { useEffect } from "react";

export default function APIFunction(){
    useEffect(() =>{
        fetch('https://api.astronomyapi.com/api/v2/studio/star-chart')
    }, [])
    return(
        console.log("hello world")
    )
}