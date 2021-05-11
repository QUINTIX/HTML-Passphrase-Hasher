import { h } from 'preact';
import { PwHashProps, passphraseHasher, GenAndRaw } from './pw-hash';

export interface IOutputProps extends PwHashProps {
	isBlured : boolean;
	onClick : () => void;
}

export function PasswordOutput(props : IOutputProps){
	const password : GenAndRaw= passphraseHasher(props) as GenAndRaw;
	return (<span>
			<label htmlFor="passOut" className="labels"> Resulting Password: </label>
			<input className={props.isBlured ? "blurred" : "clear"} id="passOut" type="text" value={password.generated} readOnly={true} size={16}/>
	</span>)
}