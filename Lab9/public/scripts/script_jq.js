(function($){
      let palindrome = function(phrase) {
      let palindrome = phrase.split('').reverse().join('')
      if (phrase === palindrome) {return phrase}
      else {return false}
    }
    $("#myForm").submit(function(event){
        $('.error').hide()
        let phrase = $('#phrase').val()
        let phraseCopy = phrase
        if(!phrase || phrase.trim().length == 0){
          $('#myForm').append("<p class='error'>Please enter a valid phrase!</p>")
          event.preventDefault()
          return
        }
        phrase = phrase.toLowerCase()
        phrase = phrase.replace(/[^a-z\d]+/gi,'')
        if(phrase.trim().length == 0){
          $('#myForm').append("<p class='error'>Please enter a valid phrase!</p>")
          event.preventDefault()
          return
        }
        let resultList = $('#attempts')
        let result = $('<li></li>')
        let ispalindrome = palindrome(phrase)
        let resultClass = (ispalindrome) ? 'is-palindrome' : 'not-palindrome'
        result.addClass(resultClass)
        result.html(phraseCopy)
        resultList.append(result)
        event.preventDefault()
    })
  })(jQuery)