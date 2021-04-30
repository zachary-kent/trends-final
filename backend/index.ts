import admin from 'firebase-admin';
import express from 'express';
import type { Cuisine, DietaryRestrictions, Recipe } from './types';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const port = 8080;

app.use(express.json());

const recipeCollection = db.collection('recipes');

function containsAll<T>(target: readonly T[], ref: readonly T[]) {
    return target && ref && ref.every(target.includes);
}

function containsSome<T>(target: readonly T[], ref: readonly T[]) {
    return target && ref && ref.some(target.includes);
}

app.get('/recipes', async (req, res) => {
    const qCuisines = req.query['cuisine'] as Cuisine[];
    const qRestrictions = req.query['restrictions'] as DietaryRestrictions[];
    const qPrepTimes = req.query['prepTime'] as string[];
    const qIngredients = req.query['ingredients'] as string[];
    const posts = await recipeCollection.get();
    res.send(posts.docs
        .map(doc => doc.data() as Recipe)
        .filter(({ cuisine, restrictions, prepTime, ingredients }) => {
            if (qCuisines && !qCuisines.includes(cuisine)) return false;
            if (qPrepTimes && !qPrepTimes.includes(prepTime.toString())) return false;
            if (!containsAll(restrictions, qRestrictions)) return false;
            return containsSome(ingredients, qIngredients);
        })
    );
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

app.listen(port);
