const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const urlencodedParser = bodyParser.urlencoded({ extended : false})
app.set('view engine', 'ejs')

const fs = require('fs')
const cp = require('child_process')

const getFiles = (myDir) => {
    return fs.readdirSync(`${myDir}`)
}

const createDir = (dirName) => {
    if (fs.existsSync(`${dirName}`) && fs.lstatSync(`${dirName}`).isDirectory()){
        console.log('This directory already exists')
    }else {
        fs.mkdir(`${dirName}`, err => {
            if (err){
                throw err;
            }else{
                console.log('Directory saved with succes')
            }
        })
    }

}

const createFile = (fileName) => {
    if (fs.existsSync(`${fileName}`) && fs.lstatSync(`${fileName}`).isFile()){
        console.log('This file already exists')
    }
    fs.writeFile(`${fileName}`, "", err => {
        if (err){
            throw err;
        }
        console.log('file saved')
    })
}

const remove = (actualPath, targetPath) => {
    if (fs.existsSync(`${actualPath}`)){
        fs.rename(`${actualPath}`, `${targetPath}`, err=>{
            if(err){
                throw err;
            }
        })
    }console.log('The target path must be a directory')
}

const deleteDir = (fileName) => {
    if (fs.existsSync(fileName)){
        if(fs.lstatSync(fileName).isFile()){
            fs.unlinkSync(fileName)
        }else{
            cp.exec(`rm -r ${fileName}`)
        }
    }
}

const execShell = () => {
    cp.exec('start -a Terminal')
    //cp.exec(`${command}`)
}

//execShell()
//cp.exec('open -a Terminal .')


const myFiles = getFiles('./')
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: "Home Page",
    })
})


app.get('/files', (req, res) => {
    res.render('pages/files', {
        myFiles: myFiles,
        title: 'files views'
    })
})

app.post('/files', urlencodedParser, (req, res) => {
    const dirTarget = req.body.fileName
    if (dirTarget && dirTarget !=""){
        if(dirTarget.split(".").length > 1){
            createFile(dirTarget)
            //spawn('node', ['index.js'])
            //console.log(dirTarget)
            res.render('pages/files', {
            myFiles: getFiles("./"),
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

app.post('/delete', urlencodedParser, (req, res) => {
    const dirTarget = req.body.fileName
    if (dirTarget && dirTarget !=""){
        deleteDir(dirTarget)
        console.log(dirTarget)
        res.render('pages/delete', {
        file: dirTarget,
        title: 'Deleted file',
    })
    } 
})

app.post('/remove', urlencodedParser, (req, res) => {
    const sujet = req.body.fileName_1
    const target = req.body.fileName_2
    if (sujet && target && sujet !="" && target!=""){
        remove(sujet, target)
        console.log(sujet, target)
        res.render('pages/remove', {
        sujet: sujet,
        target: target,
        title: 'Removed file',
    })
    }
})


app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})