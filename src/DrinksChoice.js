import { useState, useEffect } from "react";
import creds from "./config/creds";
import DisplayChoice from "./DisplayChoice";

const DrinksChoice = () => {
	const [data, setData] = useState(null);
	// const [metaData, setMetaData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// questions from metadata
	const [question1, setQuestion1] = useState(null);
	const [question2, setQuestion2] = useState(null);
	const [question3, setQuestion3] = useState(null);
	const [question4, setQuestion4] = useState(null);
	const [question5, setQuestion5] = useState(null);
	const [question6, setQuestion6] = useState(null);
	const [question7, setQuestion7] = useState(null);
	const [question8, setQuestion8] = useState(null);
	const [question9, setQuestion9] = useState(null);
	const [question10, setQuestion10] = useState(null);

	let questions;

	// answers from the form

	// const [formAnswers, setFormAnswers] = useState({});
	const [formAnswers1, setFormAnswers1] = useState("");
	const [formAnswers2, setFormAnswers2] = useState("");
	const [formAnswers3, setFormAnswers3] = useState("");
	const [formAnswers4, setFormAnswers4] = useState("");
	const [formAnswers5, setFormAnswers5] = useState("");
	const [formAnswers6, setFormAnswers6] = useState("");
	const [formAnswers7, setFormAnswers7] = useState("");
	const [formAnswers8, setFormAnswers8] = useState("");
	const [formAnswers9, setFormAnswers9] = useState("");
	const [formAnswers10, setFormAnswers10] = useState("");

	// values for the select tag
	const [genderValues, setGenderValues] = useState([]);
	const [sensitiveValues, setSensitiveValues] = useState([]);
	const [timeValues, setTimeValues] = useState([]);
	const [pregnantValues, setPregnantValues] = useState([]);
	const [healthValues, setHealthValues] = useState([]);

	const [choice, setChoice] = useState(null);

	const onSubmit = (e) => {
		e.preventDefault();
		const body = {
			data: {
				type: data.type,
				attributes: {
					input: {
						INPUTVAR0: formAnswers1,
						INPUTVAR1: formAnswers2,
						INPUTVAR2: formAnswers3,
						INPUTVAR3: formAnswers4,
						INPUTVAR4: formAnswers5,
						INPUTVAR5: formAnswers6,
						INPUTVAR6: formAnswers7,
						INPUTVAR7: formAnswers8,
						INPUTVAR8: formAnswers9,
						INPUTVAR9: formAnswers10,
					},
				},
			},
		};

		fetch(`https://api.up2tom.com/v3/decision/${creds.MODEL_ID}`, {
			method: "POST",

			headers: {
				Authorization: `Token ${creds.API_KEY}`,
				"Content-type": "application/vnd.api+json",
			},

			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.errors) {
					console.log(data.errors);
					setError(data.errors[0].detail);
				} else {
					setChoice(data.data);
					setError(null);
				}
			});
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetch(
					`https://api.up2tom.com/v3/models/${creds.MODEL_ID}`,
					{
						headers: {
							Authorization: `Token ${creds.API_KEY}`,
						},
						contentType: "application/vnd.api+json",
					},
				);
				if (!res.ok) {
					throw new Error(
						`This is an HTTP error: The status is ${res.status}|`,
					);
				}
				let actualData = await res.json();
				setData(actualData.data);
				// setMetaData(data.attributes.metadata);
				setQuestion1(actualData.data.attributes.metadata.prediction.question);
				questions = actualData.data.attributes.metadata.attributes.map((q) => {
					return q.question;
				});
				setQuestion2(questions[0]);
				setQuestion3(questions[1]);
				setQuestion4(questions[2]);
				setQuestion5(questions[3]);
				setQuestion6(questions[4]);
				setQuestion7(questions[5]);
				setQuestion8(questions[6]);
				setQuestion9(questions[7]);
				setQuestion10(questions[8]);

				const setChoices = () => {
					actualData.data.attributes.metadata.attributes.map((q) => {
						if (q.domain.type === "DomainC") {
							if (q.question === "Gender?") {
								setGenderValues(q.domain.values);
							}
							if (q.question === "Sensitive to Caffeine?") {
								setSensitiveValues(q.domain.values);
							}
							if (q.question === "Time of day?") {
								setTimeValues(q.domain.values);
							}
							if (q.question === "Pregnant?") {
								setPregnantValues(q.domain.values);
							}
							if (q.question === "Health conscious?") {
								setHealthValues(q.domain.values);
							}
						}
					});
				};

				setChoices();
				console.log(
					genderValues,
					sensitiveValues,
					timeValues,
					pregnantValues,
					healthValues,
				);

				setError(null);
				console.log(actualData);
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
		<div className="drinks text-center w-full p-1">
			{loading && <div>A moment please...</div>}
			{error && (
				<div className="{{ error ? 'text-red-600' : 'text-green-600' }}">{`There is a problem fetching the post data - ${error}`}</div>
			)}
			<div className=" container mx-auto">
				{data && (
					<h1 className="font-bold text-purple-500 text-xl mb-2">
						{data.attributes.name}
					</h1>
				)}
				<form
					className="grid-cols-2 place-items-center p-12"
					onSubmit={onSubmit}
				>
					{data && (
						<>
							<label>1. {question1}</label>
							<select
								className="w-fit"
								value={formAnswers1}
								onChange={(e) => setFormAnswers1(e.target.value)}
							>
								<option value="" defaultValue disabled>
									Select your option
								</option>
								{data.attributes.metadata.prediction.domain.values.map(
									(value) => (
										<option value={value}>{value}</option>
									),
								)}
							</select>
						</>
					)}
					{data && (
						<>
							<div>
								<label>2. {question2}</label>
								<input
									className="w-fit"
									value={formAnswers2}
									onChange={(e) => setFormAnswers2(e.target.value)}
								/>
							</div>
							<div>
								<label>3. {question3}</label>
								<select
									className="w-fit"
									value={formAnswers3}
									onChange={(e) => setFormAnswers3(e.target.value)}
								>
									<option value="" defaultValue disabled>
										Select your option
									</option>
									{genderValues.map((value) => (
										<option value={value}>{value}</option>
									))}
								</select>
							</div>
							<div>
								<label>4. {question4}</label>
								<input
									className="w-fit"
									value={formAnswers4}
									onChange={(e) => setFormAnswers4(e.target.value)}
								/>
							</div>
							<div>
								<label>5. {question5}</label>
								<select
									className="w-fit"
									value={formAnswers5}
									onChange={(e) => setFormAnswers5(e.target.value)}
								>
									<option value="" defaultValue disabled>
										Select your option
									</option>
									{sensitiveValues.map((value) => (
										<option value={value}>{value}</option>
									))}
								</select>
							</div>
							<div>
								<label>6. {question6}</label>
								<select
									className="w-fit"
									value={formAnswers6}
									onChange={(e) => setFormAnswers6(e.target.value)}
								>
									<option value="" defaultValue disabled>
										Select your option
									</option>
									{timeValues.map((value) => (
										<option value={value}>{value}</option>
									))}
								</select>
							</div>
							<div>
								<label>7. {question7}</label>
								<select
									className="w-fit"
									value={formAnswers7}
									onChange={(e) => setFormAnswers7(e.target.value)}
								>
									<option value="" defaultValue disabled>
										Select your option
									</option>
									{pregnantValues.map((value) => (
										<option value={value}>{value}</option>
									))}
								</select>
							</div>
							<div>
								<label>8. {question8}</label>
								<select
									className="w-fit"
									value={formAnswers8}
									onChange={(e) => setFormAnswers8(e.target.value)}
								>
									<option value="" defaultValue disabled>
										Select your option
									</option>
									{healthValues.map((value) => (
										<option value={value}>{value}</option>
									))}
								</select>
							</div>
							<div>
								<label>9. {question9}</label>
								<input
									className="w-fit"
									value={formAnswers9}
									onChange={(e) => setFormAnswers9(e.target.value)}
								/>
							</div>
							<div>
								<label>10. {question10}</label>
								<input
									className="w-fit"
									value={formAnswers10}
									onChange={(e) => setFormAnswers10(e.target.value)}
								/>
							</div>
						</>
					)}
					<input
						className="bg-violet-400 rounded p-2"
						type="submit"
						value="Submit"
					/>
				</form>
			</div>
			{/* <DisplayChoice choice={choice} /> */}
			{choice && (
				<p>
					{Object.values(choice.attributes.input).map((c) => (
						<li className="list-none">{c}</li>
					))}
				</p>
			)}
		</div>
	);
};

export default DrinksChoice;
