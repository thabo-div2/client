import { useEffect, useState } from "react";
import DrinksChoice from "./DrinksChoice";

const DisplayChoice = (props) => {
	const [choice, setChoice] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const displayData = async () => {
			try {
				setChoice(props.choice.attributes.input);
				setError(null);
			} catch (err) {
				setError(err.message);
				setChoice(null);
			} finally {
				setLoading(false);
			}
		};
		displayData();
	});

	// console.log(drinkChoice);
	return (
		<div className="display">
			{loading && <p>one minute please...</p>}
			{error && <p>{error}</p>}
			<div>
				{choice && (
					<p>
						{Object.values(choice.attributes.input).map((c) => (
							<li>{c}</li>
						))}
					</p>
				)}
			</div>
		</div>
	);
};

export default DisplayChoice;
