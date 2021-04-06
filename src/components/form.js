import React from 'react'


const Form = ({onChange}) => {
	
	const handleChange = (e) => {
		onChange(e.target.value);
	}

	return (
		<form className="flex-wrapper contact" method="post" name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
			<input class="outline" type="hidden" name="form-name" value="contact"/>
			<label class="outline" htmlFor="name">Name</label>
			<input class="input-field" type="text" name="name" id="name" />
			<label class="outline" htmlFor="email">Email</label>
			<input class="input-field" type="email" name="email" id="email" />
			<fieldset className="flex-wrapper">
				<legend class="outline">Subject</legend>
				<label class="outline" htmlFor="work"><input onChange={handleChange} type="radio" name="subject" id="work" value="WORK"/>Work</label>	
				<label class="outline" htmlFor="art"><input onChange={handleChange} type="radio" name="subject" id="art" value="ART"/>Art</label>	
				<label class="outline" htmlFor="other"><input onChange={handleChange} type="radio" name="subject" id="other" value="?"/>Other</label>	
			</fieldset>
			<label class="outline" htmlFor="message">Message</label>
			<textarea name="message" id="message" rows="5" />
			<button type="submit">Send</button>
		</form>
	)
}

export default Form;
