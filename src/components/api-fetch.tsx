/* 
* make an app that shows star chart using astronomyapi api, with a feature "my lucky constellation"
? how do i fetch an API
? how do i know where to find the syntax
? where do i store the API response?
TODO: make the API return simple data first before trying something big
! testing extension lol
*/

import { useEffect, useState } from "react";

export function APIFunction() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appId = import.meta.env.VITE_API_ID;
        const appSecret = import.meta.env.VITE_API_SECRET;
        const auth = btoa(`${appId}:${appSecret}`);

        const response = await fetch("http://localhost:3000/star-chart", {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            observer: {
              latitude: 33.775867,
              longitude: -84.39733,
              date: "2025-10-01",
            },
            style: "navy",
            view: {
              type: "constellation",
              parameters: {
                constellation: "ori",
              },
            },
          }),
        });

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.data?.imageUrl && (
        <img src={data.data.imageUrl} alt="Star Chart" />
      )}     
    </div>
  );
}

export default APIFunction;
