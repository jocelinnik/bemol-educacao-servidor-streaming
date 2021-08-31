const fs = require("fs");
const path = require("path");

class StreamingController {

    getVideo(req, res) {
        const range = req.headers.range;
        if(!range) 
            return res.status(400).send("Requires Range header");

        const videoPath = path.join(__dirname, `../videos/${req.body.cursoId}/${req.body.aulaId}.mp4`);
        if(!fs.existsSync(videoPath))
            return res.status(404).send("Vídeo não encontrado");
        
        const videoSize = fs.statSync(videoPath).size;

        const CHUNK_SIZE = 10 ** 6; // 1 MB
        let start = Number(range.replace(/\D/g, ""));
        let end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        let contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        };

        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(videoPath, {start, end});
        videoStream.pipe(res);
    }
}

module.exports = new StreamingController();
