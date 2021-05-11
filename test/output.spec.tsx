import { h } from 'preact';
import { render, fireEvent, screen } from '@testing-library/preact';
import { expect } from 'chai';

import {PasswordOutput} from '../src/components/output'
import React from 'react';

describe('test passphrase hasher output', () => {
	const onClick = () => console.info("klink klink!");
	it('should render output', () => {
		const {container} = render(<PasswordOutput 
			isBlured={false}
			phrase="correct horse battery staple"
			length={12}
			onClick={onClick}
		/>);
		
		const outputInput = screen.getByLabelText(/\s*Resulting Password:\s*/) as HTMLInputElement;
		expect(outputInput.value).to.match( /[\w+/]{12}/ );
	});

	it('should blur output', () => {
		const {container} = render(<PasswordOutput 
			isBlured={true}
			phrase="correct horse battery staple"
			length={12}
			onClick={onClick}
		/>);

		const outputInput = screen.getByLabelText(/\s*Resulting Password:\s*/) as HTMLInputElement;
		fireEvent.click(outputInput); //does not really test anything. Just for bemusement
		expect(outputInput.classList.contains('blurred')).to.be.true;
	})
});