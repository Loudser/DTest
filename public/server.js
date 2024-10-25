// server.js
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Route to download the video as MP4
app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).send({ error: 'Invalid URL' });
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const title = info.videoDetails.title;

        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(videoUrl, { format: 'mp4' }).pipe(res);
    } catch (error) {
        res.status(500).send({ error: 'Failed to download video' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
