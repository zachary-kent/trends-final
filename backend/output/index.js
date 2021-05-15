"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const serviceAccount = require('./service-account.json');
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
const db = firebase_admin_1.default.firestore();
const app = express_1.default();
const port = 8080;
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/build')));
const recipeCollection = db.collection('recipes');
/**
 * Returns whether one array contains every element of another
 * @param target the array to check
 * @param ref the reference array
 * @returns true iff target contains every element of ref, false otherwise
 */
function containsAll(target, ref) {
    return ref.every(e => target.includes(e));
}
/**
 * Returns whether an array contains some elements of another
 * @param target the array to check
 * @param ref the reference array
 * @returns true iff target contains some element(s) of ref, false otherwise
 */
function containsSome(target, ref) {
    return ref.some(e => target.includes(e));
}
app.get('/', (_req, res) => {
    res.send('Welcome to recipes backend!');
});
app.get('/recipes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { targetCuisines, targetPrepTimes, targetRestrictions, targetIngredients } = body;
    const posts = yield recipeCollection.get();
    res.send(posts.docs
        .map(doc => doc.data())
        .filter(({ cuisine, restrictions, prepTime, ingredients }) => {
        if (targetCuisines && !targetCuisines.includes(cuisine)) {
            return false;
        }
        const matchesPrepTime = !targetPrepTimes || targetPrepTimes.some(({ hours, minutes }) => hours === prepTime.hours && minutes === prepTime.minutes);
        if (!matchesPrepTime) {
            return false;
        }
        if (targetRestrictions && !containsAll(restrictions, targetRestrictions)) {
            return false;
        }
        return !targetIngredients || containsSome(ingredients, targetIngredients);
    }));
}));
app.get('/recipes/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield recipeCollection.where('name', '==', req.params.name).get();
    res.send(posts.docs.map(doc => doc.data()));
}));
app.post('/newRecipe', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecipe = req.body;
    const newDoc = recipeCollection.doc();
    yield newDoc.set(newRecipe);
    res.send(`ID of new recipe: ${newDoc.id}`);
}));
app.post('/updateRecipe/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRecipe = req.body;
    const id = req.params.id;
    yield recipeCollection.doc(id).update(updatedRecipe);
    res.send(`Recipe with id ${id} updated`);
}));
app.listen(process.env.PORT || port, () => {
    console.log(`Backend listening on port ${port}`);
});
