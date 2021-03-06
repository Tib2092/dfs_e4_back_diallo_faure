//constants declation
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const cp = require('child_process')
const port = 3000
const urlencodedParser = bodyParser.urlencoded({ extended : false})
const alert = require('alert')

//initiation of the template engine
app.set('view engine', 'ejs')

//statics routes
app.use(express.static('public'))
app.use('/css', express.static(__dirname +'public/css'))


//function that takes a directory path and returns the files of this path
const getFiles = (myDir) => {
    return fs.readdirSync(myDir)
}


//function that takes a directory name (path) and creates the directory
const createDir = (dirName) => {
    if (fs.existsSync(dirName) && fs.lstatSync(dirName).isDirectory()){
        console.log('This directory already exists')
        alert(`Directory ${dirName} already exists!`)
    }else {
        fs.mkdir(dirName, err => {
            if (err){
                throw err;
            }else{
                //console.log('Directory saved with succes')
                alert(`Directory ${dirName} created with success!`)

            }
        })
    }

}

//function that takes a file name (path) and creates the file
const createFile = (fileName) => {
    if (fs.existsSync(fileName) && fs.lstatSync(fileName).isFile()){
        console.log('This file already exists')
        alert(`File ${fileName} already exists!`)
    }
    fs.writeFile(fileName, "", err => {
        if (err){
            throw err;
        }else {
            //console.log('file saved')
            alert(`File ${fileName} created with success!`)
        }
    })
}


//function that takes two existing file/directory paths and moves the files/directories. Ex:remove(testdir.txt, ./views/testdir.txt)
const move = (actualPath, targetPath) => {
    if (fs.existsSync(actualPath)){
        fs.rename(actualPath, targetPath, err=>{
            if(err){
                throw err;
            }
        })
        alert(`File ${actualPath} moved with success!`)
    }else{
        //console.log('The target path must be a directory')
        alert('The target path must be a directory')
    }
}

//function that takes a directory/file name (path) and deletes the directory/file. Without recusive
const deleteDir = (fileName) => {
    if (fs.existsSync(fileName)){
        if(fs.lstatSync(fileName).isFile()){
            fs.unlinkSync(fileName)
            alert(`File ${fileName} removed with success!`)
        }
        cp.exec(`rmdir ${fileName}`)
        alert(`Directory ${fileName} removed with success!`)
    }else {
        alert(`${fileName} don't exist. Please give a valid name!`)
    }
}


//function that takes a directory/file name (path) and deletes the directory/file. Without recusive true.Use this function with care
const deleteDirRecursively = (nameFile) => {
    fs.rm(nameFile,{recursive:true,
    }, (err) => {
        if(err){
            throw err;
        }
    })
}


//function that takes a shell command and runs this command on a new terminal
const runShell = (shellCommand) => {
    if (shellCommand && shellCommand != ""){
        cp.exec(`start cmd.exe /K ${shellCommand}`)
    }
}

//Get the root path
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: "Home Page",
    })
})

//path that displays the files in a given directory
app.get('/files', (req, res) => {
    res.render('pages/files', {
        myFiles: getFiles('./'),
        title: 'files views'
    })
})

//method post that sends a file/directory name to the server and creates this file/directory
app.post('/files', urlencodedParser, (req, res) => {
    const dirTarget = req.body.fileName
    if (dirTarget && dirTarget !=""){
        if(dirTarget.split(".").length > 1){
            createFile(dirTarget)
            //spawn('node', ['index.js'])
            //console.log(dirTarget)
            res.render('pages/files', {
            myFiles: getFiles('./'),
            title: 'files views'
            })
        }else {
            createDir(dirTarget)
            //spawn('node', ['index.js'])
            //console.log(dirTarget)
            res.render('pages/files', {
            myFiles: getFiles('./'),
            title: 'files views'
            })  
        }
    }
})


//method post that sends a file/directory name to the server and deletes this file/directory
app.post('/delete', urlencodedParser, (req, res) => {
    const dirTarget = req.body.fileName
    if (dirTarget && dirTarget !=""){
        deleteDir(dirTarget)
        //console.log(dirTarget)
        res.render('pages/files', {
            myFiles: getFiles('./'),
            title: 'files views'
        })
    } 
})

//method post that sends 2 file/directory name to the server and removes first given file/directory
app.post('/move', urlencodedParser, (req, res) => {
    const sujet = req.body.fileName_1
    const target = req.body.fileName_2
    if (sujet && target && sujet !="" && target!=""){
        move(sujet, target)
        //console.log(sujet, target)
        res.render('pages/files', {
            myFiles: getFiles('./'),
            title: 'files views'
        })
    }
})

//method post that sends a shell command to the server and runs that command
app.post('/shell', urlencodedParser, (req, res) => {
    const data = req.body.shell;
    //console.log(data)
    runShell(data)
    res.redirect('/')
})


app.listen(port, () => {
  console.log(`App listening at port http://localhost:${port}`)
})