module.exports = class bdados {
  sqlite3 = require('sqlite3').verbose();

  constructor() {
   new
    this.sqlite3.Database('./tinoco_fruit.db', this.sqlite3.OPEN_READWRITE, (error) => {
      if (error && error.code == 'SQLITE_CANTOPEN') {
        this.criar_banco();
      } else {
        console.log(error);
      }
    });
  }

  criar_banco() {
    let tinoco_fruit = new this.sqlite3.Database('tinoco_fruit.db', (error) => {
      if (error) {
        console.log(error);
        process.exit(1);
      } else {
        this.criar_tabela(tinoco_fruit);
      }
    });
  }

  criar_tabela(bancod) {
    bancod.exec(`
      CREATE TABLE produtos (
        id_produto int primary key not null,
        estoque int not null,
        descricao text not null,
        nome text not null,
        preco float not null,
        categoria text not null,
        tipo text not null
      );

      CREATE TABLE estoque (
        id_estoque int primary key not null,
        setor text not null,
        corredor int not null,
        prateleira int not null,
        produtoId int,
        foreign key (produtoId) references produtos(id_produto)
      );

      CREATE TABLE financeiro (
        id_financeiro int primary key not null,
        data text not null,
        quantidade int not null,
        preco float not null,
        tipo text not null,
        categoria text not null
      );

      CREATE TABLE rh (
        id_rh int primary key not null,
        nome_funcionario text not null,
        cargo text not null,
        salario float not null,
        carga_horaria int not null,
        entrada text not null,
        saida text not null,
        Setor text not null
      );

      CREATE TABLE usuarios(
        id_user int primary key not null,
        nome text not null,
        login text not null,
        senha text not null
      );
    `, (error) => {
      console.log(error);
    });
  }
  executar_query(query){
       let banco = new this.sqlite3.Database('./tinoco_fruit.db')
       return new Promise((resolve, reject) => {
            banco.all(query,(error, response) =>{
                if(error){
                    reject(error);
                }else{
                    resolve(response);
                }
            })
       })
    }
}