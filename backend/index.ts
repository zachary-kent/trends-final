import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import path from 'path';
import type { PrepTime, Recipe } from './types';

const serviceAccount = require('./service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));

const recipeCollection = db.collection('recipes');

/**
 * Returns whether one array contains every element of another
 * @param target the array to check
 * @param ref the reference array
 * @returns true iff target contains every element of ref, false otherwise
 */
function containsAll<T>(target: readonly T[], ref: readonly T[]) {
    return ref.every(e => target.includes(e));
}

/**
 * Returns whether an array contains some elements of another
 * @param target the array to check
 * @param ref the reference array
 * @returns true iff target contains some element(s) of ref, false otherwise
 */
function containsSome<T>(target: readonly T[], ref: readonly T[]) {
    return ref.some(e => target.includes(e));
}

app.get('/', (_req, res) => {
    res.send('Welcome to recipes backend!');
});

app.get('/recipes', async (req, res) => {
    const body: {
        targetCuisines: string[],
        targetPrepTimes: PrepTime[]
        targetRestrictions: string[],
        targetIngredients: string[]
    } = req.body;
    const {
        targetCuisines,
        targetPrepTimes,
        targetRestrictions,
        targetIngredients
    } = body;
    const posts = await recipeCollection.get();
    res.send(posts.docs
        .map(doc => doc.data() as Recipe)
        .filter(({ cuisine, restrictions, prepTime, ingredients }) => {
            if (targetCuisines && !targetCuisines.includes(cuisine)) {
                return false;
            }
            const matchesPrepTime = !targetPrepTimes || targetPrepTimes.some(({ hours, minutes }) =>
                hours === prepTime.hours && minutes === prepTime.minutes
            );
            if (!matchesPrepTime) {
                return false;
            }
            if (targetRestrictions && !containsAll(restrictions, targetRestrictions)) {
                return false;
            }
            return !targetIngredients || containsSome(ingredients, targetIngredients);
        })
    );
});

app.get('/recipes/:name', async (req, res) => {
    const posts = await recipeCollection.where('name', '==', req.params.name).get();
    res.send(posts.docs.map(doc => doc.data() as Recipe));
});

app.post('/newRecipe', async (req, res) => {
    const newRecipe: Recipe = req.body;
    const newDoc = recipeCollection.doc();
    await newDoc.set(newRecipe);
    res.send(`ID of new recipe: ${newDoc.id}`);
});

app.post('/updateRecipe/:id', async (req, res) => {
    const updatedRecipe: Recipe = req.body;
    const id: string = req.params.id;
    await recipeCollection.doc(id).update(updatedRecipe);
    res.send(`Recipe with id ${id} updated`);
});

app.listen(process.env.PORT || port, () => {
    console.log(`Backend listening on port ${port}`);
});
