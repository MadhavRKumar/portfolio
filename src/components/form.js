import React from 'react'


const Form = ({onChange}) => {
	
	const handleChange = (e) => {
		onChange(e.target.value);
	}

	return (
		<form className="flex-wrapper contact" method="post" name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
			<input className="outline" type="hidden" name="form-name" value="contact"/>
			<label className="outline" htmlFor="name">Name</label>
			<input className="input-field" type="text" name="name" id="name" />
			<label className="outline" htmlFor="email">Email</label>
			<input className="input-field" type="email" name="email" id="email" />
			<fieldset className="flex-wrapper">
				<legend className="outline">Subject</legend>
				<label className="outline" htmlFor="work"><input onChange={handleChange} type="radio" name="subject" id="work" value="WORK"/>Work</label>	
				<label className="outline" htmlFor="art"><input onChange={handleChange} type="radio" name="subject" id="art" value="ART"/>Art</label>	
				<label className="outline" htmlFor="other"><input onChange={handleChange} type="radio" name="subject" id="other" value="?"/>Other</label>	
			</fieldset>
			<label className="message-label outline" htmlFor="message">Message</label>
			<textarea name="message" id="message" rows="5" />
			<button type="submit">Send</button>
		</form>
	)
}

export default Form;
