# HTML-Passphrase-Hasher
just that: generate typeable passwords from plain language phrases (per XKCD's "Correct Horse Battery Stapple"). Just slice the base64 SHA256 (any one way function will do, SHA256 may have not been the best choice) of UTF8 text, and the the first handful of characters should make for adequetly complex password. So instead of storing actual passwords in keepass or LastPass or whathaveyou, you could have hints and pw length stored instead. Not as convenient though and may prove entirely unnecessary... 

In fact it might be found to be a dumb idea once someone with a cryptography background gives it a look, but it got me an A in a java course and have I received complements on (at least the idea of) it so far from a professional java dev and a CISSP, so I am running with it.

Very special thanks to Jeff Mott and his fellow contributers for creating crypto-js, without which it would have been much harder to get the ball rolling on this HTML version of my old project
https://code.google.com/p/crypto-js
