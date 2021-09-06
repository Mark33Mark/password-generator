/*==================================================================================
 *    
 *   Javascript file: script.js
 *
 *   < Array method for generating characters >
 * 
 *   Providing this alternative to explore if there are any processing speed differences.
 * 
 *   Updated existing script file so that functionality satisfies the brief.
 *   Date commenced: 3-Sep-2021
 *   Current revision by: Mark Watson   
 *
 ==================================================================================*/

// Variable declarations (globals) ================================================

/* 
    I found the method of using character codes on https://www.youtube.com/watch?v=iKo9pDKKHnc
    In my opinion the concatenation of the ASCII codes to create the Special Characters is overkill.  
    As I'm using the Oracle list, which is even less characters than the YouTube method, the
    concatenation be too complicated so I decided better to list immediately in an array 
    immediately. 
*/

const LOWERCASE_CHARACTERS = constructCharCodeArray(65, 90);
const UPPERCASE_CHARACTERS = constructCharCodeArray(97, 122);
const NUMERAL_CHARACTERS   = constructCharCodeArray(48, 57);

//split special characters array into 2 for readability.
const SPECIAL_CHARACTERS_1  = ["33","35","36","37","39","40","41","43","44","45","46","47"];
const SPECIAL_CHARACTERS_2  = ["58","63","64","91","92","93","94","95","96","123","125","126"];  
const SPECIAL_CHARACTERS    = SPECIAL_CHARACTERS_1.concat(SPECIAL_CHARACTERS_2);

/*
    I decided on using Oracle's Identity Manager Connector Guide for Microsoft Active 
    Directory User Management:
    https://docs.oracle.com/cd/E11223_01/doc.910/e11197/app_special_char.htm#MCMAD416
    It has 24 special characters compared against OWASP which has 33 possible special 
    characters.
*/ 

const generateBtn = document.querySelector("#bGenerate");
const passwordText = document.querySelector("#password");
const copyButton = document.getElementById("bCopy");

// Add event listeners for generate and copy button
generateBtn.addEventListener("click", writePassword);
copyButton.addEventListener("click", copyPasswordToClipboard);

const goodbyeMessage = "Thanks for visiting";  // called on a few times, better declaring it now.

/*================================================================================ 
  ================================================================================ */

