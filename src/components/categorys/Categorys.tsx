import './Categorys.css';

interface ICategory {
  item: string;
  funSetQuery: (item: string) => {};
  key: string;
}

const Categorys: React.FC<ICategory> = ({ item, funSetQuery, key }) => {
  const setItem = () => {
    funSetQuery(item);
  };

  return (
    <li className="item-category" value={item} key={key} onClick={setItem}>
      {' '}
      {item}{' '}
    </li>
  );
};

export default Categorys;
