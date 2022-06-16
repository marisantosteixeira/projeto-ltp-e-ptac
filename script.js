let requestURL = "https://www.luizpicolo.com.br/api.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL)
request.responseType = "json";
request.send();
request.onload = function() {
  class ErroCustomizado extends Error {
    constructor(nome_erro, mensagem) {
      super(mensagem)
      this.name = nome_erro
    }
    mensagem() {
      let linhaErro = this.stack.split("\n")[1]
      let linhaErro2 = linhaErro.split("js:")[1]
      let linhaErro3 = linhaErro2.split(")")[0]
      return this.name + ": " + "\n" + this.message + "\n" + "O erro está na linha: " + linhaErro3;
    }
  }
  class Noticia {
    constructor(titulo, nome, data, autor, descricao, link) {
      this.title = titulo;
      this.name = nome;
      this.publishedAt = data;
      this.author = autor;
      this.description = descricao;
      this.url = link;
    }
    mostrarNoticia() {
      if (this.title != " " && this.name != " " && this.publishedAt != " " && this.author != " " && this.url != " ") {
        return `<div class="noticia"> 
          <h1>${this.title} </h1>` +
          `<p class="name">${this.name}</p>` +
          `<p class="data">${this.publishedAt}</p>` +
          `<p class="name">${this.author}</p>` +
          `<p class="resumo">${this.description}</p>` +
          `<a href="${this.url}">Full news here</a> 
       </div>`
      }
      else {
        throw new ErroCustomizado("Erro", "Verifique se a API está correta.");
      }
    }
    mostraN() {
      try {
        return this.mostrarNoticia();
      }
      catch (erro) {
        return mensagem();
      }
      finally {
        console.log("sucesso")
      }
    }
  }
  class NoticiaDestaque extends Noticia {
    constructor(imagem, titulo, nome, data, autor, descricao, link) {
      super(titulo, nome, data, autor, descricao, link)
      this.image = imagem;
    }
    mostrarDestaque() {
      if (this.urlToImage != " " && this.title != " " && this.name != " " && this.publishedAt != " " && this.author != " " && this.url != " ") {
        return `<div class="noticiaDestaque">
<div class="img">
          <img src="${this.image}"/></div>
<div class="conteudo">
          <h1>${this.title}</h1>
<div>
          <p class="name">${this.name}</p> 
          <p class="data">${this.publishedAt}</p> 
          <p class="name">${this.author}</p> 
</div>
          <p class="resumo">${this.description}</p> 
          <a href="${this.url}">Full news here.</a> 
</div>
          </div>`
      }
      else {
        throw new ErroCustomizado("Erro", "Verifique se a API está correta.");
      }
    }
    mostraD() {
      try {
        return this.mostrarDestaque();
      }
      catch (erro) {
        return mensagem();
      }
      finally {
        console.log("sucesso");
      }
    }
  }




  
  let noticias = request.response;
  const destaqueDiv = document.getElementById('notDestaque');
  const noticiasDiv = document.getElementById('noticias');

  

  let noticiasDestaque = new NoticiaDestaque(noticias.articles[0].urlToImage, noticias.articles[0].title, noticias.articles[0].source.name, noticias.articles[0].publishedAt, noticias.articles[0].author, noticias.articles[0].description, noticias.articles[0].url)
  destaqueDiv.insertAdjacentHTML('afterbegin', noticiasDestaque.mostraD())

    noticias.articles.shift();
  
noticias.articles.forEach(noticia => {
    let novaNoticia = new Noticia(noticia.title, noticia.source.name, noticia.publishedAt, noticia.author, noticia.description, noticia.url)

   novaNoticia._titulo = noticia.title;
    novaNoticia._data = noticia.publishedAt;
    novaNoticia._autor = noticia.author;
    novaNoticia._descricao = noticia.description;
    novaNoticia._link = noticia.url;
  
    noticiasDiv.insertAdjacentHTML('afterbegin', novaNoticia.mostraN());
  });
}