import { useState, useEffect } from "react";
import creds from "./config/creds";
const Models = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetch("https://api.up2tom.com/v3/models", {
					headers: { Authorization: `Token ${creds.API_KEY}` },
					contentType: "application/vnd.api+json",
				});
				if (!res.ok) {
					throw new Error(
						`This is an HTTP error: The status is ${res.status}|`,
					);
				}

				let actualData = await res.json();

				console.log(actualData);

				setData(actualData.data);

				console.log(data);
				setError(null);
			} catch (err) {
				setError(err.message);
				setData(null);
			} finally {
				setLoading(false);
			}
		};

		getData();
	}, []);
	return (
		<div>
			<h1>Models</h1>
			{loading && <p>Please wait for data to load...</p>}
			{error && (
				<div>{`There is a problem fetching the post data - ${error}`}</div>
			)}
			<div>
				{data &&
					data.map((d) => {
						<p>{d.type}</p>;
					})}
			</div>
		</div>
	);
};

export default Models;
