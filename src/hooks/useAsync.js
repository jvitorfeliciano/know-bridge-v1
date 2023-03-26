import { useEffect, useState } from "react";

export default function useAsync(handler, immediate = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const act = async (...args) => {
        setLoading(true);

        try {
            const data = await handler(...args);
            setData(data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    useEffect(() => {
        if (immediate) {
            act();
        }
    }, []);

    return {
        data,
        loading,
        error,
        act,
    };
}