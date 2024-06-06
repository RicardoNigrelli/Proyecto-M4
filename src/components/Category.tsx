import Link from "next/link";

interface CategoryProps {
  title: string;
  icon: JSX.Element;
  categoryId: number;
}

const Category: React.FC<CategoryProps> = ({ title, icon, categoryId }) => (
  <Link href={`/product?category=${categoryId}`}>
    <div className="category-button" data-title={title}>
      {icon}
    </div>
  </Link>
);

export default Category;
