import React from 'react'


const Form = ({onChange}) => {
	
	const handleChange = (e) => {
		onChange(e.target.value);
		console.log(e.target.value);
	}

	return (
		<form class="flex-wrapper" method="post" action="#">
			<label>
			Name
			<input type="text" name="name" id="name" />
			</label>
			<label>
				Email
				<input type="email" name="email" id="email" />
			</label>
			<label>
				Subject
			<select name="subject" id="subject" onChange={handleChange}>
				<option value="">Select...</option>
				<option value="ART">Art</option>
				<option value="WORK">Work</option>
				<option value="?">Other</option>
			</select>
			</label>
			<label>
				Message
				<textarea name="message" id="message" rows="5" />
			</label>
			<button type="submit">Send</button>
			<input type="reset" value="Clear" />
		</form>
	)
}

export default Form;
