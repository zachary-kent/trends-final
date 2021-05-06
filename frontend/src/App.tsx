import Title from "./Title";
import { AppContainer, SectionHeader, SectionWrapper } from './styles';
import EnterRecipe from "./EnterRecipe";
import { Recipe } from "../../backend/types";
import { useState } from "react";
import RecipeDisplay from "./RecipeDisplay";

const App = () => {
    const handleRecipeSubmit = (recipe: Recipe) => { };
    const [recipes, setRecipes] = useState<ReadonlyArray<Recipe>>([
        {
            name: 'Apple Pie',
            ingredients: ['Apples, Sugar, Pie Crust', 'Milk', 'Eggs'],
            prepTime: '125',
            cuisine: 'American',
            restrictions: ['Vegetarian']
        },
        {
            name: 'Grilled Cheese',
            ingredients: ['Bread', 'Cheese', 'Butter, Tomato'],
            prepTime: '15',
            cuisine: 'American',
            restrictions: ['Vegetarian']
        }
    ]);
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
