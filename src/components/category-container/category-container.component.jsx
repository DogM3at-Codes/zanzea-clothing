import './category-container.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const CategoryContainer = ({CategoryModel}) => {
    return (
        <div className="categories-container">
            {CategoryModel.map((category) => {
                return <CategoryItem key={category.id} category={category}/>
            })}
        </div>
    )
};

export default CategoryContainer;