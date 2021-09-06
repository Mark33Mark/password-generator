/*==================================================================================
 *       
 *   Javascript file: script.js
 * 
 *  < String method  for generating characters >  
 * 
 *   Updated existing script file so that functionality satisfies the brief.
 *   Date commenced: 3-Sep-2021
 *   Current revision by: Mark Watson   
 *
 ==================================================================================*/

// Variable declarations (globals) ================================================

const LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMERAL_CHARACTERS   = "0123456789";
const SPECIAL_CHARACTERS   = "@%+\u005C/'!#$^?:,(){}[]~`-_.";  /* needed the unicode 
                                                                  for the backslash.
                                                               */   
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

let goodbyeMessage = "Thanks for visiting";  // called on a few times, better declaring it now.

/*================================================================================ */

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

  if ((passwordLength < 8)||(passwordLength > 128)){

      let incorrectUserInput = confirm("There's a problem.\n\nYou can select a minimum " +
                                       "of 8 characters or any other number up to a " + 
                                       "maximum of 128 characters and less than or " +
                                       "equal to 128.\n\n  Try again?");
        
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

/*   I learnt template literals whilst doing this assignment and I like it so been using it a 
     in this assignment.  
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
    
  if (!selectionSummary) {
      alert(goodbyeMessage); 
      return null;
    }

  // Build the character list based on the user's selected criteria.

  let characters = "";   
  let generatedPassword = "";

  if(lowerCase === "yes")    { characters = LOWERCASE_CHARACTERS; }
  if (upperCase === "yes")   { characters += UPPERCASE_CHARACTERS; }
  if (numerical === "yes")   { characters += NUMERAL_CHARACTERS; }
  if (specialChar === "yes") { characters += SPECIAL_CHARACTERS; }
  
/* console.time("String Method");    <== here to look at performance difference between 
                                         string and array methods.  String is faster!
*/
                                      
  for (let i = 0; i < passwordLength; i++) {
    let charLength = characters.length; 
    let randomGenerator = Math.floor(Math.random() * (charLength + 1 - 8)) + 8;  

 /* From my literature review I learnt how to generate a 
    random integer in a set interval where the max is included
    then this formula is used: 

    Math.floor(Math.random() * (max + 1 - min)) + min)
    
    https://www.w3schools.com/JS/js_random.asp

    Examples of other password generators I found online all excluded the max
    which I think is an error as the processor will not include all possible 
    characters in the random selection process.
 */

 /* generatedPassword is 'generating' here.  The 'characters' list is the concatenation 
    of all options selected by the user which took place in the series of if statements
    preceding this for loop.
 */

    generatedPassword += characters.charAt(randomGenerator);
      
  }

  return generatedPassword;
};

/*================================================================================ */

function writePassword() {      // Write password to the element ID: #password
  let password = generatePassword();  

  passwordText.value = password;
/*  console.timeEnd("String Method");  <== here to look at performance difference between 
                                           string and array methods.  String is faster by 
                                           an average of 8%!

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