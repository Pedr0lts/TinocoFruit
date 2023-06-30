//Turma: 3NA - Curso: ADS
//Pedro Lemos da Trindade Silva - 01563236
//Hitalo Matheus de Lima Almeida - 01351102
//Teófilo Cláudio Espindola - 11026608
//Luiz Eduardo Correia Rocha - 01092206



const express = require('express')
const app = express()
const bdados = require('./banco');
const banco = new bdados();

app.use(express.json())

 app.get('/usuarios', async function(req, res){
    lista_usuarios = await banco.executar_query(`select * from client;`) 
    res.json(lista_usuarios)
})

app.get('/logar', async function(req, res){
    lista_usuarios = await banco.executar_query(`select * from usuarios;`) 
    res.json(lista_usuarios)
})
app.get('/estoque',async function(req, res){
    lista_produtos = await banco.executar_query(`select * from produtos;`)
    res.json(lista_produtos)
})

app.get('/produtos',async function(req, res){
    lista_produtos = await banco.executar_query(`select * from produtos;`)
    res.json(lista_produtos)
})

app.get('/RH', async function(req, res){
    lista_funcionarios = await banco.executar_query(`select * from rh;`)
    res.json(lista_funcionarios)
})

app.get('/RH/folhaponto', async function(req, res){
    lista_folhas = await banco.executar_query(`select * from rh;`)
    res.json(lista_folhas)
}) 


app.get('/financeiro/comprar', async function(req, res){
    relatorio = await banco.executar_query(`select * from financeiro;`)
    res.json(relatorio);
})



app.post('/usuarios/logar', async function(req, res){
    const {email, senha} = req.body
    
    try {

        email_usuario = await banco.executar_query(`select * from usuarios where email = '${login}';`)
        if(!login_user){
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        senha_usuario = await banco.executar_query(`select * from usuarios where senha = '${senha}';`)
        if (!senha_user) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }
        res.json({ message: 'Login realizado com sucesso' });
        
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).json({ message: 'Erro durante o login' });
    }
})


app.get('/RH/:id_usuario',async function(req, res){

    identificador = req.params.id_usuario

    usuario = await banco.executar_query(`select * from usuarios where id_user = '${identificador}';`)



    res.json(usuario)
})

app.post('/usuarios', async function(req, res) {

    novo_usuario = req.body
    query = `insert into usuarios (id_user, nome, login, senha)values ('${novo_usuario.id_usuario}', '${novo_usuario.nome}', '${novo_usuario.email}', '${novo_usuario.senha}');`

    let inserir_usuario = null;
    inserir_usuario = await banco.executar_query(query) 

    if(inserir_usuario != null){
        res.json(inserir_usuario)
    }else{
        res.json('Erro: Falha ao inserir novo usuario')
    }
})

app.delete('/usuarios/:id_usuario', async function(req, res){
    identificador = req.params.id_usuario

    try {
        const usuario = await banco.executar_query(`select * from usuarios where id_user = '${identificador}';`);
    
        if (!usuario) {
          return res.status(404).json({ message: 'Usuario não foi encontrado' });
        }
    
        await banco.executar_query(`delete from usuarios where id_funcionario = '${usuario}';`);
    
        res.json({ message: 'Usuario deletado!' });
      } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        res.status(500).json({ message: 'Erro!' });
      }
})

app.put('/usuario', async function(req, res){
    const {identificador, chave, novo_valor} = req.body
    
    try {

        usuario = await banco.executar_query(`select * from usuarios where id_user = '${identificador}';`)
        if(!usuario){
            return res.status(401).json({ message: 'Usuário não foi encontrado' });
        }

        await banco.executar_query(`update usuarios set '${chave}' = '${novo_valor}' where id_user = '${identificador}';`)
        
        res.json({ message: 'Alteração realizada' }); 
        
    } catch (error) {
        console.error('Erro durante a alteração:', error);
        res.status(500).json({ message: 'Erro durante a atualização' });
    }
})

