import { Router } from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasksController';

import {
  getUserByEmail,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/usersController';

const router = Router();

router.get('/tasks', getAllTasks);  
router.post('/tasks', createTask);  
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

router.get('/users', getAllUsers);
router.get('/users/:email', getUserByEmail);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
