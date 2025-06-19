import { useDrop } from 'react-dnd';
import binIcon from '../assets/binIcon.png';

const TrashBin = ({ show, onDropTodo }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TODO',
    drop: (item) => onDropTodo(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        bottom: show ? '2.5rem' : '-200px',
        transition: 'bottom 0.5s ease',
      }}
      className="fixed left-1/2 -translate-x-1/2 w-full flex justify-center z-50"
    >
      <div
        className={`flex flex-col items-center transition-transform duration-300 ${
          isOver ? 'scale-110' : 'scale-100'
        }`}
      >
        <img src={binIcon} className="w-96" />
      </div>
    </div>
  )
};

export default TrashBin;