app.delete('/RH/:id_funcionario', async function(req, res){
    identificador = req.params.id_funcionario

    try {
        const funcionario = await banco.executar_query(`select * from rh where id_rh = '${identificador}';`);
    
        if (!funcionario) {
          return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
    
        await banco.executar_query(`delete from rh where id_rh = '${identificador}';`);
    
        res.json({ message: 'Funcionário demitido' });
      } catch (error) {
        console.error('Erro ao demitir funcionário:', error);
        res.status(500).json({ message: 'Erro ao demitir funcionário' });
      }
})

app.post('/RH', async function(req, res){

    novo_func = req.body

    query = `insert into funcionarios(id_rh, nome, cargo, salario, carga_horaria, setor) values ('${novo_func.id_funcionario}', '${novo_func.nome}','${novo_func.cargo}','${novo_func.salario}','${novo_func.carga_horaria}','${novo_func.setor}');`

    let contratar_funcionario = null;
    contratar_funcionario = await banco.executar_query(query) 

    if(contratar_funcionario != null){
        res.json(contratar_funcionario)
    }else{
        res.json({'erro':'Falha ao criar novo usuario'})
    }
})

app.get('/RH/:id_funcionario',async function(req, res){

    identificador = req.params.id_funcionario

    funcionario = await banco.executar_query(`select * from frh where id_rh = '${identificador}';`)

    res.json(funcionario)
})

app.put('/RH', async function(req, res){
    const {identificador, chave, novo_valor} = req.body
    
    try {

        funcionario = await banco.executar_query(`select * from rh where id_rh = '${identificador}';`)

        if(!funcionario){
            return res.status(401).json({ message: 'Funcionario não encontrado' });
        }

        await banco.executar_query(`update rh set '${chave}' = '${novo_valor}' where id_rh = '${identificador}';`)
        
        res.json({ message: 'Atualização realizado com sucesso' }); 
        
    } catch (error) {
        console.error('Erro durante a atualização:', error);
        res.status(500).json({ message: 'Erro durante a atualização' });
    }
})

app.post('/produtos', async function(req, res){

    novo_prod = req.body

    query = `insert into produtos (id_produto, estoque, descricao, nome, preco, categoria, tipo)
    values ('${novo_prod.id_produto}','${novo_prod.estoque}','${novo_prod.descricao}','${novo_prod.nome}','${novo_prod.preco}','${novo_prod.categoria}','${novo_prod.tipo}');`

    let inserir_produto = null;
    inserir_produto = await banco.executar_query(query) 

    if(inserir_produto != null){
        res.json(inserir_produto)
    }else{
        res.json({'erro':'falha ao adicionar novo produto'})
    }
})

app.put('/produtos', async function(req, res){
    const {identificador, chave, novo_valor} = req.body
    
    try {

        produto = await banco.executar_query(`select * from produtos where id_produto = '${identificador}';`)
        if(!produto){
            return res.status(401).json({ message: 'Produto não encontrado' });
        }

        await banco.executar_query(`update produtos set '${chave}' = '${novo_valor}' where id_produto = '${identificador}';`)
        
        res.json({ message: 'Atualização realizado com sucesso' }); 
        
    } catch (error) {
        console.error('Erro durante a atualização:', error);
        res.status(500).json({ message: 'Erro durante a atualização' });
    }
})

app.delete('/usuarios/:id_produto', async function(req, res){
    identificador = req.params.id_produto

    try {
        const produto = await banco.executar_query(`select * from produtos where id_produto = '${identificador}';`);
    
        if (!produto) {
          return res.status(404).json({ message: 'Produto não encontrado' });
        }
    
        await banco.executar_query(`delete from produtos where id_produto = '${identificador}';`);
    
        res.json({ message: 'Produto deletado com sucesso' });
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ message: 'Erro ao deletar produto' });
      }
})

app.get('/RH/:id_produto',async function(req, res){

    identificador = req.params.id_produto

    produto = await banco.executar_query(`select * from produtos where id_produto = '${identificador}';`)

    res.json(produto)
})

