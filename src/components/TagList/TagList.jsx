import { Link, NavLink } from "react-router-dom";
import './tag-list.css';

function TagList() {
  return (
        <ul className="tag-list">
          <li className="tag-list__item">
            <Link className="tag-list__link" to="#about-project">О проекте</Link>
          </li>
          <li className="tag-list__item">
            <Link className="tag-list__link" to="#technology">Технологии</Link>
          </li>
          <li className="tag-list__item">
            <Link className="tag-list__link" to="#student">Студент</Link>
          </li>
        </ul>
  );
}

export default TagList;