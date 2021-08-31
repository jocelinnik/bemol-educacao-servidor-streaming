const fs = require("fs");
const path = require("path");

class PostaVideoController {

    armazenarVideo(req, res) {
        let sampleFile, uploadPath, extfile;

        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send("Nao ha arquivos para subir");

        uploadPath = path.join(__dirname, `../videos/${req.body.cursoId}`);
        if(!fs.existsSync(uploadPath))
            fs.mkdir(uploadPath, erro => {
                if(erro)
                    return res.status(500).send(erro);
            });

        sampleFile = req.files.videoaula;
        extfile = sampleFile.mimetype.split("/")[1];
        sampleFile.name = `${req.body.aulaId}.${extfile}`;

        sampleFile.mv(`${uploadPath}/${sampleFile.name}`, erro => {
            if(erro)
                return res.status(500).send(erro);
            
            return res.status(200).send("Feito");
        });
    }
}

module.exports = new PostaVideoController();