app.post('/estoque', async function(req, res){

    const novo_estoque = req.body
    const produto = await banco.executar_query(`select * from produtos where nome = '${novo_estoque.produto}';`)
  


    if (novo_estoque.produto != produto[0].nome) {
        return res.status(401).json({ message: 'Produto não encontrado' });
      }
    
    const query = `insert into estoque (id_estoque, setor, corredor, prateleira) values('${novo_estoque.id_estoque}','${novo_estoque.setor}','${novo_estoque.corredor}','${novo_estoque.prateleira}');`;
    
    try {
        await banco.executar_query(query);
        res.json({ message: 'Estoque verificado' });
    } catch (error) {
        console.error('Falha ao gerenciar estoque:', error);
        res.status(500).json({ error: 'Falha ao gerenciar estoque' });
      }
    })

    app.put('/estoque', async function(req, res){
        const {identificador, chave, novo_valor} = req.body
        
        try {
    
            estoque = await banco.executar_query(`select * from estoque where id_estoque = '${identificador}';`)
            if(!estoque){
                return res.status(401).json({ message: 'Registro de estoque não encontrado' });
            }
    
            await banco.executar_query(`update estoque set '${chave}' = '${novo_valor}' where id_estoque = '${identificador}';`)
            
            res.json({ message: 'Atualização realizado com sucesso' }); 
            
        } catch (error) {
            console.error('Erro durante a atualização:', error);
            res.status(500).json({ message: 'Erro durante a atualização' });
        }
    })

app.post('/financeiro/comprar', async function(req, res){

    compra = req.body
    
    try {
        produto = await banco.executar_query(`select * from produtos where id_produto = '${compra.produto}';`);
    
        if (!produto) {
          return res.status(404).json({ message: 'Produto não encontrado' });
        }
    
        query = (`insert into financeiro(id_financeiro, data, quantidade, preco, produto, tipo) values('${compra.id_financeiro}','${compra.data}','${compra.quantidade}','${compra.preco}','${compra.produto}','${compra.tipo}');`)

        await banco.executar_query(query);

        adicionar = produto[0].quantidade_estoque + compra.quantidade;

        await banco.executar_query(`update produtos set estoque = '${adicionar}' where id_produto = '${compra.produto}';`)

        financeiro = await banco.executar_query(`select * from financeiro where id_financeiro = '${compra.id_financeiro}';`)

        let total = Number(financeiro[0].preco * financeiro[0].quantidade)

        const nota_fiscal = `--------------TinocoFruit--------------\n
Data             ${financeiro[0].data}
${produto[0].nome}             ${financeiro[0].preco} x ${financeiro[0].quantidade} UNI
Total                ${total}`;

        console.log(nota_fiscal)
        res.json({ message: 'Estoque reabastecido!'});
        

    }catch (error) {
        console.error('Erro durante a compra:', error);
        res.status(500).json({ message: 'Erro durante a compra' });
    }
})

app.post('/financeiro/vender', async function(req, res){

    const {id_financeiro, data, quantidade, id_produto, tipo} = req.body
    
    try {
        um_produto = await banco.executar_query(`select * from produtos where id_produto = '${id_produto}';`);
    
        if (!um_produto) {
          return res.status(404).json({ message: 'Produto não encontrado' });
        }

        if(um_produto[0].estoque == 0 || um_produto[0].quantidade_estoque < quantidade){
            return res.status(404).json({ message: 'Sem estoque suficiente' });
        }
    
        query = (`insert into financeiro(id_financeiro, data, quantidade, preco, produto, tipo) values('${id_financeiro}','${data}','${quantidade}','${um_produto[0].preco}','${id_produto}','${tipo}');`)

        await banco.executar_query(query);

        adicionar = um_produto[0].estoque - quantidade;

        await banco.executar_query(`update produtos set estoque = '${adicionar}' where id_produto = '${id_produto}';`)

        financeiro = await banco.executar_query(`select * from financeiro where id_financeiro = '${compra.id_financeiro}';`)

        let total = Number(financeiro[0].preco * financeiro[0].quantidade)

        const nota_fiscal = `---------TinocoFruit---------\n
Data             ${financeiro[0].data}
${produto[0].nome}             ${financeiro[0].preco} x ${financeiro[0].quantidade} UNI
Total                ${total}`;

        console.log(nota_fiscal)
        res.json({ message: 'Venda realizada'});
        

    }catch (error) {
        console.error('Erro durante a venda:', error);
        res.status(500).json({ message: 'Erro durante a venda' });
    }
})