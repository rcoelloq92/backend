import { Request, Response } from 'express';
import { db } from '../database/firebase';

/**
 * GET /tasks
 */
export async function getAllTasks(req: Request, res: Response) {
  try {
    const tasksSnapshot = await db.collection('tasks').get();
    const tasks = tasksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return res.status(200).json(tasks);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * POST /tasks
 */
export async function createTask(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
    const newTask = {
      title,
      description,
      createdAt: new Date().toISOString(),
      completed: false
    };

    const docRef = await db.collection('tasks').add(newTask);
    return res.status(201).json({ id: docRef.id, ...newTask });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * PUT /tasks/:id
 */
export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const fieldsToUpdate: any = {};
    if (title !== undefined) fieldsToUpdate.title = title;
    if (description !== undefined) fieldsToUpdate.description = description;
    if (completed !== undefined) fieldsToUpdate.completed = completed;

    await db.collection('tasks').doc(id).update(fieldsToUpdate);

    const updatedDoc = await db.collection('tasks').doc(id).get();
    if (!updatedDoc.exists) {
      return res.status(404).json({ message: 'Tarea no encontrada!' });
    }
    return res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * DELETE /tasks/:id
 */
export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const docRef = db.collection('tasks').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ message: 'Tarea no encontrada!' });
    }

    await docRef.delete();
    return res.status(200).json({ message: 'Tarea eliminada satisfactoriamente!' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
