import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const useCallApi = (url, method) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let flag = true;
        // handle token when request and response 
        const token = axios.CancelToken.source();
        flag &&
            (async () => {
                try {
                    setLoading(true);
                    const data = await axios[method](url, {
                        cancelToken: token.token
                    });

                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false)
                }

            })()
        return () => {
            flag = false;
            token.cancel();
        }
    }, [url])


    return [data, loading, error]
}

