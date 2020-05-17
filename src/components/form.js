import React from 'react'


const Form = ({onChange}) => {
	
	const handleChange = (e) => {
		onChange(e.target.value);
	}

	return (
		<form class="flex-wrapper contact" method="post" action="#">
			<label>Name</label>
			<input type="text" name="name" id="name" />
			<label>Email</label>
			<input type="email" name="email" id="email" />
			<label>Subject</label>
			<select name="subject" id="subject" onChange={handleChange}>
				<option value="">Select...</option>
				<option value="ART">Art</option>
				<option value="WORK">Work</option>
				<option value="?">Other</option>
			</select>
			<label>Message</label>
			<textarea name="message" id="message" rows="5" />
			<button type="submit">Send</button>
		</form>
	)
}

export default Form;
