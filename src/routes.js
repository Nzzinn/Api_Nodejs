import { Router } from "express";
import jogadorController from "./app/controllers/jogadorController.js";
import timeController from "./app/controllers/timeController.js";
import partidaController from "./app/controllers/partidaController.js";

const router = Router();

router.get('/players/all', jogadorController.selectPlayers);
router.get('/players/player', jogadorController.selectPlayer);
router.post('/players/create', jogadorController.insertPlayer);
router.put('/players/update', jogadorController.updatePlayer);
router.delete('/players/delete', jogadorController.deletePlayer);

router.get('/teams/all', timeController.selectTeams);
router.get('/teams/team', timeController.selectTeam);
router.post('/teams/create', timeController.insertTeam);
router.put('/teams/update', timeController.updateTeam);
router.delete('/teams/delete', timeController.deleteTeam);

router.get('/matches/all', partidaController.selectMatches);
router.get('/matches/match', partidaController.selectMatch);
router.post('/matches/create', partidaController.insertMatch);
router.put('/matches/update', partidaController.updateMatch);
router.delete('/matches/delete', partidaController.deleteMatch);

export default router;