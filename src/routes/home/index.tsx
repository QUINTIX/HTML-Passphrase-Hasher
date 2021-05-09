import React from 'react';
import { PasswordOutput } from '../../components/output';

const App = () => {

	const onClick = () => console.info("klink klink!");
	
	return (
		<div>
			hello Preact
			<PasswordOutput 
				isBlured={false}
				phrase="correct horse battery staple"
				length={12}
				onClick={onClick}
			/>
		</div>
	);
}

export default App;