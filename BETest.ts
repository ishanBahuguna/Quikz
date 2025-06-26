// create-room

{
    "type":"create-room",
     "username":"admin",
    "payload":[{
         "question":"what is 2+2",
         "option1":"1",
         "option2":"4",
         "option3":"6",
         "option4":"1",
         "correctOption":"2"
    },
    {
 
         "question":"what is 2+4",
         "option1":"1",
         "option2":"4",
         "option3":"6",
         "option4":"1",
         "correctOption":"2"
    },
 
    {
         "question":"what is 2+8",
         "option1":"1",
         "option2":"4",
         "option3":"6",
         "option4":"10",
         "correctOption":"2"
    },
    {
          "question":"what is 10",
         "option1":"1",
         "option2":"4",
         "option3":"6",
         "option4":"10",
         "correctOption":"2"
    }
    
    ]
 }

// start-quiz:
{
    "type":"start-quiz",
    "roomCode":"7249"
}

// join-room
{
    "type":"join-room",
     "username":"ishan",
     "roomCode":"7249"
 }

 {
    "type":"join-room",
     "username":"harshit",
     "roomCode":"7249"
 }



