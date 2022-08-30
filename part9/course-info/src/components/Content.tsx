import { CoursePart } from "../../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  const list = parts.map(part => {
    return <Part key={`prt_${part.name}`} {...part} />;
  })

  return (
    <div>
      {list}
    </div>
  )
};

export default Content;