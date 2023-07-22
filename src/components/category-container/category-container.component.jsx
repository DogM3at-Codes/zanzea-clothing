import './category-container.styles.scss';

import CategoryModel from '../category-model/category-model.component';
import CategoryItem from '../category-item/category-item.component';

const CategoryContainer = () => {
    return (
        <div className="categories-container">
            {CategoryModel.map((category) => {
                return <CategoryItem key={category.id} category={category}/>
            })}
        </div>
    )
};

export default CategoryContainer;