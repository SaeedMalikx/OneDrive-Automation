

const fs = require("fs");

class Utilities{
    constructor () {
      }
    checkFileContents(path){
        const data = fs.readFileSync(path, 'utf8')
        return data
        
    }
    deleteFile(path){
        fs.unlinkSync(path)
    }
    getMetadata(path){
        const stats = fs.statSync(path)
        let fileSizeInBytes = stats["size"]
        return fileSizeInBytes
    }


}

module.exports = Utilities;