import { useEffect, useState } from "react";

export function useFetch<Response>(url: Url) {
	const [data, setData] = useState<Response | null>(null);
	const [error, setError] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const json = (await response.json()) as Response;
				setData(json);
			} catch (error) {
				setError(`${error} Could not Fetch Data`);
			}
		};
		fetchData();
	}, [url]);
	return { data, error };
}
