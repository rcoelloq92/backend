import { Request, Response } from 'express';
import { db } from '../database/firebase';

/**
 * GET /users/:email
 * Busca si existe un usuario con un email dado.
 */
export async function getUserByEmail(req: Request, res: Response) {
  const { email } = req.params;
  try {
    const usersSnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    if (usersSnapshot.empty) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const userDoc = usersSnapshot.docs[0];
    return res.status(200).json({ id: userDoc.id, ...userDoc.data() });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * POST /users
 * Crea un nuevo usuario a partir de datos en el body.
 */
export async function createUser(req: Request, res: Response) {
  try {
    const newUser = req.body; 
    const userRef = await db.collection('users').add(newUser);
    return res.status(201).json({ id: userRef.id, ...newUser });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * GET /users
 * (Opcional) Listar todos los usuarios
 */
export async function getAllUsers(req: Request, res: Response) {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * PUT /users/:id
 * (Opcional) Actualizar un usuario por id
 */
export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const fieldsToUpdate = req.body;

    const userRef = db.collection('users').doc(id);
    const docSnap = await userRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ message: 'Usuario no encontrado!' });
    }

    await userRef.update(fieldsToUpdate);
    const updatedDoc = await userRef.get();
    return res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

/**
 * DELETE /users/:id
 * (Opcional) Eliminar un usuario por id
 */
export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userRef = db.collection('users').doc(id);
    const docSnap = await userRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ message: 'Usuario no encontrado!' });
    }

    await userRef.delete();
    return res.status(200).json({ message: 'Usuario eliminado satisfactoriamente!' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
