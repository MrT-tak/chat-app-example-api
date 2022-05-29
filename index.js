const EXPRESS = require('express');
const app = EXPRESS();
const PORT = PORTChoosing()
const fs = require('fs');
//const message = temporaryProcess();
const shellPrompt = require('prompt-sync');
const prompt = shellPrompt();
require('dotenv').config();
const cors = require('cors');
//const ioHook = require('iohook');
const inputEvent = require('input-event');
//const input = new inputEvent('/dev/input/event0');
//const keyboard = new inputEvent.Keyboard();
//const authorizationSystem = require('authorizationSystem/index.js');
//checkAccessibilityConfig = undefined
const checkAccessibility = require('./middleware/checkAccessibility/index.js');//'..//middleware/checkAccessibility/index.js');
const JsonDB = require('node-json-db');
 
//app.set('trust proxy', true);

function consoleLogUserInfo(req, res, next) {
    const ip = req.ip;
    console.log('IP Address: ' + ip);
    console.log("\"")
    console.log(req)
    console.log("\"")
    next();
}

//moved and updated in middleware/checkAccessibility/index.js
//function checkAccessibility(req, res, next, options) {
//     const allowedRoles = options[0]//.allowedRoles//checkAccessibilityConfig[0];
//     const ifBlockReply = options.ifBlockReply//checkAccessibilityConfig[1];
//     const ifBlockedReplyStatus = options.ifBlockedReplyStatus//checkAccessibilityConfig[2];
//    const AuthenticationDetails = req.headers['x-authorization'];
//    if(AuthenticationDetails === undefined) {
//        res.status(401).send('BLOCKED, Unauthorized, Please add authorization details on x-authorization header');
//        return;
//    }else{
//
//    }
//}

function consoleInterface() {
    let command = Prompt('What program command would you like to run?');
    runProgramCommand(command);
}

function PORTChoosing() {
    if (process.env.PORT) {
        return process.env.PORT;
    } else if (true) {
        return 3000;
    }else {
        return 3300;
    }
}


app.listen(PORT, () => {
    console.log('SUPER PROXY IS online ON PORT: ' + PORT);
    console.info("http://localhost:" + PORT)
})

app.use(cors({origin: ['http://localhost:3000', 'http://localhost:5500']}));

app.use(consoleLogUserInfo);

app.get('/', (req, res) => {
    res.send('Welcome to learn backend with express! https://localhost:${PORT}');
});

app.get('/messageHandler/', (req, res) => {
    res.send('Welcome');
});

app.get('/messageHandler/:id/message/', (req, res) => {
    const GroupCode = req.params.id;
    const requestBody = req.body;

    res.send(fs('${GroupCode}.json', 'utf-8'));
});

app.get('/messageHandler/:id/details/', (req, res) => {
    const GroupCode = req.params.id;
    const FName = ('Details-'+ GroupCode +'.json')

    res.status(200).json(fs.readFileSync('Details-' + GroupCode + '.json', 'UTF-8'));
});

app.post('/groupHandler/create/', (req, res) => {
    res.status('200').send('Group Created');
});


app.get('/ADMIN/', checkAccessibility('ADMIN', 'BLOCKED, You are not allowed to access this page  if you believe this is a mistake, contact the admin, try again later or if you are the admin please check the ip address in the ADMIN/ACCEPTEDIP.json file.     THX', '403'), (req, res) => {
    const allowedIPs = fs.readFileSync('ADMIN/ACCEPTEDIP.json', 'utf-8');
    if (allowedIPs.find(req.ip)) { //if the ip is allowed
        res.send(fs.readFileSync('ADMIN/index.html', 'UTF-8'));
    } else {
        res.send('BLOCKED, You are not allowed to access this page  if you believe this is a mistake, contact the admin, try again later or if you are the admin please check the ip address in the ADMIN/ACCEPTEDIP.json file.     THX').status(403);
    }
})
    //e.addEventListener("keyup", func esletion(event) {
    //    if (event.code === 'x') {
    //        console.log('x key is pressed');
    //        console.log('saving data');
    //        fileManger.writeFile('data.json', JSON.stringify(message), (err) => {
    //            console.log(err);
    //        })
    //        
    //    }
    //    return;
    //    
    //}); 

    //e.addEventListener("keyup", func esletion(event) {
    //    if (event.code === 'x') {
    //        console.log('x key is pressed');
    //        console.log('saving data');
    //        fileManger.writeFile('data.json', JSON.stringify(message), (err) => {
    //            console.log(err);
    //        })
    //        
    //    }
    //    return;
    //    
    //}); 

    

//keyboard.on("keyup", function consoleHotKeyCheck(event) {
//        if (event.code === 'c') {
//        console.log('c key is pressed');
//        let command = prompt('What program command would you like to run?');
//        runProgramCommand(command);
//        
//    }
//    return;
//    
//})

function runProgramCommand(command) {
    if (command === 'clear') {
        console.clear();
    } else if (command === 'exit') {
        process.exit();
    } else if (command === null) {
        let command = Prompt('What program command would you like to run?');
        runProgramCommand(command);
    } else if (command === 'Activate no response mode') {
        let noResponseMode = true;
        console.log('No response mode activated');
        let args = Prompt('Change Mode(Maintenace? IDK):')
        if (args === 'IDK') return
        if (args === 'Maintenace') {
            console.log('Maintenace mode activated');
            let MaintenaceMode = true;
        }
        console.log('Ignoring all request')
        let ignoreRequest = true;
        console.log('To stop ignoring request, after you start the console type "Deactivate no response mode"');
    } else if (command === 'Deactivate no response mode') {
        if(noResponseMode === true) {
            let noResponseMode = false;
            console.log('No response mode deactivated');
            console.log('Ignoring all request')
            let ignoreRequest = true;
            let args = prompt(' Mode(Maintenace? IDK):')
            if (MaintenaceMode === true) {
                let MaintenaceMode = false;
            }
        }else {
            console.log('No response mode is not activated');
        }
        console.log('To stop ignoring request, after you start the console type "Deactivate no response mode"');
    } else if (command === 'help') {
        console.log('clear - clears the console');
        console.log('exit - exits the program');
        console.log('help - shows this help menu');
    } else {
        console.log('Command not found');
    }
}
 