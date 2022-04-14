const fs = require('fs')
const cp = require('child_process')


//Test get Files
const getFiles = (myDir) => {
    return fs.readdirSync(`${myDir}`)
}
//This function return true if the result returned by getFiles is what we expect
const testGetFiles = (dirName) => {
    const myFiles = fs.readdirSync(dirName)
    return JSON.stringify(myFiles)===JSON.stringify(getFiles(dirName))
}


//Create directory test. This function must return true dirName is created with succes.This must return false if fileName already exists
const createDir = (dirName) => {
    if (fs.existsSync(dirName) && fs.lstatSync(dirName).isDirectory()){
        return false
    }
    fs.mkdir(dirName, err => {
        if (err){
            return false
        }
    })
    return true
}

//Create file test. This function must return true fileName is created with succes.This must return false if fileName already exists
const createFile = (fileName) => {
    if (fs.existsSync(fileName) && fs.lstatSync(fileName).isFile()){
        return false
    }
    fs.writeFile(fileName, "", err => {
        if (err){
            return false;
        }
    })
    return true
}


//Move test. This function must return true if file/directory (actual and target) exists and this must return false if file/directory (actual and target) do not exist or if err is raised.
const move = (actualPath, targetPath) => {
    if (fs.existsSync(actualPath)){
        fs.rename(actualPath, targetPath, err=>{
            if(err){
                return false;
            }
        })
        return true
    }
    return false
}


//Delete test. This function must return true fileName or directory name exists and is deleted.Return false otherwise
const deleteDir = (fileName) => {
    if (fs.existsSync(fileName)){
        if(fs.lstatSync(fileName).isFile()){
            fs.unlinkSync(fileName)
            return true
        }
        cp.exec(`rmdir ${fileName}`)
        return true
    }
    return false
}


module.exports = {
    testGetFiles,
    createDir,
    createFile,
    move,
    deleteDir,

}
