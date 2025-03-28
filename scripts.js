/*
  --------------------------------------------------------------------------------------
  Função para obter a biblioteca de videogames existentes do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/videogame_view_all';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.videogames.forEach(item => insertList(item.title, item.developer, item.category, item.price))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na biblioteca do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputTitle, inputDeveloper, inputCategory, inputPrice) => {
    const formData = new FormData();
    formData.append('title', inputTitle);
    formData.append('developer', inputDeveloper);
    formData.append('category', inputCategory);
    formData.append('price', inputPrice);
  
    let url = 'http://127.0.0.1:5000/videogame_add';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão de exclusão para cada item da biblioteca
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Remove um item da biblioteca de acordo com o click no botão 'excluir'
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Deleta um item da biblioteca do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    /* Encoding previne problemas com títulos contendo espaço em branco ex: 'Super Mario'*/
    let url = 'http://127.0.0.1:5000/videogame_delete?title=' + encodeURIComponent(item);
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item com título, desenvolvedor, categoria e preço 
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputTitle = document.getElementById("newTitle").value;
    let inputDeveloper = document.getElementById("newDeveloper").value;
    let inputCategory = document.getElementById("newCategory").value;
    let inputPrice = document.getElementById("newPrice").value;
  
    if (inputTitle === '') {
      alert("Escreva o nome de um item!");
    } else if (inputDeveloper === '') {
      alert("Informe o desenvolvedor!");
    } else if (inputCategory === ''){
      alert("Qual a categoria do jogo?")
    } else if (isNaN(inputPrice)){
      alert("Preço deve ser informado!")
    } else {
      insertList(inputTitle, inputDeveloper, inputCategory, inputPrice)
      postItem(inputTitle, inputDeveloper, inputCategory, inputPrice)
      alert("Item adicionado!")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na tabela apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (title, developer, category, price) => {
    var item = [title, developer, category, price]
    var table = document.getElementById('library');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newTitle").value = "";
    document.getElementById("newDeveloper").value = "";
    document.getElementById("newCategory").value = "";
    document.getElementById("newPrice").value = "";
  
    removeElement()
  }