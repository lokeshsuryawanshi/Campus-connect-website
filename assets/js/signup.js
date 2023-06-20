// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAil4ETRhP7vRL6xZNP7bScrREZZTUQmwk",
  authDomain: "college-space-94d3c.firebaseapp.com",
  projectId: "college-space-94d3c",
  storageBucket: "college-space-94d3c.appspot.com",
  messagingSenderId: "618982288990",
  appId: "1:618982288990:web:0902ff4e319ed760978ecf",
  measurementId: "G-KBR17C72PR"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    address = document.getElementById('address').value
    password = document.getElementById('password').value
    name = document.getElementById('name').value
    roll = document.getElementById('roll').value
    milk_before_cereal = document.getElementById('milk_before_cereal').value
  
    // Validate input fields
    if (validate_address(address) == false || validate_password(password) == false) {
      alert('address or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(name) == false || validate_field(roll) == false || validate_field(milk_before_cereal) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithaddressAndPassword(address, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        address : address,
        name : name,
        roll : roll,
        milk_before_cereal : milk_before_cereal,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('student/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    address = document.getElementById('address').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_address(address) == false || validate_password(password) == false) {
      alert('address or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithaddressAndPassword(address, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('student/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_address(address) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(address) == true) {
      // address is good
      return true
    } else {
      // address is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
  