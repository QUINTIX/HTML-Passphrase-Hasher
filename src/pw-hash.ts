import {SHA256, HmacSHA256, enc, lib} from 'crypto-js'

export interface PwHashProps {
	phrase : string,
	pin? : string,
	length : number
}

export interface GenAndRaw {
	generated : string,
	raw : lib.WordArray
}

const pairGenAndRaw = (input : lib.WordArray, length : number) : GenAndRaw => {
	return {
		generated : input.toString(enc.Base64).substring(0, length),
		raw : input
	};
};

const trimB64_sha256 = (input : string, length: number) : GenAndRaw =>
	pairGenAndRaw(SHA256(input), length);

const trimB64_sha256HMAC = (input : string, key : string, length : number) : GenAndRaw => 
	pairGenAndRaw(HmacSHA256(input, key), length);

const MIN_PIN = 4;
const genIfPinThenHmac = (props : PwHashProps) : GenAndRaw =>
	props.pin && props.length >= MIN_PIN ? 
		trimB64_sha256HMAC(props.phrase, props.pin!, props.length) :
		trimB64_sha256(props.phrase, props.length)

const DEF_REGEX = /[\W\d]/g;

const clean = (input : string) : string => input.replace(DEF_REGEX, '').toLowerCase();

const MIN_IN = 12;
const MAX_OUT = 85;

export const passphraseHasher = (props : PwHashProps) : GenAndRaw | number | undefined => {
	if(props.length < 0 || props.length > MAX_OUT) {
		return undefined;
	}
	const cleaned = clean(props.phrase).toLowerCase();
	const lengthOfCleaned = cleaned.length;
	if(lengthOfCleaned < MIN_IN){
		return MIN_IN - lengthOfCleaned;
	}
	return genIfPinThenHmac({...props, phrase : cleaned});
};
