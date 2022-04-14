const index = require('../index.js')

//Cette partie teste si la fonction testGetFiles retourne les répertoires attendus dans './'
describe('GetFiles', () => {
    it('Should be true', () => {
        expect(index.testGetFiles('./')).toEqual(true)
    })
})

//Cette partie teste si createDir crée bien un dossier s'il n'existe pas et s'il refuse de créer un dossier qui existe déjà
describe('Create_dir', () => {
    it('Should be true', () => {
        expect(index.createDir('TestJest')).toEqual(true)
    })

    it('Should be false', () => {
        expect(index.createDir('add4')).toEqual(false)
    })
})

//Cette partie teste si createFile crée un fichier qui n'existe pas et refuse de créer un fichier qui existe
describe('Create_file', () => {
    it('Should be true', () => {
        expect(index.createFile('testJest2.txt')).toEqual(true)
    })

    it('Should be false', () => {
        expect(index.createFile('testJest.txt')).toEqual(false)
    })
})


//Cette partie teste si la fonction move déplace un fichier/dossier qui existe vers un répertoire qui existe. Et réfuse autrement.
describe('Move_file', () => {
    it('Should be true', () => {
        expect(index.move('testJest.txt', './add4/testJest.txt')).toEqual(true)
    })

    it('Should be false', () => {
        expect(index.move('testJe.txt', './add4/testJe.txt')).toEqual(false)
    })
})

//Cette partie vérifie si la fonction deleteDir supprime un fichier/dossier qui existe et refuse autrement.
describe('Delete_file', () => {
    it('Should be true', () => {
        expect(index.deleteDir('testDelete.txt')).toEqual(true)
    })

    it('Should be false', () => {
        expect(index.deleteDir('testJe.txt')).toEqual(false)
    })
})