function generatePassword() {

  let passwordLength = prompt("Password Criteria    question 1 of 6\n" +
                              "--------------------------------------\n" +
                              "I can generate a password for you, anywhere between " + 
                              "8 characters and up to 128 characters in length.\n\n"+
                              "My default is a minimum 8 character password.\n\n"+
                              "Please type in the password length you require, I accept " +
                              "any number between 8 and 128.\n\n" +
                              "What length password would you like today?\n",8); 

  if (passwordLength === null) {
      alert(goodbyeMessage); 
      return null;
    }

  if ((passwordLength < 8)||(passwordLength > 128)) {

      let incorrectUserInput = confirm("There's a problem.\n\n" +
                                       "You can select a minimum of 8 characters " +
                                       "or any other number up to a maximum of 128 " + 
                                       "characters and less than or equal to 128.\n\n" +
                                       "Try again?");
        
      if (!incorrectUserInput) { /* I like using shorthand for true / false 
                                    instead of: if(incorrectUserInput = false) 
                                 */
          alert(goodbyeMessage); 
          return null;
        } else {
          return null;
        } 
    }
    
  let lowerCase =     confirm("Password Criteria    question 2 of 6\n" +
                              "--------------------------------------\n" +
                              "Would you like lower case letters in your " +
                              "password?\n\nSelect <OK> "+
                              "for yes or <Cancel> for no.");


  let upperCase =     confirm("Password Criteria    question 3 of 6\n" +
                              "--------------------------------------\n" +
                              "Would you like UPPER case " + 
                              "letters in your password?\n\nSelect <OK> "+
                              "for yes or <Cancel> for no.");

  
  let numerical =     confirm("Password Criteria    question 4 of 6\n" +
                              "--------------------------------------\n" +
                              "Would you like numbers " +
                              "included in your password?\n\nSelect <OK> "+
                              "for yes or <Cancel> for no.");


  let specialChar =   confirm("Password Criteria    question 5 of 6\n" +
                              "--------------------------------------\n" +
                              "Finally, how about special characters?\n\n " +
                              "Note: Special characters is recommended " +
                              "to improve the security of your password.\n\n" +
                              "I work with a menu of 24 special characters, " +
                              "they are:\n\n@%\u005C+/'!#$^?:,(){}[]~`-_.\n\n" +
                              "Select <OK> for yes or <Cancel> for no.");
  
  /*  Boolean changed to a yes or no as I think 
      it is more meaningful to a user for this type 
      of information instead of true or false.  
      I just learnt about the Condition Operator ?
      from my literature review.  Giving it a run here.
  */

  (lowerCase)   ? lowerCase   = "yes" : lowerCase = "no";
  (upperCase)   ? upperCase   = "yes" : upperCase = "no";
  (numerical)   ? numerical   = "yes" : numerical = "no";
  (specialChar) ? specialChar = "yes" : specialChar = "no";

  if((lowerCase==="no")&&(upperCase==="no")&&(numerical==="no")&&(specialChar==="no")) {
    
    let nothingSelected = confirm("Mmmmmmmmmm \n " +
                                  "----------------------\n" +
                                  "It seems you've not selected any option for me to generate " +
                                  "a password.  This is what you selected:\n" + 
                                  `  length of password  =  ${passwordLength} characters\n` +
                                  `  lower case                =  ${lowerCase}\n` + 
                                  `  UPPER case              =  ${upperCase.valueOf()}\n` +
                                  `  numbers                   =  ${numerical}\n` +
                                  `  special characters     =  ${specialChar}\n\n` +
                                  "Try again?\n")

    if (!nothingSelected) {
        alert(goodbyeMessage); 
        return null;
      } else {
        return null;
      }                                   
  }

/*   I learnt template literals whilst doing this assignment and decided to use it for 
     this assignment.  
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals  
*/

  let selectionSummary = confirm("Password Criteria    question 6 of 6\n" +
                                 "--------------------------------------\n" +
                                 "Please confirm your selection is as follows:\n\n" +
                                 `  length of password  =  ${passwordLength} characters\n` +
                                 `  lower case                =  ${lowerCase}\n` + 
                                 `  UPPER case              =  ${upperCase.valueOf()}\n` +
                                 `  numbers                   =  ${numerical}\n` +
                                 `  special characters     =  ${specialChar}\n\n` +
                                 "Select <Cancel> if you want to change any of the above.")
    
  if (!selectionSummary){
      alert(goodbyeMessage); 
      return null;
    }

  // Build the character list based on the user's selected criteria.
  
  if (lowerCase === "yes")   { charCodes = LOWERCASE_CHARACTERS; }
  if (upperCase === "yes")   { charCodes = charCodes.concat(UPPERCASE_CHARACTERS); }
  if (numerical === "yes")   { charCodes = charCodes.concat(NUMERAL_CHARACTERS); }
  if (specialChar === "yes") { charCodes = charCodes.concat(SPECIAL_CHARACTERS); }
  
 /* console.time("Array Method"); /* <== left here to look at performance difference between 
                                  string and array methods.  Found string is on average
                                  8% faster!
*/                                  

  let passwordCharacters = [];
   
  for (let i = 0; i < passwordLength; i++) {

    /* From my literature review I learnt how to generate a 
       random integer in a set interval where the max is included
       then this formula is used: 

       Math.floor(Math.random() * (max + 1 - min)) + min)
       
       https://www.w3schools.com/JS/js_random.asp

       Examples of other password generators I found online all excluded the max
       which I think is an error as the processor will not include all possible 
       characters in the random selection process.
    */

    let randomGenerator = Math.floor(Math.random() * (charCodes.length + 1 - 8)) + 8;  
    const characterCode = charCodes[randomGenerator];

    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  return passwordCharacters.join('');
};
  

/*================================================================================ */

/* Thought I'd try JSDoc syntax to comment on a function.  Good for me to 
   do as it gets me to think about each of the parameters in detail.  Only
   doing here as this function has parameters.
*/

/**
* Returns array of ASCII Character Codes.
*
* @param {number} low the lower code reference of the range passed to this function.
* @param {number} high the higher code reference of the range passed to this function.
* @return {array} charCodeArray array of ASCII character codes.
*/

function constructCharCodeArray(low, high) {
  const charCodeArray = []

  for (let i = low; i <= high; i++) {
    charCodeArray.push(i)  
  }

  return charCodeArray
}

/*================================================================================ */

function writePassword() {    // Write password to the element ID: #password  
  let password = generatePassword();   
  
  passwordText.value = password;
/*  console.timeEnd("Array Method"); /* <== left this here to look at performance difference between 
                                            string and array methods.  Found string is on average
                                            8% faster.  Surprised me as array is meant to be more
                                            efficient for the processing.
*/

  return;
}

/*================================================================================ */

/* 
   Noting were told this assessment does not require us to modify the user interface, 
   however I decided to have a go and add to add a copy option to make the app more
   user friendly.
*/
function copyPasswordToClipboard() {
  passwordText.select();
  passwordText.setSelectionRange(0, 99999); // For mobile devices - not working on my device.

  navigator.clipboard.writeText(passwordText.value);
  alert("Copied the password: \n\n" + passwordText.value + "\n\nto your clipboard.");

  /* document.execCommand("copy");    <== flagged as deprecated, however if you have a look
                                          at https://www.w3schools.com/jsref/met_document_execcommand.asp 
                                          the issue is more that it is 'experimental' and could
                                          change.  Found alternative method on www.w3schools.com :
                                          navigator.clipboard.writeText(passwordText.value)
                                        */
}

/*================================================================================ 
  ================================================================================ 
  ================================================================================ */
