import {useState, useEffect} from 'react';

const useFetch = (url) =>{

  //OUPUTTING LIST (ALL videos)
  const [universities, setUniversities] = useState(null);

  // To display loading message
  const [isPending, setPending] = useState(true)

  //To dispay error message
  const [error, setError] = useState(null)



// MWANZO WA USE-EFFECT BLOCK
useEffect(() =>{


//BLOCK YA CLEAN-UP FUNCTION INAPOANZIA
  const AbortCont = new AbortController(); //This used to stop the fetch
//BLOCK YA CLEAN-UP FUNCTION INAPOISHIA


// Block ya KUSET TIMEOUT inaanzia hapa
   setTimeout(() => {
         // Block ya kufetch inaanzia hapa
         fetch(url, {signal:AbortCont.signal})
        .then(res => {
            //kwa ajili ya kucatch error when ip is wrong is catched here

            if(!res.ok){
                throw Error('coul not fetch the data for that resources')
            }
            //mwisho hapa


            return res.json();
        })
        .then((data) => {
            setUniversities(data);
            //console.log(data)
            setPending(false);
            setError(null);
        })
        // Block ya kufetch inaishia hapa

// Block kwa ajili ya kucatch error
// But hii ina catch only network error, ip adress does not reach in a server
    .catch(err =>{
        console.log(err.message)
        //Hii condition unaiweka km unataka kucheki hiyo error ni AbortError
        if(err.name === 'AbortError'){
          console.log('fetch Aborted');
          console.log(err.message)
        } else{
          setPending(false);
          setError(err.message);
        }
        

    })

// Block kwa ajili ya kucatch error inaishia hapa

   }, 2000)

return () => AbortCont.abort();




    
},[url]);


return { universities, isPending, error }


}
export default useFetch;

