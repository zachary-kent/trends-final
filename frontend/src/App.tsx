import Title from "./Title";
import { AppContainer, SectionHeader, SectionWrapper } from './styles';
import EnterRecipe from "./EnterRecipe";
import { Recipe } from "../../backend/types";
import { useEffect, useState } from "react";
import RecipeDisplay from "./RecipeDisplay";
import axios from 'axios';

const App = () => {
    const [recipes, setRecipes] = useState<ReadonlyArray<Recipe>>([]);
    useEffect(() => {
        axios.get<Recipe[]>('/recipes')
            .then(res => res.data)
            .then(setRecipes);
    }, [recipes]);
    const handleRecipeSubmit = async (recipe: Recipe) => {
        await axios.post<Recipe>('/newRecipe', recipe);
    };
    return (
        <AppContainer>
            <Title title='College Recipes' />
            <EnterRecipe onSubmit={handleRecipeSubmit} />
            <SectionWrapper>
                <SectionHeader>Browse Recipes!</SectionHeader>
                {recipes.map(recipe => <RecipeDisplay recipe={recipe} />)}
            </SectionWrapper> 
        </AppContainer>
    );
};

export default App;
