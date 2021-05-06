import { SectionContainer } from './styles';
import { RecipeDisplayProps } from './types';

const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
    const { name, prepTime, restrictions, ingredients } = recipe;
    const totalMinutes = parseInt(prepTime, 10);
    const minutes = totalMinutes % 60;
    const hours = (totalMinutes - minutes) / 60;
    return (
        <SectionContainer>
            <div>
                <p>Name: {name}</p>
                <p>Preparation Time: {hours} hours {minutes} minutes</p>
                <p>Restrictions: {restrictions.join(', ')}</p>
                <p>Ingredients: {ingredients.join(', ')}</p>
            </div>
        </SectionContainer>
    );
};

export default RecipeDisplay;
