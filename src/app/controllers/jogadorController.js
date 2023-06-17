import { openDb } from "../../dbConnection.js";
import jogador from "../models/jogador.js";

class JogadorController{
      createPlayer(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Jogador (id INTEGER PRIMARY KEY, nome TEXT, funcao TEXT, personagem TEXT, time_id INTEGER, FOREIGN KEY(time_id) REFERENCES Time(id))');
        });
    }
    
    insertPlayer(req, res){
        jogador.nome = req.body.nome;
        jogador.funcao = req.body.funcao;
        jogador.personagem = req.body.personagem;
        jogador.time_id = req.body.time_id;
        openDb().then(db => {
            db.run('INSERT INTO Jogador (nome, funcao, personagem, time_id) VALUES (?, ?, ?, ?)', [jogador.nome, jogador.funcao, jogador.personagem, jogador.time_id]);
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    updatePlayer(req, res){
        jogador.nome = req.body.nome;
        jogador.funcao = req.body.funcao;
        jogador.personagem = req.body.personagem;
        jogador.time_id = req.body.time_id; 
        jogador.id = req.body.id;
        openDb().then(db => {
            db.run('UPDATE Jogador SET nome=?, funcao=?, personagem=?, time_id=? WHERE id=?', [jogador.nome, jogador.funcao, jogador.personagem, jogador.time_id, jogador.id]); 
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    selectPlayers(req, res){
       return openDb().then(db => {
            return db.all('SELECT Jogador.id, Jogador.nome, Jogador.funcao, Jogador.personagem, Time.nome AS time FROM Jogador JOIN Time ON Jogador.time_id = Time.id')
            .then(jogadores => res.json(jogadores));
        });
    }
    
    selectPlayer(req, res){
        jogador.id = req.body.id;   
        return openDb().then(db => {
             return db.get('SELECT Jogador.id, Jogador.nome, Jogador.funcao, Jogador.personagem, Time.nome AS time FROM Jogador JOIN Time ON Jogador.time_id = Time.id WHERE Jogador.id = ?', [jogador.id])
             .then(jogador => res.json(jogador));
         });
     }
    
    deletePlayer(req, res){
        jogador.id = req.body.id;
        openDb().then(db => {
            db.get('DELETE FROM Jogador WHERE id=?', [jogador.id])
            .then(res => res);
         });
    
         res.json({
            "statusCode": 200,
            "message": "Success"
        });
     }
}

export default new JogadorController();