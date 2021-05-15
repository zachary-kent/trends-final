import { SectionContainer } from './styles';
import { RecipeDisplayProps } from './types';

const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
    const { name, prepTime, restrictions, ingredients, author, instructions } = recipe;
    const { hours, minutes } = prepTime;
    return (
        <SectionContainer>
            <div>
                <p>Name: {name}</p>
                <p>Preparation Time: {hours} hours {minutes} minutes</p>
                <p>Restrictions: {restrictions.join(', ')}</p>
                <p>Ingredients: {ingredients.join(', ')}</p>
            </div>
            <div>
                <p>Instructions: {instructions}</p>
                <p>Author: {author}</p>
            </div>
        </SectionContainer>
    );
};

export default RecipeDisplay;
