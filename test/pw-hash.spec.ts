import {PwHashProps, GenAndRaw, passphraseHasher, MIN_IN} from '../src/pw-hash'
import { expect } from 'chai';

const MIN_EXPECTED = MIN_IN;

const moreRequired = Array.from(Array(MIN_EXPECTED - 1).keys())
	.map((len : number) : [number, string] => [
	MIN_EXPECTED - len - 1,
	Array.from(Array(len+1).keys())
		.map(offset => String.fromCharCode(offset + 'a'.charCodeAt(0))).join('')
	]
);

describe('test passphrase hasher', () => {

	test.each( [ [-5], [86] ])('reject negative and excess lengths', 
			(length : number) => {
		expect(
			passphraseHasher({phrase:'ignored', length: length})
		).to.be.undefined;
	});
	
	test.each(moreRequired)('expect %i more character(s) required for %s',
			(expected : number, given : string) => {
		expect(
			passphraseHasher({phrase : given, length : 16})
		).to.equal(expected);
	});

	it('should ignore the pin if there are not enough PIN characters', () => {
		const inputForExpected : PwHashProps = {
			phrase : "correct horse battery staple", length : 10
		}
		const inputForActual : PwHashProps = {
			...inputForExpected, pin: '123'
		}
		
		const expected : GenAndRaw = passphraseHasher(inputForExpected) as GenAndRaw;
		const actual : GenAndRaw = passphraseHasher(inputForActual) as GenAndRaw;

		expect(expected.generated).to.equal(actual.generated);
	});

	it('should ignore spacing, numbers and capitalization', () => {
		const withPinAndLength = (input : string) : PwHashProps => {
			return {phrase:input, length:12, pin:'12345' };
		}
		
		const expected : GenAndRaw = passphraseHasher(
			withPinAndLength('correcthorsebatterystaple')) as GenAndRaw;
		const actual : GenAndRaw = passphraseHasher(
			withPinAndLength('Correct7 Horse6 Battery5 Staple4')) as GenAndRaw;

		expect(expected.generated).to.equal(actual.generated);
	});
});

