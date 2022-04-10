const fs = require('fs')
const cp = require('child_process')

cp.exec('ls')

const getFiles = () => {
    fs.readdirSync('./')
}

function test(dirfile) {
    const result = fs.readdirSync(`${dirfile}`)
    return result;
  }
/*
  console.log(fs.lstatSync('./').isDirectory())
  console.log(fs.lstatSync('./').isFile())

  
  /*

const addES6 = () => { return fs.readdirSync('./') }

const gff = addES6()
console.log(gff)


const db = test('./');
console.log(db)
*/