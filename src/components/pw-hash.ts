//import {SHA256, HmacSHA256, enc, lib, algo} from 'crypto-js'
import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import WordArray from 'crypto-js/lib-typedarrays' 

export interface PwHashProps {
	phrase : string,
	pin? : string,
	length : number
}

export interface GenAndRaw {
	generated : string,
	raw : WordArray
}

const pairGenAndRaw = (input : WordArray, length : number) : GenAndRaw => {
	return {
		generated : Base64.stringify(input).substring(0, length),
		raw : input
	};
};

const trimB64_sha256 = (input : string, length: number) : GenAndRaw =>
	pairGenAndRaw(sha256(input), length);

const trimB64_sha256HMAC = (input : string, key : string, length : number) : GenAndRaw => 
	pairGenAndRaw(hmacSHA256(input, key), length);

const MIN_PIN = 4;
const genIfPinThenHmac = (props : PwHashProps) : GenAndRaw =>
	props.pin && props.pin.length > MIN_PIN ? 
		trimB64_sha256HMAC(props.phrase, props.pin!, props.length) :
		trimB64_sha256(props.phrase, props.length)

const DEF_REGEX = /[\W\d]/g;

const clean = (input : string) : string => input.replace(DEF_REGEX, '').toLowerCase();

export const MIN_IN = 12; // entirely arbitrary
const MAX_OUT = 85; // precomputed Math.floor(algo.SHA256.create().blockSize / BITS_PER_SYMBOL);

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
