
const express = require("express");
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('pagina'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/pagina/pagina.html");
});

app.post('/arquivo', (req, res) => {

  const form = new formidable.IncomingForm();

  form.parse(req, (erro, campos, arquivos) => {

    const [primeiroArquivo, segundoArquivo] = arquivos.arquivoParaUpload

    const urlAntiga = primeiroArquivo.filepath;

    const urlNova = "./enviodearquivos/" + primeiroArquivo.originalFilename;

    let rawData = fs.readFileSync(urlAntiga);

    fs.writeFile(urlNova, rawData, (err) => {
      if (err) console.log(err);
      res.write("Arquivo enviado com sucesso!!");
      res.end();
    });
  });


});
app.get('/arquivo', (req, res) => {
  let listaDearquivos = listarArquivos('enviodearquivos');
  res.send({arquivos: listaDearquivos})
  res.end()
})


function listarArquivos(diretorio, arquivos) {

  if (!arquivos)
    arquivos = []
  let listagemArquivos = fs.readdirSync(diretorio)
  console.log(listagemArquivos)
  return listagemArquivos;
}
listarArquivos('./enviodearquivos')

app.listen(port, () => {
  console.log("Servidor rodando");
});



