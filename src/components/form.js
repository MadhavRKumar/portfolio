import React from 'react'


const Form = ({onChange}) => {
	
	const handleChange = (e) => {
		onChange(e.target.value);
	}

	return (
		<form className="flex-wrapper contact" method="post" action="#">
			<label htmlFor="name">Name</label>
			<input type="text" name="name" id="name" />
			<label htmlFor="email">Email</label>
			<input type="email" name="email" id="email" />
			<fieldset className="flex-wrapper">
				<legend>Subject</legend>
				<label htmlFor="work"><input onChange={handleChange} type="radio" name="subject" id="work" value="WORK"/>Work</label>	
				<label htmlFor="art"><input onChange={handleChange} type="radio" name="subject" id="art" value="ART"/>Art</label>	
				<label htmlFor="other"><input onChange={handleChange} type="radio" name="subject" id="other" value="?"/>Other</label>	
			</fieldset>
			<label htmlFor="message">Message</label>
			<textarea name="message" id="message" rows="5" />
			<button type="submit">Send</button>
		</form>
	)
}

export default Form;
