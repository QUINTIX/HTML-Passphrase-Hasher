# HTML-Passphrase-Hasher
just that: generate plaintext typable passwords from plain language phrases
take SHA256 (any function will do, SHA256 may have not been the best choice) 
of UTF8 text and the the first handful of characters should make for an 
adequetly complex typeable password

So instead of storing actual passwords in keepass or LastPass or whathaveyou, 
there can just be hints and pw length there instead. Not as convinient though 
and may prove entirely unnecessary... 

In fact it might be found to be a dumb idea once someone with a cryptography 
background gives it a look, but got me an A in a java course and have recieve 
complements on (at least the idea of) it so far from a professional java dev 
and a CISSP, so I am running with it.
