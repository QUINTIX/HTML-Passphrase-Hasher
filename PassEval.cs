using System;

namespace CorrectHorse
{
    public class PassEval
    {
        private int[] alphChars; //index of alpha characters
        private int numSym = 0;   //number of existing Symbols
        private int numDig = 0;	//number of existing Digits
        private int alpha = 0;
        private Boolean oneCase = false;
        private int[] nonAlpha; //locations of symbols and digits


        private void passEval(char[] password)
        {
            //build index of alpha character locations
            int LENGTH = (password.Length < 16) ? password.Length:  16 ;
            alphChars = new int[LENGTH];
            nonAlpha = new int[LENGTH];

            int numlower = 0;
            for (int i = 0; i < LENGTH; i++)
            {
                if (Char.IsLetter(password[i]))
                {
                    ;
                    alphChars[alpha++] = i;
                    if ((password[i] & 32) == 32) { numlower++; } //count the number of lower case characters
                }
                else
                    if (Char.IsDigit(password[i]))
                    {
                        nonAlpha[numDig++] = i;
                    }
                    else
                    {
                        nonAlpha[LENGTH - (++numSym)] = i;
                        //numSym++; 
                    }
            }//end of loop

            if ((numlower == 0) || (numlower == alpha)) // if none or all are lower case
                { oneCase = true; }
                
        }

        public bool isOneCase(){return oneCase;}

        public PassEval(char[] pwd, byte[] hash)
        {
            passEval(pwd);
            if (alpha > 1) { scrambleAlpha(hash); }
            if (numDig > 1) { scrambleDig( hash); }
            if (numSym > 1) { scrambleSym(hash); }
        }

        private void scrambleAlpha( byte[] hash) {
            if (hash.Length > this.getNumAlpha())
            {
                int LENGTH = (this.getNumAlpha() < 16) ? this.getNumAlpha() : 16;

                for (int i = 1; i <= LENGTH; i++)
                {
                   // int hash_pos = (hash.Length - (LENGTH + i)); //work from end of hash; where password chars are not extracted
                    int hash_pos = (i + hash[15]) & 0x0f; //assume SHA256, use last half octet as offset; modulus by 16
                    //one of the reasons the password can be no longer than 15 chars
                    //two positions are selected using each byte.
                    int swap1 = (hash[hash_pos] & 0x0F) % LENGTH;
                    int swap2 = ((hash[hash_pos] >> 4) & 0x0F) % LENGTH; //mask off negative numbers
                    //maybe worthwhile to check if they're equal, but unlikely, and result would be the same

                    //swap em
                    int temp = alphChars[swap1];
                    alphChars[swap1] = alphChars[swap2];
                    alphChars[swap2] = temp;
                } //todo: deal with the fact that shifts preserve sign, and these are signed bytes
            }
        }


        //same as swap alpha, but for digits
        private void scrambleDig(byte[] hash)
        {
            if (hash.Length > this.getNumDig() + 4)
            {
                int LENGTH = (this.getNumDig() < 16) ? this.getNumDig() : 16;

                for (int i = 1; i <= LENGTH; i++)
                {
                    int hash_pos = hash_pos = (i + hash[15] + 4) & 0x0f; 
                    int swap1 = (hash[hash_pos] & 0x0F) % LENGTH;
                    int swap2 = ((hash[hash_pos] >> 4) & 0x0F) % LENGTH;

                    //swap em
                    int temp = nonAlpha[swap1];
                    nonAlpha[swap1] = nonAlpha[swap2];
                    nonAlpha[swap2] = temp;
                }
            }
        }

        private void scrambleSym(byte[] hash)
        {
                if (hash.Length <= (this.getNumSym() + 6)){return;}
                int LENGTH = (this.getNumSym() < 16) ? this.getNumSym() : 16;
                for (int i = 1; i <= LENGTH; i++)
                {
                    int hash_pos = hash_pos = (i + hash[15] + 6) & 0x0f; 
                    int swap1 = nonAlpha.Length - 1 - ((hash[hash_pos] & 0x0F) % LENGTH);
                    int swap2 = nonAlpha.Length - 1 - (((hash[hash_pos] >> 4) & 0x0F) % LENGTH);

                    //swap em
                    int temp = nonAlpha[swap1];
                    nonAlpha[swap1] = nonAlpha[swap2];
                    nonAlpha[swap2] = temp;
                }
        }

        public int[] GetAlphaIdxs() { return alphChars; }
        public int[] GetNonAlpahIdxs() { return nonAlpha;  }
        public int getNumSym() { return numSym; }
        public int getNumDig() { return numDig; }
        public int getNumAlpha() { return alpha; }
    

    
    }

}