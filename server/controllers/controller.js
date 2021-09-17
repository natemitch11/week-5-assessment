const bcrypt = require("bcrypt");
const users = [] 


module.exports = {
    Compliments: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!",
                           "Cool shirt!",
                           "Your Javascript skills are stellar.",
        ];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
        
      },
      login: (req, res) => {
        console.log('Logging In User')
        const { username, password } = req.body
    
        for (let i = 0; i < users.length; i++) {
          if (users[i].username === username) {
            const existing = bcrypt.compareSync(password, users[i].passHash)
    
            if (existing){
              let returnObj = {message: `<a href="/client/assets/homepage/index.html">Home Page Redirect Link</a>`}          
              return res.status(200).send(returnObj)
            }
          }
        }
        return res.status(400).send("Incorrect Username or Password")
      },
      
      register: (req, res) => {
        const {username, email, firstName, lastName, password} = req.body
          
        for (let i = 0; i< users.length; i++){
          if (users[i].username === username)
            return res.status(400).send("Username already exists") 
        }
          
        const salt = bcrypt.genSaltSync(10)
        const passHash = bcrypt.hashSync(password, salt);
            
        let userObj = { 
          username,
          email,
          firstName,
          lastName,
          passHash
        }
    
        console.log('Registering User')
        users.push(userObj)
        let returnObj = {message: "<p>Registered Successfully</p>"}
        res.status(200).send(returnObj)
      }
}