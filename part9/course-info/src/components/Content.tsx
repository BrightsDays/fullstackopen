import { Part } from "../../types";

const Content = ({ parts }: { parts: Array<Part>}) => {
  const list = parts.map(item => {
    return <p>{item.name} {item.exerciseCount}</p>
  });

  return (
    <div>
      {list}
    </div>
  )
};

export default Content;