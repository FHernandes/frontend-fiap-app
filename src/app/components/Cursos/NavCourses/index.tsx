'use client';
import style from './navCourses.module.scss';

interface NavCoursesProps {
  categories: {
    title: string;
    category: string;
  }[];
  selected: string;
  onSelect: (key: string) => void;
}

const NavCourses = ({ categories, selected, onSelect }: NavCoursesProps) => {
  return (
    <div className={style.container}>
      {categories.map((cat) => (
        <div
          key={cat.category}
          className={`${style.item} ${
            selected === cat.category ? style.active : ''
          }`}
          onClick={() => onSelect(cat.category)}
        >
          <div className={style.line} />
          <p className={style.title}>{cat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default NavCourses;
