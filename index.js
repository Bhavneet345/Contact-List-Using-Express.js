const exp = require('constants');
const { getCipherInfo } = require('crypto');
const express = require('express');
const path = require('path')
const port = 8000;

const app = express();

var contactList = [
    {
        ContactName: "Bhavneet",
        ContactNo : "11111111"
    },
    {
        ContactName: "Coding Ninjas", 
        ContactNo: "22222222"
    }
];

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));

// //middleware - 1
// app.use(function(req, res, next){
//     console.log("middleware-1 called");
//     next();
// });

// //middleware - 2
// app.use(function(req, res, next){
//     console.log("middleware-2 called");
//     next();
// }); 


app.get('/', function(req, res){
    return res.render('home', {
        title: "Contact List", 
        contact_list: contactList
    });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: 'Lets play with ejs', 
    })
})

app.get('/delete-contact/', function(req, res){
    // console.log(req.query);
    let phone = req.query.phone;
    console.log(phone);
    let contactIndex = -1;
    for(var i = 0; i < contactList.length; i++){
        if(contactList[i].ContactNo == phone){
            contactIndex = i;
            break;
        }
    }
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }
    // return res.render('home',{
    //     title: "Contact List", 
    //     contact_list: contactList
    // });
    return res.redirect('back');
})

app.post('/create-contact', function(req, res){
    contactList.push(req.body);
    // return res.render('home',{
    //     title: "Contact List", 
    //     contact_list: contactList
    // });
    return res.redirect('back');
})

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server running on port", port);
})