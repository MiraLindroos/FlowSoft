import "./List.css"
import { Link } from "react-router-dom"
import { FiTrash } from "react-icons/fi"

const List = ({onDelete, items, path}) => {
  return (
    <>
      {items && items.length > 0 ? (
        <div className="items-list">
          {items.map((item) => (
            <div className="item-row" key={item.id}>
              <Link to={`/${path}/${item.id}`} className="items-list-item">{item.name}</Link>
              <button className="edit" onClick={() => onDelete(item)}><FiTrash /></button>
            </div>
          ))}
        </div>
        ) : <p>Ei lisättyä sisältöä</p>
      }
    </>
  )
}

export default List