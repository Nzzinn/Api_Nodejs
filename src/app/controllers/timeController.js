import { openDb } from "../../dbConnection.js";
import time from "../models/time.js"

class TimeController{
    createTeam(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Time (id INTEGER PRIMARY KEY, nome TEXT, integrantes INTEGER, camp_jogados INTEGER, camp_vencidos INTEGER)');
        });
    }
    
    insertTeam(req, res){
        time.nome = req.body.nome;
        time.integrantes = req.body.integrantes;
        time.camp_jogados = req.body.camp_jogados;
        time.camp_vencidos = req.body.camp_vencidos;
        openDb().then(db => {
            db.run('INSERT INTO Time (nome, integrantes, camp_jogados, camp_vencidos) VALUES (?, ?, ?, ?)', [time.nome, time.integrantes, time.camp_jogados, time.camp_vencidos]);
        });
    
        res.json({
            "statusCode": 200
        });
    }
    
    updateTeam(req, res){
        time.nome = req.body.nome;
        time.integrantes = req.body.integrantes;
        time.camp_jogados = req.body.camp_jogados;
        time.camp_vencidos = req.body.camp_vencidos;
        time.id = req.body.id;
        openDb().then(db => {
            db.run('UPDATE Time SET nome=?, integrantes=?, camp_jogados=?,camp_vencidos=? WHERE id=?', [time.nome, time.integrantes, time.camp_jogados, time.camp_vencidos, time.id]);  
        });
    
        res.json({
            "statusCode": 200
        });
    }
    
    selectTeams(req, res){
        return openDb().then(db => {
             return db.all('SELECT * FROM Time')
             .then(times => res.json(times));
         });
     }
    
    selectTeam(req, res){
        time.id = req.body.id;
        return openDb().then(db => {
             return db.get('SELECT * FROM Time WHERE id=?', [time.id])
             .then(time => res.json(time));
         });
     }
    
    deleteTeam(req, res){
        time.id = req.body.id;
        openDb().then(db => {
            db.get('DELETE FROM Time WHERE id=?', [time.id])
            .then(res => res);
         });
    
         res.json({
            "statusCode": 200
        });
     }
}

export default new TimeController();